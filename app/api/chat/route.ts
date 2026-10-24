import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { PKIT_SYSTEM_PROMPT, getKnowledgeResponse } from "@/lib/chatbot/knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  // 1. IP Rate Limiting (15 requests per minute)
  const ip = getClientIp(req);
  const limit = rateLimit(`chat:${ip}`, 15, 60_000);
  if (!limit.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many messages sent. Please wait a moment before sending another message.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const rawMessage = body?.message;

    // 2. Validate input
    if (!rawMessage || typeof rawMessage !== "string") {
      return NextResponse.json(
        { success: false, message: "Please provide a valid message." },
        { status: 400 }
      );
    }

    const message = rawMessage.trim();
    if (message.length === 0) {
      return NextResponse.json(
        { success: false, message: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { success: false, message: "Message is too long. Please keep queries under 500 characters." },
        { status: 400 }
      );
    }

    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history.slice(-6).map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content || "").slice(0, 500),
        }))
      : [];

    // 3. Check for external AI Provider (OpenAI, Gemini, or compatible endpoint)
    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    const geminiKey = process.env.GEMINI_API_KEY?.trim();

    if (openAiKey) {
      try {
        const messages = [
          { role: "system", content: PKIT_SYSTEM_PROMPT },
          ...history,
          { role: "user", content: message },
        ];

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages,
            max_tokens: 350,
            temperature: 0.5,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (reply) {
            const fallbackInfo = getKnowledgeResponse(message);
            return NextResponse.json({
              success: true,
              message: reply,
              actions: fallbackInfo.actions || [
                { label: "Book Free Consultation", url: "/contact" },
                { label: "Explore Services", url: "/services" },
              ],
            });
          }
        }
      } catch (aiErr) {
        console.warn("[Chatbot AI Provider Warning]:", aiErr);
        // Fall through to domain knowledge engine
      }
    } else if (geminiKey) {
      try {
        const contents = [
          { role: "user", parts: [{ text: `${PKIT_SYSTEM_PROMPT}\n\nUser Question: ${message}` }] },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: { maxOutputTokens: 350, temperature: 0.5 },
            }),
            signal: AbortSignal.timeout(8000),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            const fallbackInfo = getKnowledgeResponse(message);
            return NextResponse.json({
              success: true,
              message: reply,
              actions: fallbackInfo.actions || [
                { label: "Book Free Consultation", url: "/contact" },
                { label: "Explore Services", url: "/services" },
              ],
            });
          }
        }
      } catch (geminiErr) {
        console.warn("[Chatbot Gemini Provider Warning]:", geminiErr);
        // Fall through to domain knowledge engine
      }
    }

    // 4. Guaranteed domain knowledge response (grounded, fast, secure, zero external latency)
    const response = getKnowledgeResponse(message);
    return NextResponse.json({
      success: true,
      message: response.message,
      actions: response.actions,
    });
  } catch (error) {
    console.error("[Chatbot API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your query. Please contact us directly.",
      },
      { status: 500 }
    );
  }
}
