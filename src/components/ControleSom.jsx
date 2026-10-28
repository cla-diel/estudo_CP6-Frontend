// Botão para ligar/desligar o som (canto superior direito)
export default function ControleSom({ ativo, aoAlternar }) {
  return (
    <button
      type="button"
      onClick={aoAlternar}
      aria-pressed={ativo}
      aria-label={ativo ? "Desligar o som" : "Ligar o som"}
      className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#ecc98d]/50 bg-[#1b1a2e]/80 text-[#fff3de] backdrop-blur transition hover:bg-[#3a3858]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H3v6h3l5 4z" />
        {ativo ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <>
            <path d="m16 9 5 6" />
            <path d="m21 9-5 6" />
          </>
        )}
      </svg>
    </button>
  );
}
