import { useEffect, useRef, useState } from "react";
import CenaFundo from "./components/CenaFundo.jsx";
import Coruja from "./components/Coruja.jsx";
import Cena from "./components/Cena.jsx";
import Aviso from "./components/Aviso.jsx";
import ControleSom from "./components/ControleSom.jsx";
import TelaInicial from "./components/TelaInicial.jsx";
import useSom from "./hooks/useSom.js";
import useConversa from "./hooks/useConversa.js";
import useVida from "./hooks/useVida.js";

export default function App() {
  const [comecou, setComecou] = useState(false);
  const primeiraCena = useRef(true);

  const som = useSom();
  const { iniciar, tocarPio } = som;
  const { cena, nome } = useConversa();
  const { gesto, festa, aviso, celebrar } = useVida({ nome, som });

  // Ao entrar numa cena: festa (quando a pessoa voltou) ou "uu-uuu" se a coruja está feliz
  useEffect(() => {
    if (!comecou) return;
    if (cena.festa) celebrar(cena.festa, null, false);
    else if (!primeiraCena.current && cena.coruja === "feliz") tocarPio();
    primeiraCena.current = false;
  }, [comecou, cena, celebrar, tocarPio]);

  function comecar() {
    iniciar();
    setComecou(true);
  }

  useEffect(() => {
    const acompanharPonteiro = (evento) => {
      if (evento.pointerType === "touch") return;
      document.documentElement.style.setProperty(
        "--ponteiro-x",
        `${evento.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--ponteiro-y",
        `${evento.clientY}px`,
      );
    };
    window.addEventListener("pointermove", acompanharPonteiro);
    return () => window.removeEventListener("pointermove", acompanharPonteiro);
  }, []);

  return (
    <main
      className={`relative h-full min-h-100svh w-full overflow-hidden bg-[#0d1130] ${
        cena.opcoes?.length === 3
          ? "tem-tres-opcoes"
          : cena.opcoes?.length === 4
            ? "tem-quatro-opcoes"
            : cena.opcoes?.length > 4
              ? "tem-muitas-opcoes"
              : ""
      }`}
    >
      <CenaFundo humor={cena.humor} />
      <div
        className="spotlight pointer-events-none absolute inset-0 z-5"
        aria-hidden="true"
      />

      {/* moldura de pedra em arco: a "janela" da torre */}
      <div
        className="arco pointer-events-none absolute left-1/2 top-[1vh] z-20 -translate-x-1/2"
        style={{ width: "min(94vw, 1800px)", bottom: "var(--sill)" }}
        aria-hidden="true"
      />
      {/* peitoril onde a coruja fica */}
      <div
        className="peitoril absolute inset-x-0 bottom-0 z-20"
        style={{ height: "var(--sill)" }}
        aria-hidden="true"
      />

      <div
        className="flores-torre pointer-events-none absolute inset-x-0 z-21"
        style={{ bottom: "calc(var(--sill) - 25px)" }}
        aria-hidden="true"
      >
        {[false, true].map((espelhar) => (
          <svg
            key={espelhar ? "direita" : "esquerda"}
            className={`vaso-flores absolute bottom-0 h-37.5 w-33.75 ${
              espelhar ? "right-[2%] -scale-x-100" : "left-[2%]"
            }`}
            viewBox="0 0 160 170"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d="M79 119Q70 84 54 66m25 53q6-38 27-66m-27 66q-5-26-31-34"
              fill="none"
              stroke="#63784e"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M62 91q-24-20-35-7 12 20 34 19m32-25q20-25 34-15-6 22-29 30"
              fill="#71885c"
            />
            <g fill="#e6a8bb">
              <circle cx="107" cy="39" r="12" />
              <circle cx="91" cy="48" r="12" />
              <circle cx="98" cy="64" r="12" />
              <circle cx="116" cy="64" r="12" />
              <circle cx="123" cy="47" r="12" />
              <circle cx="51" cy="63" r="10" />
              <circle cx="39" cy="71" r="10" />
              <circle cx="45" cy="85" r="10" />
              <circle cx="60" cy="83" r="10" />
              <circle cx="64" cy="68" r="10" />
            </g>
            <g fill="#f3d37b">
              <circle cx="107" cy="52" r="6" />
              <circle cx="51" cy="74" r="5" />
            </g>
            <path
              d="M47 119h65l-8 39H55z"
              fill="#a96f58"
              stroke="#69483c"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M42 117h75v12H42z"
              fill="#c38567"
              stroke="#69483c"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M59 139h40"
              stroke="#d7a07d"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".8"
            />
          </svg>
        ))}
      </div>

      {/* a coruja */}
      <div
        className="coruja-stage absolute left-1/2 z-25 -translate-x-1/2"
        style={{
          bottom: "calc(var(--sill) - clamp(14px, 3vh, 30px))",
          height: "clamp(190px, 44vh, 520px)",
          aspectRatio: "300 / 360",
        }}
      >
        <Coruja
          expressao={cena.coruja}
          cenaId={cena.id}
          gesto={gesto}
          festa={festa}
        />
      </div>

      <ControleSom ativo={som.ativo} aoAlternar={som.alternar} />
      <Aviso texto={aviso} />

      {!comecou ? (
        <TelaInicial aoComecar={comecar} />
      ) : (
        <div className="absolute inset-0 z-30 flex justify-center">
          <Cena key={cena.id} cena={cena} som={som} />
        </div>
      )}
    </main>
  );
}
