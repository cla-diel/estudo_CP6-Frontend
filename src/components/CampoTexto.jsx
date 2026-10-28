import { useState } from "react";

// Campo para a pessoa escrever (nome, coisa boa do dia...)
export default function CampoTexto({ placeholder, aoEnviar }) {
  const [valor, setValor] = useState("");

  function enviar(e) {
    e.preventDefault();
    const limpo = valor.trim();
    if (limpo) aoEnviar(limpo);
  }

  return (
    <form
      onSubmit={enviar}
      className="resposta-input aparecer flex w-full gap-2.5"
    >
      <label htmlFor="campo-resposta" className="sr-only">
        {placeholder}
      </label>
      <input
        id="campo-resposta"
        autoFocus
        maxLength={60}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="min-w-0 flex-1 rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] px-4 py-3 text-lg text-[#2b2140] placeholder:text-[#2b2140]/55"
      />
      <button
        type="submit"
        disabled={!valor.trim()}
        className="botao-resposta-input rounded-2xl border border-[#ecc98d]/60 bg-[#fff3de] px-5 py-3 text-lg text-[#2b2140] shadow-[0_4px_0_#c98f4c] transition hover:bg-white active:translate-y-0.5 active:shadow-[0_1px_0_#c98f4c] disabled:opacity-50"
      >
        ok
      </button>
    </form>
  );
}
