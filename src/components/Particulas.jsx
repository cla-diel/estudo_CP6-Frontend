import { useMemo } from "react";

// Vaga-lumes flutuando pela torre
export default function Particulas({ quantidade = 14 }) {
  const lista = useMemo(
    () =>
      Array.from({ length: quantidade }, (_, i) => ({
        id: i,
        esquerda: 8 + Math.random() * 84,
        topo: 25 + Math.random() * 55,
        atraso: Math.random() * 9,
        duracao: 7 + Math.random() * 6,
        tamanho: 3 + Math.random() * 4,
      })),
    [quantidade],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {lista.map((p) => (
        <span
          key={p.id}
          className="vagalume absolute rounded-full bg-[#ffe9a8]"
          style={{
            left: `${p.esquerda}%`,
            top: `${p.topo}%`,
            width: p.tamanho,
            height: p.tamanho,
            animationDelay: `${p.atraso}s`,
            animationDuration: `${p.duracao}s`,
            boxShadow: "0 0 10px 3px rgba(255, 224, 140, 0.7)",
          }}
        />
      ))}
    </div>
  );
}
