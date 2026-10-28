import { useEffect, useState } from "react";

// Texto que aparece letra por letra. Clique no texto para mostrar tudo de uma vez.
export default function Dialogo({ texto, aoDigitar, aoTerminar }) {
  const [mostrados, setMostrados] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? texto.length
      : 0,
  );

  useEffect(() => {
    if (mostrados >= texto.length) {
      aoTerminar();
      return;
    }
    const id = setTimeout(() => {
      if (mostrados % 3 === 0) aoDigitar();
      setMostrados((m) => m + 1);
    }, 32);
    return () => clearTimeout(id);
  }, [mostrados, texto, aoDigitar, aoTerminar]);

  return (
    <>
      {/* leitores de tela recebem o texto completo de uma vez */}
      <p className="sr-only" aria-live="polite">
        {texto}
      </p>
      <div className="dialogo-reservado grid grid-cols-1 text-[1.2rem] leading-relaxed sm:text-[1.55rem]">
        <p aria-hidden="true" className="invisible col-start-1 row-start-1">
          {texto}
        </p>
        <p
          aria-hidden="true"
          onClick={() => setMostrados(texto.length)}
          className="col-start-1 row-start-1 text-[#fff3de] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
        >
          {texto.slice(0, mostrados)}
        </p>
      </div>
    </>
  );
}
