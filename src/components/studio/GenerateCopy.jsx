"use client";
import { useState } from "react";

export default function GenerateCopy({ brief, onGenerated }) {
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if(!brief) return alert("Écris un brief d'abord");
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ type: "copy", prompt: brief }),
    });
    const data = await res.json();
    onGenerated(data.output);
    setLoading(false);
  }

  return (
    <div className="p-4 rounded bg-zinc-900 border border-zinc-800">
      <h2 className="font-semibold mb-2">2. Copywriting</h2>
      <button onClick={handleGenerate} disabled={loading}
        className="w-full py-2 bg-white text-black rounded font-medium disabled:opacity-50">
        {loading? "Génération..." : "Générer Textes"}
      </button>
    </div>
  );
}