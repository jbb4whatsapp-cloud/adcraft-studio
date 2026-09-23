export async function POST(req) {
  const { prompt, format = "1:1" } = await req.json();
  const cleanPrompt = prompt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const enhancedPrompt = `${cleanPrompt}, luxury product photography, studio lighting, beige background, ultra realistic`;
  const width = format === "9:16"? 768 : format === "16:9"? 1280 : 1024;
  const height = format === "9:16"? 1365 : format === "16:9"? 720 : 1024;
  const seed = Math.floor(Math.random() * 999999);
  // model=flux n'a pas de watermark, et on ajoute nologo=true
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&nofeed=true`;
  return Response.json({ output: url, type: "image" });
}