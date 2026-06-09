"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import catalogo from "@/data/produtos.json";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Flame, RefreshCw } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Simulando reviews de usuários para dar autoridade e prova social
const reviewsMock = [
  { nome: "Bruno S.", nota: 5, data: "05/06/2026", texto: "Matéria-prima de outro nível. Solubilidade fantástica e resultados visíveis em poucas semanas. Recomendo fortemente!" },
  { nome: "Mariana K.", nota: 5, data: "01/06/2026", texto: "O melhor sabor que já experimentei. Zero residual e muito puro. A Titan realmente entregou o que prometeu." },
  { nome: "Rodrigo F.", nota: 4, data: "28/05/2026", texto: "Muito focado e limpo. A entrega foi extremamente rápida, chegou no dia seguinte ao pedido." }
];

export default function ProdutoDetalhePage({ params }: PageProps) {
  const { addToCart } = useCart();
  
  // Resolução robusta de params do Next.js (suporta 14 e 15)
  const resolvedParams = "then" in params
    ? use(params as Promise<{ slug: string }>)
    : (params as { slug: string });
  
  const { slug } = resolvedParams;

  // Encontrar o produto no JSON
  const produto = catalogo.produtos.find((p) => p.slug === slug);

  // Estados locais
  const [saborSelecionado, setSaborSelecionado] = useState<string>(
    produto?.sabores.length ? produto.sabores[0] : "Sem sabor"
  );
  const [quantidade, setQuantidade] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!produto) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight text-red-500 mb-4">Produto Não Encontrado</h1>
        <p className="text-gray-400 mb-8 max-w-sm">O produto solicitado não consta em nosso arsenal de suplementação.</p>
        <Link href="/produtos" className="bg-yellow-500 text-black font-bold uppercase tracking-widest px-8 py-4 text-xs transition-colors hover:bg-yellow-400">
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  function formatPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleAddToCart() {
    if (!produto) return;
    addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      peso: produto.peso,
      sabor: saborSelecionado,
      quantidade
    });

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  }

  // Tabela Nutricional Fictícia Baseada na Categoria
  const tabelaNutricional: Record<string, { porcao: string, itens: { nome: string, valor: string, vd: string }[] }> = {
    proteinas: {
      porcao: "30g (1 scoop)",
      itens: [
        { nome: "Valor Energético", valor: "120 kcal", vd: "6%" },
        { nome: "Proteínas", valor: "27g", vd: "36%" },
        { nome: "Carboidratos", valor: "1.2g", vd: "0%" },
        { nome: "Gorduras Totais", valor: "0.8g", vd: "1%" },
        { nome: "Sódio", valor: "55mg", vd: "2%" }
      ]
    },
    performance: {
      porcao: "10g (1/2 scoop)",
      itens: [
        { nome: "Beta-Alanina", valor: "2000mg", vd: "**" },
        { nome: "L-Arginina", valor: "1000mg", vd: "**" },
        { nome: "Cafeína Anidra", valor: "200mg", vd: "**" },
        { nome: "L-Citrulina", valor: "3000mg", vd: "**" },
        { nome: "Vitamina B6", valor: "1.3mg", vd: "100%" }
      ]
    },
    recuperacao: {
      porcao: "5g (1 colher de chá)",
      itens: [
        { nome: "L-Glutamina / BCAA", valor: "5000mg", vd: "**" },
        { nome: "L-Leucina", valor: "2500mg", vd: "**" },
        { nome: "L-Isoleucina", valor: "1250mg", vd: "**" },
        { nome: "L-Valina", valor: "1250mg", vd: "**" }
      ]
    }
  };

  const infoNutricional = tabelaNutricional[produto.categoria] || tabelaNutricional.proteinas;

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8 lg:px-36 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Link Voltar */}
        <div className="mb-10">
          <Link href="/produtos" className="inline-flex items-center gap-3 text-gray-500 hover:text-yellow-500 uppercase tracking-widest font-black text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Arsenal
          </Link>
        </div>

        {/* Grade de Informações de Produto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Coluna Visual */}
          <div className="bg-[#0a0a0a] border border-gray-900 p-8 md:p-16 flex items-center justify-center relative overflow-hidden group">
            {produto.tag && (
              <span className="absolute top-6 left-6 z-20 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1">
                {produto.tag}
              </span>
            )}
            
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Image
              src={produto.imagem}
              alt={produto.nome}
              width={450}
              height={450}
              className="object-contain max-h-[400px] w-auto drop-shadow-[0_20px_50px_rgba(245,158,11,0.15)] transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Coluna Dados */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Categoria: {produto.categoria} • {produto.peso}
              </span>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-2 mb-4">
                {produto.nome}
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                {produto.descricao}
              </p>
            </div>

            {/* Preços */}
            <div className="border-t border-b border-gray-900 py-6 flex items-baseline gap-4">
              <span className="text-4xl font-black text-yellow-500">
                {formatPreco(produto.preco)}
              </span>
              {produto.precoOriginal && (
                <span className="text-lg text-gray-600 line-through">
                  {formatPreco(produto.precoOriginal)}
                </span>
              )}
            </div>

            {/* Seletores */}
            <div className="space-y-6">
              
              {/* Sabores */}
              {produto.sabores.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Selecione o Sabor
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {produto.sabores.map((sabor) => (
                      <button
                        key={sabor}
                        onClick={() => setSaborSelecionado(sabor)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                          saborSelecionado === sabor
                            ? "bg-yellow-500 text-black border-yellow-500"
                            : "bg-transparent text-white border-gray-800 hover:border-gray-600"
                        }`}
                      >
                        {sabor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantidade */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Quantidade
                </span>
                <div className="flex items-center border border-gray-800 bg-black w-32 justify-between">
                  <button
                    onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-gray-500 hover:text-yellow-500 font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-white">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade((q) => q + 1)}
                    className="px-4 py-2 text-gray-500 hover:text-yellow-500 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* CTA Compra */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-5 flex items-center justify-center gap-4 transition-all duration-300 border border-yellow-500"
              >
                <ShoppingCart className="w-5 h-5" />
                {addedMessage ? "Adicionado com Sucesso!" : "Adicionar à Sacola"}
              </button>
            </div>

            {/* Garantias */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-900 pt-8 text-center text-xs text-gray-500">
              <div className="space-y-2">
                <ShieldCheck className="w-6 h-6 text-yellow-500 mx-auto" />
                <p className="font-bold uppercase text-[9px] tracking-wider">100% Puro</p>
              </div>
              <div className="space-y-2">
                <Flame className="w-6 h-6 text-yellow-500 mx-auto" />
                <p className="font-bold uppercase text-[9px] tracking-wider">Altamente Potente</p>
              </div>
              <div className="space-y-2">
                <RefreshCw className="w-6 h-6 text-yellow-500 mx-auto" />
                <p className="font-bold uppercase text-[9px] tracking-wider">Origem Importada</p>
              </div>
            </div>

          </div>
        </div>

        {/* Abas Extras: Tabela Nutricional & Avaliações */}
        <div className="grid lg:grid-cols-2 gap-12 items-start border-t border-gray-900 pt-16">
          
          {/* Tabela Nutricional */}
          <div className="bg-[#050505] border border-gray-900 p-8">
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Tabela Nutricional</h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-6">
              Porção de referência: {infoNutricional.porcao}
            </span>

            <div className="border border-gray-900 divide-y divide-gray-900">
              <div className="grid grid-cols-3 p-3 text-[10px] font-black uppercase text-gray-500 bg-black">
                <span>Nutrientes</span>
                <span className="text-right">Quantidade por Dose</span>
                <span className="text-right">%VD*</span>
              </div>
              {infoNutricional.itens.map((item) => (
                <div key={item.nome} className="grid grid-cols-3 p-3 text-xs">
                  <span className="font-bold text-white">{item.nome}</span>
                  <span className="text-right text-gray-400 font-semibold">{item.valor}</span>
                  <span className="text-right text-yellow-500 font-bold">{item.vd}</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-600 mt-4 leading-relaxed">
              * % Valores Diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas. ** VD não estabelecido.
            </p>
          </div>

          {/* Avaliações dos Clientes */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Avaliações do Arsenal</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
                <span className="text-xs text-gray-400 font-bold ml-2">(4.9/5)</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviewsMock.map((rev) => (
                <div key={rev.nome} className="bg-[#0a0a0a] border border-gray-900 p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs uppercase tracking-wider text-white">{rev.nome}</span>
                    <span className="text-[10px] text-gray-600">{rev.data}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.nota }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {rev.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
