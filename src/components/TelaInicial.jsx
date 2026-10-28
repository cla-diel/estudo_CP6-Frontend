// Tela de abertura. O clique em "Subir a torre" também libera o áudio do navegador.
export default function TelaInicial({ aoComecar }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-[#0d1130]/65 px-8 py-8 text-center backdrop-blur-[2px]">
      <h1 className="text-balance text-5xl leading-tight text-[#fff3de] [text-shadow:0_2px_18px_rgba(0,0,0,0.6)] sm:text-6xl">
        A Torre de Owlbert
      </h1>
      <p className="mt-8 max-w-sm text-xl leading-relaxed text-[#fff3de]/90 sm:text-2xl">
        Uma conversa tranquila, no seu ritmo, com uma coruja que adora ouvir.
      </p>
      <button
        type="button"
        onClick={aoComecar}
        className="mt-10 rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] px-10 py-3.5 text-xl text-[#2b2140] shadow-[0_5px_0_#c98f4c] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0.5 active:shadow-[0_1px_0_#c98f4c]"
      >
        Subir a torre
      </button>
      <p className="mt-8 max-w-sm text-lg leading-relaxed text-[#fff3de]/80 sm:text-xl">
        Com som e fones de ouvido fica ainda melhor.
      </p>
    </div>
  );
}
