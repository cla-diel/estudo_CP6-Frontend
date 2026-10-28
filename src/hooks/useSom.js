import { useCallback, useRef, useState } from 'react'

// Todos os sons são sintetizados pelo navegador (Web Audio API):
// não precisa baixar nenhum arquivo de áudio.
// O navegador só libera o áudio depois de um clique, por isso existe iniciar().
export default function useSom() {
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const ambienteRef = useRef(null)
  const ativoRef = useRef(true)
  const [ativo, setAtivo] = useState(true)

  const nota = useCallback((freq, atraso, duracao, volume, tipo = 'sine') => {
    const ctx = ctxRef.current
    if (!ctx || !masterRef.current) return
    const t = ctx.currentTime + atraso
    const osc = ctx.createOscillator()
    const ganho = ctx.createGain()
    osc.type = tipo
    osc.frequency.setValueAtTime(freq, t)
    ganho.gain.setValueAtTime(0.0001, t)
    ganho.gain.linearRampToValueAtTime(volume, t + 0.02)
    ganho.gain.exponentialRampToValueAtTime(0.0001, t + duracao)
    osc.connect(ganho).connect(masterRef.current)
    osc.start(t)
    osc.stop(t + duracao + 0.05)
  }, [])

  const iniciar = useCallback(() => {
    if (ctxRef.current) {
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
      return
    }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = ativoRef.current ? 0.18 : 0
    master.connect(ctx.destination)
    masterRef.current = master

    ctx.resume()
  }, [])

  const iniciarAmbiente = useCallback(() => {
    if (ambienteRef.current) return
    ambienteRef.current = window.setInterval(() => {
      if (!ativoRef.current || !ctxRef.current || !masterRef.current) return
      const ctx = ctxRef.current
      const t = ctx.currentTime
      const osc = ctx.createOscillator()
      const ganho = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(3100 + Math.random() * 350, t)
      osc.frequency.exponentialRampToValueAtTime(2500 + Math.random() * 250, t + 0.12)
      ganho.gain.setValueAtTime(0.0001, t)
      ganho.gain.linearRampToValueAtTime(0.04, t + 0.025)
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
      osc.connect(ganho).connect(masterRef.current)
      osc.start(t)
      osc.stop(t + 0.18)
    }, 4200)
  }, [])

  const alternar = useCallback(() => {
    const novo = !ativoRef.current
    ativoRef.current = novo
    setAtivo(novo)
    const ctx = ctxRef.current
    if (ctx && masterRef.current) {
      if (novo && ctx.state === 'suspended') ctx.resume()
      masterRef.current.gain.setTargetAtTime(novo ? 0.18 : 0, ctx.currentTime, 0.2)
    }
    if (novo) iniciarAmbiente()
    else if (ambienteRef.current) {
      window.clearInterval(ambienteRef.current)
      ambienteRef.current = null
    }
  }, [iniciarAmbiente])

  // Sininho ao escolher uma resposta
  const tocarEscolha = useCallback(() => {
    nota(660, 0, 0.45, 0.025)
    nota(990, 0.09, 0.5, 0.018)
  }, [nota])

  // "Uu-uuu" fofinho da coruja
  const tocarPio = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx || !masterRef.current) return
    ;[0, 0.55].forEach((atraso, i) => {
      const t = ctx.currentTime + atraso
      const osc = ctx.createOscillator()
      const ganho = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(i === 0 ? 340 : 300, t)
      osc.frequency.exponentialRampToValueAtTime(i === 0 ? 290 : 250, t + 0.4)
      ganho.gain.setValueAtTime(0.0001, t)
      ganho.gain.linearRampToValueAtTime(0.1, t + 0.08)
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)
      osc.connect(ganho).connect(masterRef.current)
      osc.start(t)
      osc.stop(t + 0.5)
    })
  }, [])

  // Sininhos alegres quando a pessoa volta
  const tocarFesta = useCallback(() => {
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => nota(f, i * 0.09, 0.7, 0.035))
    nota(1318.5, 0.4, 0.9, 0.02)
  }, [nota])

  // Mantido como no-op para que o texto não produza ruído de digitação.
  const tocarDigitar = useCallback(() => {
  }, [])

  return { ativo, iniciar, alternar, tocarEscolha, tocarPio, tocarFesta, tocarDigitar }
}
