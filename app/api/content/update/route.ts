import { connectDB } from "@/lib/mongodb/connect"
import Content from "@/lib/models/content"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 })
  }

  const token = auth.split(" ")[1]
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
  } catch (err) {
    return new Response("Invalid token", { status: 401 })
  }

  await connectDB()
  const body = await req.json()

  const content = await Content.findOneAndUpdate(
    {},
    body,
    { upsert: true, new: true }
  )

  return Response.json(content)
}