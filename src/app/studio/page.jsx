"use client";
import { useState, useEffect } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function Studio() {
  const [clientImage, setClientImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("Prêt");
  const [mounted, setMounted] = useState(false);

  useEffect(()=> setMounted(true), []);
  if (!mounted) return null;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setClientImage(data.url);
  };

  const generateV6 = async (bg) => {
    if (!clientImage) return;
    setLoading(true);
    try {
      setStep("IA détoure (CPU stable)...");
      const blob = await fetch(clientImage).then(r => r.blob());
      
      // FORCE SINGLE THREAD - Plus de glitch RGB
      const cutoutBlob = await removeBackground(blob, {
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.5.5/dist/",
        debug: false,
      });

      setStep("Collage...");
      const img = new Image();
      img.src = URL.createObjectURL(cutoutBlob);
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

      const canvas = document.createElement('canvas');
      canvas.width = 1024; canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bg === "white" ? "#FFFFFF" : "#E8DCCA";
      ctx.fillRect(0,0,1024,1024);
      const scale = Math.min(900/img.width, 900/img.height);
      const w = img.width*scale, h = img.height*scale;
      ctx.drawImage(img, (1024-w)/2, (1024-h)/2, w, h);
      
      setFinalImage(canvas.toDataURL("image/jpeg", 0.92));
      setStep("Prêt - HD généré !");
    } catch (e) {
      console.error(e);
      alert("Erreur IA: " + e.message);
    } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-black text-white p-4 grid md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 p-6 rounded-2xl h-fit">
        <h1 className="font-black text-xl mb-4">AdCraf Studio V6 KEEPER IA</h1>
        <div className="border border-dashed border-zinc-700 rounded-xl p-8 text-center">
          <input type="file" onChange={handleUpload} accept="image/*" />
          {clientImage && <img src={clientImage} className="mt-4 mx-auto max-h-48 rounded-lg" />}
        </div>
        <button onClick={() => generateV6("beige")} disabled={!!loading ||!clientImage} suppressHydrationWarning={true}
          className="w-full mt-4 bg-white text-black py-3 rounded-full font-bold disabled:opacity-30">
          {loading? step : "Générer Studio Beige (5.000 FCFA)"}
        </button>
        <button onClick={() => generateV6("white")} disabled={!!loading ||!clientImage} suppressHydrationWarning={true}
          className="w-full mt-2 bg-zinc-800 py-3 rounded-full font-bold disabled:opacity-30">
          Version Fond Blanc
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {finalImage? (
          <>
            <img src={finalImage} className="rounded-2xl max-w-[500px]" />
            <a href={finalImage} download="adcraft-v6.jpg" className="mt-4 bg-white text-black px-6 py-2 rounded-full font-bold text-sm">
              Télécharger HD
            </a>
          </>
        ) : <p className="text-zinc-600">Le résultat apparaîtra ici</p>}
      </div>
    </div>
  );
}