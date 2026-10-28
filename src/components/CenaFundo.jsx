import { useMemo } from "react";
import Lanterna from "./Lanterna.jsx";
import Particulas from "./Particulas.jsx";

// Um céu para cada humor. Todos ficam empilhados e só o ativo aparece:
// o fade entre eles faz o clima mudar suavemente com a conversa.
const CEUS = {
  noite: "linear-gradient(to bottom, #0d1130 0%, #1c2a63 55%, #3b4a8f 100%)",
  profundo: "linear-gradient(to bottom, #120d2e 0%, #2a1f5c 55%, #4b3a86 100%)",
  quente: "linear-gradient(to bottom, #2a1a3f 0%, #7a3f5e 50%, #f0a55a 100%)",
  alegre: "linear-gradient(to bottom, #1d2257 0%, #7b4f9e 50%, #f7c6a3 100%)",
};

export default function CenaFundo({ humor = "noite" }) {
  const estrelas = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        esquerda: Math.random() * 100,
        topo: Math.random() * 60,
        tamanho: 1 + Math.random() * 2.2,
        atraso: Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* céu em tela cheia (a pedra do arco esconde o que sobra) */}
      {Object.entries(CEUS).map(([nome, gradiente]) => (
        <div
          key={nome}
          className="absolute inset-0 transition-opacity duration-2000"
          style={{ background: gradiente, opacity: nome === humor ? 1 : 0 }}
        />
      ))}

      {/* a "janela": coluna do mesmo tamanho do arco de pedra */}
      <div
        className="absolute left-1/2 top-[1vh] -translate-x-1/2"
        style={{ width: "min(94vw, 1800px)", bottom: "var(--sill)" }}
      >
        {estrelas.map((e) => (
          <span
            key={e.id}
            className="estrela absolute rounded-full bg-white"
            style={{
              left: `${e.esquerda}%`,
              top: `${e.topo}%`,
              width: e.tamanho,
              height: e.tamanho,
              animationDelay: `${e.atraso}s`,
            }}
          />
        ))}

        {/* lua */}
        <div className="lua lua-detalhada absolute right-[20%] top-[46%] h-24 w-24 rounded-full sm:h-32 sm:w-32 lg:h-36 lg:w-36">
          <span className="lua-cratera absolute left-[22%] top-[27%] h-[15%] w-[15%] rounded-full" />
          <span className="lua-cratera absolute bottom-[23%] right-[22%] h-[24%] w-[24%] rounded-full" />
          <span className="lua-cratera absolute right-[19%] top-[20%] h-[10%] w-[10%] rounded-full" />
          <span className="lua-cratera absolute bottom-[20%] left-[28%] h-[9%] w-[9%] rounded-full" />
          <span className="lua-cratera lua-cratera-pequena absolute left-[48%] top-[18%] h-[6%] w-[6%] rounded-full" />
          <span className="lua-cratera lua-cratera-media absolute bottom-[43%] left-[14%] h-[8%] w-[8%] rounded-full" />
          <span className="lua-cratera lua-cratera-pequena absolute bottom-[12%] right-[42%] h-[5%] w-[5%] rounded-full" />
        </div>

        {/* telhados ao longe */}
        <svg
          className="cidade-noite absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          style={{ height: "30%" }}
        >
          <path
            d="M0 220V145h48v-32h25V86l25-24 25 24v35h42V95h53v48h25v-31h49v-45h30V38l27-23 27 23v31h34v67h34v-34h47v-53h33V17l30-25 30 25v55h31v73h48v-39h42V78l31-30 31 30v58h50v-35h47v-41h35V55l25-20 25 20v58h41v-39h45V58l30-25 30 25v60h55v-34h40h10V220z"
            fill="#111631"
          />
          <path
            d="M0 220V178h68v-30h45v-26h55v31h51v-24h52v-38h34V65l27-23 27 23v26h45v34h58v-22h53v-42h34V34l29-24 29 24v51h38v39h51v-25h53v-31h35V76l26-20 26 20v44h54v-29h47v-27h37V61l26-20 26 20v42h48v-25h58h68V220z"
            fill="#171c3a"
            opacity=".8"
          />
          <g fill="#f2c879" opacity=".72">
            <path d="M84 139h6v10h-6zm66-20h6v10h-6zm101 10h6v10h-6zm111-75h6v11h-6zm34 36h6v9h-6zm107 20h6v10h-6zm145-54h6v12h-6zm55 47h6v10h-6zm131 5h6v10h-6zm116-18h6v10h-6zm107 10h6v10h-6z" />
            <path
              d="M204 171h6v9h-6zm97-21h6v10h-6zm222 15h6v10h-6zm205-12h6v10h-6zm119 13h6v10h-6zm195-11h6v10h-6z"
              opacity=".55"
            />
          </g>
          <g fill="none" stroke="#21294b" strokeWidth="3" opacity=".9">
            <path d="M176 98v-20h35v20m220 10V84h32v24m258 0V72h35v38m210 0V79h30v29" />
            <path d="M680 95q18-37 36 0m-18-36v44" />
          </g>
          <path d="M0 210h1200v10H0z" fill="var(--pedra)" />
        </svg>

        <Particulas />
        <Lanterna />
      </div>
    </div>
  );
}
