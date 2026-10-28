// Recadinho no topo da tela (ex.: "Você voltou!")
export default function Aviso({ texto }) {
  if (!texto) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-12 z-40 w-[calc(100%-8rem)] max-w-sm -translate-x-1/2 sm:top-16">
      <div
        role="status"
        className="aparecer rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] px-4 py-2.5 text-center text-base text-[#2b2140] shadow-[0_4px_0_#c98f4c]"
      >
        {texto}
      </div>
    </div>
  );
}
