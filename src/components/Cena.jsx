import { useCallback, useState } from "react";
import Dialogo from "./Dialogo.jsx";
import Opcoes from "./Opcoes.jsx";
import CampoTexto from "./CampoTexto.jsx";

// Uma cena = a fala da coruja + o que a pessoa pode fazer em seguida.
// Cada cena já traz as funções do que acontece depois (opcao.ao, entrada.ao, continuar, fim.ao).
// O App usa key={cena.id}, então o estado "pronto" reinicia a cada cena.
export default function Cena({ cena, som }) {
  const [pronto, setPronto] = useState(false);
  const terminou = useCallback(() => setPronto(true), []);

  const botaoSimples =
    "aparecer rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] px-12 py-5 text-2xl text-[#2b2140] shadow-[0_4px_0_#c98f4c] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0.5 active:shadow-[0_1px_0_#c98f4c]";

  return (
    <div className="flex h-full w-full max-w-230 flex-col items-center px-4 sm:px-8 lg:px-12">
      <div className="mt-[clamp(6.5rem,15vh,12rem)] w-full text-center">
        <Dialogo
          texto={cena.texto}
          aoDigitar={som.tocarDigitar}
          aoTerminar={terminou}
        />
      </div>

      <div
        className={`respostas-zona mt-auto flex w-full min-h-0 justify-center ${
          cena.opcoes || cena.entrada || cena.fim
            ? "items-center overflow-y-auto"
            : "items-end pb-10"
        }`}
        style={{ height: "var(--sill)" }}
      >
        {pronto && cena.opcoes && (
          <Opcoes
            opcoes={cena.opcoes}
            aoEscolher={(opcao) => {
              som.tocarEscolha();
              opcao.ao();
            }}
          />
        )}

        {pronto && cena.entrada && (
          <CampoTexto
            placeholder={cena.entrada.placeholder}
            aoEnviar={(valor) => {
              som.tocarEscolha();
              cena.entrada.ao(valor);
            }}
          />
        )}

        {pronto && cena.continuar && (
          <button
            type="button"
            className={`${botaoSimples} continuar-mais-alto`}
            onClick={() => {
              som.tocarEscolha();
              cena.continuar();
            }}
          >
            continuar
          </button>
        )}

        {pronto && cena.fim && (
          <button
            type="button"
            className={`${botaoSimples} botao-final`}
            onClick={cena.fim.ao}
          >
            {cena.fim.texto}
          </button>
        )}
      </div>
    </div>
  );
}
