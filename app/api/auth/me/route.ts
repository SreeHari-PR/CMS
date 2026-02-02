import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 })
  }

  const token = auth.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    return Response.json({ ok: true, payload })
  } catch (err) {
    return new Response("Invalid token", { status: 401 })
  }
}
