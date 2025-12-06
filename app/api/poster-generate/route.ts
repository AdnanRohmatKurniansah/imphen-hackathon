import { createServerSupabase } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      headline,
      subHeadline,
      cta,
      theme,
      product_id,
      profile_id
    } = await req.json();

    if (!product_id || !profile_id) {
      return NextResponse.json({ error: "Product & Profile wajib" }, { status: 400 });
    }

    const supabase = await createServerSupabase();

    const { data: profile } = await supabase
      .from("umkm_profile")
      .select("*")
      .eq("id", profile_id)
      .single();

    const { data: product } = await supabase
      .from("umkm_products")
      .select("*")
      .eq("id", product_id)
      .single();

    const prompt = `
      Create a modern high-quality promotional poster using theme: ${theme}.
      Headline: "${headline}"
      Subheadline: "${subHeadline}"
      Call to action: "${cta}"
      
      UMKM Info:
      Business Name: ${profile?.business_name}
      Description: ${profile?.description}

      Product Info:
      Product Name: ${product?.product_name}
      Product Description: ${product?.description}
      Price: ${product?.sale_price}

      Style: premium layout, bold typography, commercial advertising design.
    `;

    const formData = new FormData();
    formData.append("model", "sd3");
    formData.append("prompt", prompt);
    formData.append("aspect_ratio", "1:1");
    formData.append("output_format", "jpeg");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      {
        method: "POST",
        headers: {
          Accept: "image/*",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABLE_API_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const imgBase64 = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${imgBase64}`;

    const { data, error } = await supabase
      .from("poster_generations")
      .insert({
        profile_id,
        product_id,
        prompt,
        headline,
        subheadline: subHeadline,
        cta,
        theme,
        image_url: imageUrl
      })
      .select()
      .single();

    return NextResponse.json({ success: true, id: data.id, image: imageUrl });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
