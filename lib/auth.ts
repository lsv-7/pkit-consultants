import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return !!decoded;
  } catch (error) {
    return false;
  }
}

export async function verifyClient(): Promise<{ id: string; clientId: string; email: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("client_token")?.value;
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; clientId: string; email: string; role: string };
    if (decoded && decoded.role === "CLIENT") {
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
}
