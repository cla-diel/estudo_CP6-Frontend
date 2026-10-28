import { useEffect, useState } from 'react'
import {
  ABERTURA,
  VOLTAS,
  COMO_ESTA,
  PONTES,
  MAIS_UMA,
  DESPEDIDA,
  LEMBRANCA,
  PADRAO_CUIDADO,
  CUIDADO,
  PERGUNTAS,
} from '../data/conversa.js'

// ---------- Memória do Owlbert (fica só no navegador da pessoa) ----------
const CHAVE = 'owlbert:memoria:v1'

function memoriaVazia() {
  return { nome: '', feitas: [], total: 0, respostas: {}, ultimaVisita: null }
}

function lerMemoria() {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (bruto) return { ...memoriaVazia(), ...JSON.parse(bruto) }
  } catch {
    // sem armazenamento disponível: o jogo funciona do mesmo jeito, só não lembra
  }
  return memoriaVazia()
}

function salvarMemoria(memoria) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(memoria))
  } catch {
    // ignora
  }
}

// Lida uma única vez, quando o site abre (assim sabemos há quanto tempo a pessoa sumiu)
const MEMORIA = lerMemoria()
const HORAS_AUSENTE = MEMORIA.ultimaVisita ? (Date.now() - MEMORIA.ultimaVisita) / 3600000 : null
const RESPOSTAS_ANTIGAS = new Set(Object.keys(MEMORIA.respostas))

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)]
const LIMITE_PERGUNTAS_SESSAO = 8
const SINAL_DE_DIFICULDADE = /\b(triste|sozinh|cansad|dif[ií]cil|medo|ansios|preocup|saudade|perdi|dor|chorei|falhei|n[aã]o consigo|confuso|assust)\w*/i
const SINAL_DE_ALEGRIA = /\b(feliz|alegr|amo|adoro|orgulho|consegui|lindo|maravilh|bom|boa|legal|divert)\w*/i

