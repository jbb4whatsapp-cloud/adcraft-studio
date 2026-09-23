import sharp from "sharp";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");
  
  console.log("DOWNLOAD URL demandée:", imageUrl);
  
  if (!imageUrl) return new Response("no url", { status: 400 });

  const res = await fetch(imageUrl, { 
    cache: "no-store",
    headers: { "User-Agent": "Mozilla/5.0 AdCraf" }
  });

  const contentType = res.headers.get("content-type");
  console.log("Content-Type reçu:", contentType, "Status:", res.status);

  const arrayBuffer = await res.arrayBuffer();
  console.log("Taille buffer:", arrayBuffer.byteLength);

  // Si c'est du HTML, affiche l'erreur au lieu de crasher Sharp
  if (contentType?.includes("text/html") || arrayBuffer.byteLength < 10000) {
    const text = Buffer.from(arrayBuffer).toString().slice(0, 500);
    console.error("Pollinations a renvoyé HTML:", text);
    return new Response(`Pollinations erreur: ${text}`, { status: 500 });
  }

  try {
    const buffer = Buffer.from(arrayBuffer);
    const metadata = await sharp(buffer).metadata();
    console.log("Image OK:", metadata.width, "x", metadata.height);

    const cropped = await sharp(buffer)
      .extract({ 
        left: 0, 
        top: 0, 
        width: metadata.width, 
        height: Math.max(100, metadata.height - 50) 
      })
      .jpeg({ quality: 95 })
      .toBuffer();

    return new Response(cropped, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="adcraf-${Date.now()}.jpg"`,
      },
    });
  } catch (e) {
    console.error("Sharp error:", e.message);
    // Fallback: renvoie l'original si le crop échoue
    return new Response(arrayBuffer, {
      headers: { "Content-Type": contentType || "image/jpeg" },
    });
  }
}