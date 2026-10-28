// Botões de resposta, no pé da tela (como no jogo que nos inspirou)
export default function Opcoes({ opcoes, aoEscolher }) {
  const tresOpcoes = opcoes.length === 3;
  const quatroOpcoes = opcoes.length === 4;
  const maisDeQuatro = opcoes.length > 4;
  const classeLayout = tresOpcoes
    ? "respostas-tres grid grid-cols-1 md:grid-cols-3"
    : quatroOpcoes
      ? "respostas-quatro grid grid-cols-2"
      : maisDeQuatro
        ? "respostas-varias grid grid-cols-2"
        : "respostas-poucas grid grid-cols-1";

  return (
    <div
      className={`respostas-opcoes aparecer grid w-full gap-2.5 ${classeLayout}`}
    >
      {opcoes.map((opcao) => (
        <button
          key={opcao.texto}
          type="button"
          onClick={() => aoEscolher(opcao)}
          className="rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] text-[#2b2140] shadow-[0_4px_0_#c98f4c] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0.5 active:shadow-[0_1px_0_#c98f4c]"
        >
          {opcao.texto}
        </button>
      ))}
    </div>
  );
}