// ---------- O "cérebro" da conversa ----------
// Cada cena é um objeto { id, texto, humor, coruja, opcoes | continuar | entrada | fim }
// e já traz as funções que dizem o que acontece depois (ao).
export function criarMotor(memoria = MEMORIA, horasAusente = HORAS_AUSENTE, antigas = RESPOSTAS_ANTIGAS) {
  const sessao = { leve: false, lembrou: false, respondidas: 0 }
  const m = { n: 0, ir: () => {} } // m.ir é ligado ao useState lá embaixo
  const registrar = () => {
    memoria.ultimaVisita = Date.now()
    salvarMemoria(memoria)
  }

  const dizer = (texto, extra = {}) =>
    texto.replace(/\{(\w+)\}/g, (_, chave) => extra[chave] ?? (chave === 'nome' ? memoria.nome : ''))

  const nova = (dados) => ({ id: `cena-${++m.n}`, humor: 'noite', coruja: 'normal', ...dados })
  const ir = (cena) => m.ir(cena)

  // ----- primeira visita -----
  function inicio() {
    return nova({
      texto: ABERTURA.texto,
      opcoes: ABERTURA.opcoes.map((o) => ({
        texto: o.texto,
        ao: () => ir(nova({
          texto: o.reacao.texto,
          coruja: o.reacao.coruja,
          humor: o.reacao.humor,
          continuar: () => ir(pedirNome()),
        })),
      })),
    })
  }

  function pedirNome() {
    return nova({
      texto: ABERTURA.pedirNome.texto,
      humor: 'quente',
      coruja: 'surpresa',
      entrada: {
        placeholder: ABERTURA.pedirNome.placeholder,
        ao: (valor) => {
          memoria.nome = valor
          registrar()
          ir(
            nova({
              texto: dizer(ABERTURA.apresentacao),
              humor: 'alegre',
              coruja: 'feliz',
              continuar: () => ir(comoEsta()),
            }),
          )
        },
      },
    })
  }

  // ----- a pessoa voltou -----
  function volta(horas) {
    const v = VOLTAS.find((x) => horas < x.ate)
    return nova({
      texto: dizer(v.texto),
      humor: 'quente',
      coruja: 'feliz',
      festa: v.festa,
      continuar: () => ir(comoEsta()),
    })
  }

  function comoEsta() {
    return nova({
      texto: COMO_ESTA.texto,
      humor: 'quente',
      coruja: 'normal',
      opcoes: COMO_ESTA.opcoes.map((o) => ({
        texto: o.texto,
        ao: () => {
          if (o.leve) sessao.leve = true
          ir(depois(o.reacao.texto, o.reacao.coruja, o.reacao.humor))
        },
      })),
    })
  }

  // ----- perguntas -----
  function escolherPergunta() {
    const limite = sessao.leve ? 2 : 4
    const nivel = Math.min(limite, 1 + Math.floor(memoria.total / 3))
    const livres = (n) => PERGUNTAS.filter((p) => p.nivel === n && !memoria.feitas.includes(p.id))

    for (let n = nivel; n >= 1; n--) {
      const lista = livres(n)
      if (lista.length) return sortear(lista)
    }
    for (let n = nivel + 1; n <= limite; n++) {
      const lista = livres(n)
      if (lista.length) return sortear(lista)
    }
    // acabaram todas: embaralha de novo (o total continua, então a profundidade também)
    memoria.feitas = []
    return sortear(PERGUNTAS.filter((p) => p.nivel === nivel))
  }

  function lembranca() {
    const ids = [...antigas].filter((id) => memoria.respostas[id] && PERGUNTAS.some((p) => p.id === id))
    if (sessao.lembrou || !ids.length || Math.random() > 0.5) return null
    const id = sortear(ids)
    const pergunta = PERGUNTAS.find((p) => p.id === id)
    sessao.lembrou = true
    return nova({
      texto: dizer(LEMBRANCA.texto, { rotulo: pergunta.rotulo, resposta: memoria.respostas[id] }),
      humor: 'profundo',
      opcoes: LEMBRANCA.opcoes.map((o) => ({
        texto: o.texto,
        ao: () => ir(depois(o.reacao, 'normal', 'quente')),
      })),
    })
  }

  function proxima() {
    return lembranca() || perguntar()
  }

  function perguntar() {
    const q = escolherPergunta()
    const texto = `${sortear(PONTES)} ${q.texto}`
    const humor = q.nivel >= 3 ? 'profundo' : 'noite'

    if (q.opcoes) {
      return nova({
        texto,
        humor,
        opcoes: q.opcoes.map((o) => ({ texto: o.texto, ao: () => responder(q, o.texto, o) })),
      })
    }
    return nova({
      texto,
      humor,
      entrada: { placeholder: q.placeholder, ao: (valor) => responder(q, valor, null) },
    })
  }

  function responder(q, valor, opcao) {
    if (!opcao && PADRAO_CUIDADO.test(valor)) {
      ir(cuidado())
      return
    }
    if (!memoria.feitas.includes(q.id)) memoria.feitas.push(q.id)
    memoria.total += 1
    sessao.respondidas += 1
    if (q.guardar && !opcao) memoria.respostas[q.id] = valor
    registrar()

    if (opcao) {
      ir(depois(opcao.reacao, opcao.coruja || 'normal', opcao.humor || 'quente'))
    } else {
      const coruja = SINAL_DE_DIFICULDADE.test(valor)
        ? 'triste'
        : SINAL_DE_ALEGRIA.test(valor)
          ? 'feliz'
          : q.coruja || 'normal'
      ir(depois(dizer(q.reacao, { resposta: valor }), coruja, 'quente'))
    }
  }

  // Mantém a conversa fluindo por várias perguntas antes de oferecer a saída.
  function depois(texto, coruja = 'normal', humor = 'quente') {
    if (sessao.respondidas >= LIMITE_PERGUNTAS_SESSAO) {
      return nova({
        texto,
        coruja,
        humor,
        opcoes: [
          {
            texto: MAIS_UMA.continuar,
            ao: () => {
              sessao.respondidas = 0
              ir(proxima())
            },
          },
          { texto: MAIS_UMA.encerrar, ao: () => ir(despedida()) },
        ],
      })
    }
    return nova({ texto, coruja, humor, continuar: () => ir(proxima()) })
  }

  function cuidado() {
    sessao.leve = true
    return nova({
      texto: CUIDADO.texto,
      humor: 'profundo',
      coruja: 'triste',
      opcoes: [
        { texto: CUIDADO.opcoes[0].texto, ao: () => ir(depois(CUIDADO.opcoes[0].reacao, 'normal', 'quente')) },
        { texto: CUIDADO.opcoes[1].texto, ao: () => ir(despedida()) },
      ],
    })
  }

  function despedida() {
    return nova({
      texto: dizer(DESPEDIDA.texto),
      humor: 'noite',
      coruja: 'feliz',
      fim: {
        texto: DESPEDIDA.botao,
        ao: () => {
          sessao.respondidas = 0
          ir(volta(0))
        },
      },
    })
  }

  function abertura() {
    return memoria.nome ? volta(horasAusente ?? 0) : inicio()
  }

  return { m, memoria, registrar, abertura }
}

// ---------- Hook usado pelo App ----------
export default function useConversa() {
  const [motor] = useState(() => criarMotor())
  const [cena, setCena] = useState(() => motor.abertura())
  motor.m.ir = setCena

  // guarda "quando a pessoa esteve aqui" para saber, na próxima vez, há quanto tempo ela sumiu
  useEffect(() => {
    motor.registrar()
    const aoSair = () => motor.registrar()
    const aoEsconder = () => {
      if (document.hidden) motor.registrar()
    }
    window.addEventListener('pagehide', aoSair)
    document.addEventListener('visibilitychange', aoEsconder)
    return () => {
      window.removeEventListener('pagehide', aoSair)
      document.removeEventListener('visibilitychange', aoEsconder)
    }
  }, [motor])

  return { cena, nome: motor.memoria.nome }
}
