import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, oldImage } = await req.json();

    if (!prompt || !oldImage) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("image", oldImage);
    formData.append("output_format", "jpeg");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/edit/sd3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABLE_API_KEY}`,
          Accept: "image/*",
        },
        body: formData,
      }
    );

    const buf = await response.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const newImage = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ image: newImage });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
