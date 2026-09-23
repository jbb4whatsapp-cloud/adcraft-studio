export default function Preview({ visual, copy }) {
  return (
    <div className="p-6 rounded bg-zinc-900 border border-zinc-800 min-h-[600px]">
      <h2 className="font-semibold mb-4">Preview Pub</h2>
      {!visual &&!copy && <p className="text-zinc-500">Génère un visuel ou un copy pour voir l'aperçu ici.</p>}

      {visual && (
        <div className="mb-6">
          <p className="text-xs text-zinc-400 mb-2">VISUEL:</p>
          <div className="bg-zinc-800 p-4 rounded whitespace-pre-wrap">{visual}</div>
        </div>
      )}

      {copy && (
        <div>
          <p className="text-xs text-zinc-400 mb-2">COPY:</p>
          <div className="bg-zinc-800 p-4 rounded whitespace-pre-wrap">{copy}</div>
        </div>
      )}
    </div>
  );
}