import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { imageUrl, bg } = await req.json();
    
    let cleanPath = imageUrl;

    // Si c'est http://localhost:3000/uploads/xxx.jpg -> on garde que /uploads/xxx.jpg
    if (cleanPath.startsWith("http")) {
      try {
        const url = new URL(cleanPath);
        cleanPath = url.pathname; // => /uploads/upload-xxx.JPG
      } catch {}
    }

    // /uploads/xxx.jpg -> /home/tumsel/projects/adcraft-studio/public/uploads/xxx.jpg
    const filePath = path.join(process.cwd(), "public", cleanPath);

    console.log("Keeper reading FIXED:", filePath);

    if (!fs.existsSync(filePath)) {
      return new Response(`Fichier non trouvé: ${filePath}`, { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);

    let bgColor = { r: 232, g: 220, b: 202 };
    if (bg === "white") bgColor = { r: 255, g: 255, b: 255 };
    if (bg === "lifestyle") bgColor = { r: 230, g: 230, b: 230 };

    const trimmed = await sharp(buffer).trim({ threshold: 30 }).toBuffer();
    const product = await sharp(trimmed).resize(800, 800, { fit: 'inside' }).png().toBuffer();
    const meta = await sharp(product).metadata();

    const final = await sharp({
      create: { width: 1024, height: 1024, channels: 3, background: bgColor }
    })
    .composite([{ 
      input: product, 
      top: Math.round((1024 - meta.height)/2), 
      left: Math.round((1024 - meta.width)/2) 
    }])
    .jpeg({ quality: 92 })
    .toBuffer();

    return new Response(final, { headers: { "Content-Type": "image/jpeg" } });

  } catch (e) {
    console.error("Keeper error:", e);
    return new Response(`Erreur: ${e.message}`, { status: 500 });
  }
}