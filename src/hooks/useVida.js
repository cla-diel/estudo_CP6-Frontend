import { useCallback, useEffect, useRef, useState } from 'react'

// Gestos que o Owlbert faz sozinho quando a conversa está parada
const GESTOS = ['olhar', 'penas', 'pulinho', 'bocejo', 'contente', 'coracao']

// "Vida própria": gestos aleatórios no tempo ocioso + festa quando a pessoa volta à aba
export default function useVida({ nome, som }) {
  const { tocarFesta, tocarPio } = som
  const [gesto, setGesto] = useState(null)
  const [festa, setFesta] = useState(0)
  const [aviso, setAviso] = useState(null)
  const timers = useRef({})
  const ultimoGesto = useRef(null)
  const ocultoEm = useRef(null)

  // festa: intensidade 1 (normal) ou 2 (grande), com texto opcional no aviso do topo
  const celebrar = useCallback(
    (intensidade = 1, texto = null, tocarSom = true) => {
      setFesta(intensidade)
      setAviso(texto)
      if (tocarSom) tocarFesta()
      clearTimeout(timers.current.festa)
      clearTimeout(timers.current.aviso)
      timers.current.festa = setTimeout(() => setFesta(0), 3800)
      if (texto) timers.current.aviso = setTimeout(() => setAviso(null), 5500)
    },
    [tocarFesta],
  )

  // gestos aleatórios a cada 6 a 13 segundos
  useEffect(() => {
    let espera
    let duracao
    const agendar = () => {
      espera = setTimeout(
        () => {
          const lista = GESTOS.filter((g) => g !== ultimoGesto.current)
          const escolhido = lista[Math.floor(Math.random() * lista.length)]
          ultimoGesto.current = escolhido
          setGesto(escolhido)
          if (escolhido === 'coracao') tocarPio()
          duracao = setTimeout(() => {
            setGesto(null)
            agendar()
          }, 2600)
        },
        6000 + Math.random() * 7000,
      )
    }
    agendar()
    return () => {
      clearTimeout(espera)
      clearTimeout(duracao)
    }
  }, [tocarPio])

  // pessoa saiu da aba e voltou
  useEffect(() => {
    function aoMudar() {
      if (document.hidden) {
        ocultoEm.current = Date.now()
        return
      }
      if (!ocultoEm.current) return
      const minutos = (Date.now() - ocultoEm.current) / 60000
      ocultoEm.current = null
      if (minutos < 1) return

      const quem = nome ? `, ${nome}` : ''
      if (minutos < 10) celebrar(1, `Ah, você voltou${quem}!`)
      else if (minutos < 60) celebrar(1, `Que bom que você voltou${quem}!`)
      else celebrar(2, `${nome || 'Você'}! Você voltou! Senti sua saudade.`)
    }
    document.addEventListener('visibilitychange', aoMudar)
    return () => document.removeEventListener('visibilitychange', aoMudar)
  }, [nome, celebrar])

  // limpa os temporizadores ao sair
  useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearTimeout)
  }, [])

  return { gesto, festa, aviso, celebrar }
}
