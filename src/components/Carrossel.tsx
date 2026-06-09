// src/components/Carrossel.tsx
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/banners/banner_whey_gold.jpg",
    alt: "Whey Protein Premium",
    tag: "Mais Vendido",
    titulo: "Whey Protein",
    subtitulo: "Recuperação máxima. Músculo real.",
    cta: "Ver Produto",
    href: "/produtos",
    accentColor: "#F59E0B",
  },
  {
    src: "/banners/banner2.jpg",
    alt: "Resultados Reais",
    tag: "Promoção",
    titulo: "Resultados\nReais.",
    subtitulo: "Matéria-prima premium para quem não aceita menos.",
    cta: "Comprar Agora",
    href: "/produtos",
    accentColor: "#F59E0B",
  },
  {
    src: "/banners/banner3.jpg",
    alt: "Melhor Preço",
    tag: "Oferta Especial",
    titulo: "Melhor\nPreço.",
    subtitulo: "Suplementação de alto nível sem pesar no bolso.",
    cta: "Ver Ofertas",
    href: "/produtos",
    accentColor: "#F59E0B",
  },
]

const AUTOPLAY_INTERVAL = 5000
const TOTAL = slides.length

export default function BannerCarrossel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  // ─── Navegação ───────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setCurrent(((index % TOTAL) + TOTAL) % TOTAL)
    setProgress(0)
  }, [])

  // Ref para o índice atual — evita stale closure nos handlers manuais
  const currentRef = useRef(0)
  useEffect(() => {
    currentRef.current = current
  }, [current])

  const next = useCallback(() => goTo(currentRef.current + 1), [goTo])
  const prev = useCallback(() => goTo(currentRef.current - 1), [goTo])

  // ─── Autoplay robusto ────────────────────────────────────────
  // Usa o updater funcional de setCurrent para nunca capturar `current` antigo.
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL)
      setProgress(0)
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [isPaused]) // ← só reage a pause/unpause, nunca recria por mudança de slide

  // ─── Barra de progresso ──────────────────────────────────────
  useEffect(() => {
    if (isPaused) return
    const step = 100 / (AUTOPLAY_INTERVAL / 50)
    let localProgress = 0
    const id = setInterval(() => {
      localProgress = Math.min(localProgress + step, 100)
      setProgress(localProgress)
    }, 50)
    return () => clearInterval(id)
  }, [current, isPaused])

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ background: "#000" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Slides ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px]">
        {slides.map((slide, idx) => {
          const isActive = idx === current
          return (
            <div
              key={idx}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.04)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* Imagem */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className="object-cover"
                style={{ filter: "brightness(0.35) grayscale(20%)" }}
              />

              {/* Gradiente lateral */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)",
                }}
              />

              {/* Linha decorativa amarela */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ background: slide.accentColor }}
              />

              {/* Conteúdo */}
              <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
                <div
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                    maxWidth: "32rem",
                  }}
                >
                  {/* Tag */}
                  <span
                    className="inline-block text-xs font-black uppercase tracking-[0.3em] px-3 py-1 mb-5"
                    style={{ background: slide.accentColor, color: "#000" }}
                  >
                    {slide.tag}
                  </span>

                  {/* Título */}
                  <h2
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-5"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {slide.titulo}
                  </h2>

                  {/* Subtítulo */}
                  <p className="text-gray-300 text-base md:text-lg font-light mb-8 border-l-2 border-yellow-500 pl-4 max-w-sm">
                    {slide.subtitulo}
                  </p>

                  {/* CTA */}
                  <Link
                    href={slide.href}
                    className="group inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest px-8 py-4 transition-colors duration-300"
                    style={{ background: slide.accentColor, color: "#000" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#FCD34D" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = slide.accentColor }}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Botão Anterior ─────────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* ── Botão Próximo ──────────────────────────────────────── */}
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dots + Barra de progresso ──────────────────────────── */}
      <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 z-10 flex items-center gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
            className="relative flex items-center"
          >
            {idx === current ? (
              // Dot ativo com preenchimento animado
              <span
                className="relative overflow-hidden block"
                style={{ width: 48, height: 3, background: "rgba(255,255,255,0.2)" }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#F59E0B",
                    transformOrigin: "left",
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 0.05s linear",
                  }}
                />
              </span>
            ) : (
              // Dot inativo
              <span
                className="block hover:bg-gray-300 transition-colors"
                style={{ width: 20, height: 2, background: "rgba(255,255,255,0.25)" }}
              />
            )}
          </button>
        ))}

        {/* Contador numérico */}
        <span className="text-xs text-gray-400 font-mono ml-2">
          {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* ── Indicador de pausa ─────────────────────────────────── */}
      {isPaused && (
        <div className="absolute top-4 right-16 z-10">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
            pausado
          </span>
        </div>
      )}
    </div>
  )
}