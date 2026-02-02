import { connectDB } from "@/lib/mongodb/connect"
import Content from "@/lib/models/content"

export async function GET() {
  await connectDB()
  const content = await Content.findOne()
  return Response.json(content)
}