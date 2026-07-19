import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const imgBBFormData = new FormData()
    imgBBFormData.append("key", process.env.IMGBB_API_KEY!)
    imgBBFormData.append("image", image)

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgBBFormData,
    })

    const data = await res.json()

    if (!data.success) {
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }

    return NextResponse.json({ url: data.data.url })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
