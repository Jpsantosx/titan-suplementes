"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import catalogo from "@/data/produtos.json";
import { ArrowRight, ShoppingCart, Info, Award } from "lucide-react";

type Objective = "hipertrofia" | "emagrecimento" | "resistencia";
type Frequency = "baixa" | "moderada" | "alta";

interface CalResult {
  proteina: number;
  carboidrato: number;
  calorias: number;
  agua: number;
  recomendacoes: number[]; // ids dos produtos
}

export default function CalculadoraPage() {
  const { addToCart } = useCart();
  const [peso, setPeso] = useState<number>(75);
  const [objetivo, setObjetivo] = useState<Objective>("hipertrofia");
  const [frequencia, setFrequencia] = useState<Frequency>("moderada");
  const [resultado, setResultado] = useState<CalResult | null>(null);

  function calcularMacros() {
    if (peso <= 0) return;

    // Fator de atividade
    const fatorAtividade = {
      baixa: 1.2,
      moderada: 1.375,
      alta: 1.55,
    }[frequencia];

    // Necessidade energética basal aproximada
    const basal = peso * 24 * fatorAtividade;

    let proteinaG = 0;
    let carboG = 0;
    let caloriasAlvo = 0;
    let recs: number[] = [];

    if (objetivo === "hipertrofia") {
      proteinaG = peso * 2.0;
      caloriasAlvo = basal + 400;
      carboG = (caloriasAlvo - (proteinaG * 4)) / 4;
      recs = [1, 2, 12]; // Whey, Creatina, Mass Gainer
    } else if (objetivo === "emagrecimento") {
      proteinaG = peso * 2.2; // Alta proteína no deficit
      caloriasAlvo = basal - 500;
      carboG = (caloriasAlvo - (proteinaG * 4)) / 4;
      recs = [10, 11, 5]; // Thermogenico, L-Carnitina, Whey Blend
    } else {
      proteinaG = peso * 1.6;
      caloriasAlvo = basal;
      carboG = (caloriasAlvo - (proteinaG * 4)) / 4;
      recs = [3, 4, 16]; // Pré-Treino, BCAA, Cafeína
    }

    // Limitar valores para não ficarem negativos
    carboG = Math.max(carboG, 50);

    const aguaMl = peso * 35;

    setResultado({
      proteina: Math.round(proteinaG),
      carboidrato: Math.round(carboG),
      calorias: Math.round(caloriasAlvo),
      agua: Number((aguaMl / 1000).toFixed(1)),
      recomendacoes: recs,
    });
  }

  // Obter detalhes dos produtos recomendados
  const produtosRecomendados = resultado
    ? catalogo.produtos.filter((p) => resultado.recomendacoes.includes(p.id))
    : [];

  function formatPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleAddRecomendado(prod: (typeof catalogo.produtos)[number]) {
    addToCart({
      id: prod.id,
      nome: prod.nome,
      preco: prod.preco,
      imagem: prod.imagem,
      peso: prod.peso,
      sabor: prod.sabores.length > 0 ? prod.sabores[0] : "Sem sabor",
    });
  }

  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 md:px-8 lg:px-36 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header da Calculadora */}
        <div className="mb-20">
          <span className="text-xs font-bold text-yellow-500 uppercase tracking-[0.3em] block mb-3">
            Otimizador de Resultados
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Calculadora <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Nutricional
            </span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-6"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light">
            Descubra suas necessidades diárias de macronutrientes e acelere seus resultados com o combustível correto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Painel de Inputs */}
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 md:p-12 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 pointer-events-none rotate-45 transform translate-x-16 -translate-y-16" />
            
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 border-b border-gray-900 pb-4">
              Configurar Perfil
            </h2>

            {/* Input Peso */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex justify-between">
                <span>Peso Atual (kg)</span>
                <span className="text-yellow-500 font-black">{peso} kg</span>
              </label>
              <input
                type="range"
                min="40"
                max="150"
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                className="w-full h-2 bg-gray-950 appearance-none outline-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase">
                <span>40 kg</span>
                <span>95 kg</span>
                <span>150 kg</span>
              </div>
            </div>

            {/* Input Objetivo */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Objetivo Principal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: "hipertrofia", label: "Hipertrofia", desc: "Ganho de massa muscular" },
                  { id: "emagrecimento", label: "Queima", desc: "Definição e perda de gordura" },
                  { id: "resistencia", label: "Performance", desc: "Força e resistência geral" },
                ].map((obj) => (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => setObjetivo(obj.id as Objective)}
                    className={`p-4 border text-left flex flex-col justify-between transition-all duration-300 ${
                      objetivo === obj.id
                        ? "bg-yellow-500 border-yellow-500 text-black"
                        : "bg-[#111] border-gray-800 text-white hover:border-gray-600"
                    }`}
                  >
                    <span className="font-black uppercase tracking-wider text-xs">{obj.label}</span>
                    <span className={`text-[9px] mt-2 block ${objetivo === obj.id ? "text-black/80" : "text-gray-500"}`}>
                      {obj.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Frequência */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Frequência de Treino
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "baixa", label: "Leve", freq: "1-2x/sem" },
                  { id: "moderada", label: "Intenso", freq: "3-4x/sem" },
                  { id: "alta", label: "Hardcore", freq: "5-7x/sem" },
                ].map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setFrequencia(freq.id as Frequency)}
                    className={`py-3 border text-center transition-all duration-300 ${
                      frequencia === freq.id
                        ? "bg-yellow-500 border-yellow-500 text-black font-black"
                        : "bg-[#111] border-gray-800 text-white hover:border-gray-600 text-xs font-bold"
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-wider">{freq.label}</span>
                    <span className={`text-[8px] mt-1 block ${frequencia === freq.id ? "text-black/70" : "text-gray-500"}`}>
                      {freq.freq}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ação */}
            <button
              onClick={calcularMacros}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-5 flex items-center justify-center gap-4 transition-colors border border-yellow-500"
            >
              Calcular Minha Dose
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Painel de Resultados */}
          <div>
            {!resultado ? (
              <div className="border border-gray-800 border-dashed h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-[#030303]">
                <Info className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="font-bold uppercase tracking-wider text-gray-500 mb-2">Aguardando Parâmetros</h3>
                <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                  Insira seus dados ao lado e clique em Calcular para estimar seus macros de batalha.
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                
                {/* Cards de Resultados */}
                <div className="bg-[#0a0a0a] border border-gray-800 p-8 relative overflow-hidden">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" /> Metas Diárias Calculadas
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Calorias */}
                    <div className="bg-black border border-gray-900 p-6">
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Energia</span>
                      <span className="text-3xl md:text-4xl font-black text-yellow-500">{resultado.calorias}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider font-bold ml-1">kcal</span>
                    </div>

                    {/* Proteína */}
                    <div className="bg-black border border-gray-900 p-6">
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Proteínas</span>
                      <span className="text-3xl md:text-4xl font-black text-white">{resultado.proteina}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider font-bold ml-1">g</span>
                    </div>

                    {/* Carboidratos */}
                    <div className="bg-black border border-gray-900 p-6">
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Carboidratos</span>
                      <span className="text-3xl md:text-4xl font-black text-white">{resultado.carboidrato}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider font-bold ml-1">g</span>
                    </div>

                    {/* Hidratação */}
                    <div className="bg-black border border-gray-900 p-6">
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Água Recomendada</span>
                      <span className="text-3xl md:text-4xl font-black text-yellow-500">{resultado.agua}</span>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider font-bold ml-1">Litros</span>
                    </div>
                  </div>
                </div>

                {/* Bloco de Suplementação Recomendada */}
                <div className="bg-[#0a0a0a] border border-gray-800 p-8 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                    Arsenal Sugerido Para {objetivo === "hipertrofia" ? "Hipertrofia" : objetivo === "emagrecimento" ? "Queima" : "Performance"}
                  </h3>

                  <div className="space-y-4">
                    {produtosRecomendados.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex gap-4 items-center justify-between p-4 bg-black border border-gray-900 hover:border-yellow-500/30 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-[#050505] p-2 border border-gray-900 flex items-center justify-center flex-shrink-0">
                            <Image src={prod.imagem} alt={prod.nome} width={48} height={48} className="object-contain max-h-full" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-wide text-white group-hover:text-yellow-400 transition-colors">
                              {prod.nome}
                            </h4>
                            <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                              {prod.peso}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-black text-yellow-500 text-sm">{formatPreco(prod.preco)}</span>
                          <button
                            onClick={() => handleAddRecomendado(prod)}
                            className="bg-white/5 border border-gray-900 p-2 text-gray-400 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-colors"
                            aria-label="Adicionar ao carrinho"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
