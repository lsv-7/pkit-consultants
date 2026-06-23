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
