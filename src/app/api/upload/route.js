import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) return Response.json({ error: "no file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `upload-${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  // Crée le dossier public/uploads s'il n'existe pas
  const { mkdir } = await import("fs/promises");
  await mkdir(path.join(process.cwd(), "public", "uploads"), { recursive: true });

  await writeFile(filepath, buffer);
  return Response.json({ url: `/uploads/${filename}` });
}