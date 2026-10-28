import { useMemo } from "react";

const CORES = ["#ff8fa3", "#ffd166", "#fff3de", "#9ad1ff", "#c9a7ff"];

const CORACAO =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const BRILHO = "M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z";

// Corações (gesto carinhoso) ou confete de corações e brilhos (festa)
// tipo: 'coracao' | 'festa'   intensidade: 1 ou 2
export default function Celebracao({ tipo = "festa", intensidade = 1 }) {
  const itens = useMemo(() => {
    const quantidade = tipo === "coracao" ? 5 : 12 + intensidade * 8;
    return Array.from({ length: quantidade }, (_, i) => ({
      id: i,
      esquerda: 5 + Math.random() * 90,
      topo: 15 + Math.random() * 55,
      tamanho: 14 + Math.random() * 14,
      atraso: Math.random() * 1.2,
      duracao: 1.8 + Math.random() * 1.2,
      deslocamento: -35 + Math.random() * 70,
      cor: tipo === "coracao" ? "#ff8fa3" : CORES[i % CORES.length],
      forma: tipo === "coracao" || i % 2 === 0 ? CORACAO : BRILHO,
    }));
  }, [tipo, intensidade]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {itens.map((item) => (
        <svg
          key={item.id}
          viewBox="0 0 24 24"
          className="subir absolute"
          style={{
            left: `${item.esquerda}%`,
            top: `${item.topo}%`,
            width: item.tamanho,
            height: item.tamanho,
            fill: item.cor,
            animationDelay: `${item.atraso}s`,
            animationDuration: `${item.duracao}s`,
            "--dx": `${item.deslocamento}px`,
          }}
        >
          <path d={item.forma} />
        </svg>
      ))}
    </div>
  );
}
