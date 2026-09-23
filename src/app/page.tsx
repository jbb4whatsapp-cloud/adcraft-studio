export default function Home() {
  const wa = "https://wa.me/237670107755?text=Bonjour%20AdCraft%20je%20veux%20un%20flyer";

  const flyers = [
    { src: "/poulet_final.jpg", label: "Food • Poulet Braisé", tag: "BEST" },
    { src: "/wax_final.jpg", label: "Mode • Wax Store", tag: "NEW" },
    { src: "/afrobeat_final.jpg", label: "Event • Afrobeat Night", tag: "POP" },
    { src: "/beauty_final.jpg", label: "Beauty • Makeup", tag: "24H" },
  ];

  return (
    <div className="min-h-screen bg-[#EDE6D0] flex justify-center">
      <main className="w-full max-w-[440px] bg-[#FFFBEB] min-h-screen shadow-2xl border-x flex flex-col">

        <div className="bg-white p-4 flex justify-between items-center border-b sticky top-0 z-10">
          <div className="flex gap-2 items-center">
            <div className="w-9 h-9 bg-[#FFC928] rounded-lg grid place-items-center font-black">★</div>
            <b className="leading-none text-sm">AdCraft<br/>Studio</b>
          </div>
          <span className="text-[11px] text-zinc-500">📍 Yaoundé | Douala</span>
        </div>

        <div className="bg-[#FFC928] p-5 text-center">
          <h1 className="text-[30px] font-black leading-[0.9] text-[#1A1A5E]">Créez vos flyers en 24h</h1>
          <p className="text-[#0B7A3B] font-bold mt-2 text-[13px]">Get Flyers & Ads for SMEs • 24h Delivery</p>

          {/* GRID 2x2 PRO */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {flyers.map((f) => (
              <div key={f.src} className="bg-white rounded-[22px] shadow-sm p-2 flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-50">
                  <span className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">{f.tag}</span>
                  <img src={f.src} alt={f.label} className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] font-bold mt-2 text-left px-1 text-[#1A1A5E] leading-tight">{f.label}</p>
              </div>
            ))}
          </div>

          <a href={wa} target="_blank" className="mt-5 bg-[#0B8A3B] text-white w-full py-3.5 rounded-full font-black flex justify-center text-sm shadow-lg">
            Commander sur WhatsApp
          </a>
          <p className="text-[10px] mt-2 opacity-70">Livraison JPG + PNG + Story format • 24h</p>
        </div>

        <div className="p-4 flex-1">
          <h2 className="font-black text-center text-[#1A1A5E]">Nos Packs & Tarifs</h2>
          <div className="space-y-2.5 mt-4">
            <div className="bg-white border rounded-xl p-3 flex gap-3 items-center"><div className="w-10 h-10 bg-green-600 rounded-full grid place-items-center text-white">📄</div><div><b className="text-sm">1500 FCFA • Flyer Simple</b><p className="text-[11px] text-zinc-600">Design unique • 24h • JPG/PNG</p></div></div>
            <div className="bg-white border-2 border-zinc-900 rounded-xl p-3 flex gap-3 items-center"><div className="w-10 h-10 bg-zinc-900 rounded-full grid place-items-center text-white">📢</div><div><b className="text-sm">5000 FCFA • Pack Réseaux</b><p className="text-[11px] text-zinc-600">3 visuels • Insta/FB • 24h</p></div></div>
            <div className="bg-white border rounded-xl p-3 flex gap-3 items-center"><div className="w-10 h-10 bg-yellow-500 rounded-full grid place-items-center text-white">🏪</div><div><b className="text-sm">10000 FCFA • Pack Boutique</b><p className="text-[11px] text-zinc-600">5 visuels + logo retouche</p></div></div>
          </div>
        </div>

        <div className="p-4">
          <a href="/studio" className="bg-black text-white w-full py-3.5 rounded-full font-bold text-center block text-sm">→ Tester l'outil Studio Beige</a>
        </div>
        <div className="bg-[#1A1A5E] text-white p-4 text-center text-[10px]">AdCraft Studio • Yaoundé • Douala • 24h Delivery • wa.me/237670107755</div>
      </main>
    </div>
  )
}