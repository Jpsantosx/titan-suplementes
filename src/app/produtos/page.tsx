// src/app/produtos/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ArrowRight, ShoppingCart, Filter, X, Package, Star, Flame } from "lucide-react";
import catalogo from "@/data/produtos.json";
import { useCart } from "@/context/CartContext";


type Produto = (typeof catalogo.produtos)[number];

function formatPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    "Mais Vendido": "bg-yellow-500 text-black",
    "Essencial": "bg-white text-black",
    "Lançamento": "bg-emerald-500 text-black",
    "Promoção": "bg-red-500 text-white",
    "Queima Total": "bg-orange-500 text-black",
    "Para Ganho": "bg-blue-500 text-white",
    "Avançado": "bg-gray-600 text-white",
    "Melhor Oferta": "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black",
  };

  return (
    <span
      className={`inline-block text-[10px] font-black uppercase tracking-wider px-3 py-1 ${
        colors[tag] || "bg-yellow-500 text-black"
      }`}
    >
      {tag}
    </span>
  );
}

export default function ProdutosPage() {
  const { addToCart } = useCart();
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("todos");
  const [busca, setBusca] = useState<string>("");

  const handleAdd = (e: React.MouseEvent, prod: Produto) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: prod.id,
      nome: prod.nome,
      preco: prod.preco,
      imagem: prod.imagem,
      peso: prod.peso,
      sabor: prod.sabores.length > 0 ? prod.sabores[0] : "Sem sabor"
    });
  };


  const produtosFiltrados = useMemo(() => {
    let lista = catalogo.produtos;

    if (categoriaAtiva !== "todos") {
      lista = lista.filter((p) => p.categoria === categoriaAtiva);
    }

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
      );
    }

    return lista;
  }, [categoriaAtiva, busca]);

  const destaques = catalogo.produtos.filter((p) => p.destaque);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-yellow-500 selection:text-black">
      
      {/* Hero Header */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 lg:px-36 border-b border-gray-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-yellow-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
              Catálogo Completo
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Nossos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">
              Produtos
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light border-l-4 border-yellow-500/30 pl-6">
              {catalogo.produtos.length} produtos de altíssima qualidade.
              Matéria-prima importada. Resultados garantidos.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" /> {catalogo.categorias.length} categorias
              </span>
              <span className="w-px h-4 bg-gray-800" />
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" /> {destaques.length} destaques
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques Horizontal Scroll */}
      <section className="py-16 border-b border-gray-900 overflow-hidden">
        <div className="px-4 md:px-8 lg:px-36 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Flame className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Destaques
            </h2>
            <div className="flex-1 h-px bg-gray-900 ml-4" />
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto px-4 md:px-8 lg:px-36 pb-4 scrollbar-hide snap-x snap-mandatory">
          {destaques.map((prod) => (
            <Link
              key={prod.id}
              href={`/produtos/${prod.slug}`}
              className="group flex-shrink-0 w-[280px] md:w-[320px] bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 snap-start block"
            >
              <div className="relative aspect-square p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={prod.imagem}
                  alt={prod.nome}
                  width={250}
                  height={250}
                  className="object-contain w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
                />
                {prod.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <TagBadge tag={prod.tag} />
                  </div>
                )}
              </div>
              <div className="p-5 border-t border-gray-800">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-2 group-hover:text-yellow-400 transition-colors">
                  {prod.nome}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-yellow-400 font-black text-xl">
                      {formatPreco(prod.preco)}
                    </span>
                    {prod.precoOriginal && (
                      <span className="text-gray-600 text-xs line-through">
                        {formatPreco(prod.precoOriginal)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {prod.peso}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filtros + Busca */}
      <section className="sticky top-20 z-40 bg-black/95 backdrop-blur-xl border-b border-gray-900 py-5 px-4 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <button
                onClick={() => setCategoriaAtiva("todos")}
                className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  categoriaAtiva === "todos"
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white"
                }`}
              >
                Todos ({catalogo.produtos.length})
              </button>
              {catalogo.categorias.map((cat) => {
                const count = catalogo.produtos.filter(
                  (p) => p.categoria === cat.id
                ).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                      categoriaAtiva === cat.id
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white"
                    }`}
                  >
                    {cat.nome} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full bg-[#111] border border-gray-800 focus:border-yellow-500 text-white text-sm px-4 py-2.5 pr-10 outline-none transition-colors placeholder:text-gray-600"
              />
              {busca && (
                <button
                  onClick={() => setBusca("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Title */}
      {categoriaAtiva !== "todos" && (
        <section className="pt-12 px-4 md:px-8 lg:px-36">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              {catalogo.categorias.find((c) => c.id === categoriaAtiva)?.nome}
            </h2>
            <p className="text-gray-500 mt-2">
              {catalogo.categorias.find((c) => c.id === categoriaAtiva)?.descricao}
            </p>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto">
          {produtosFiltrados.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-gray-500 text-lg mb-4">
                Nenhum produto encontrado.
              </p>
              <button
                onClick={() => {
                  setCategoriaAtiva("todos");
                  setBusca("");
                }}
                className="text-yellow-500 underline underline-offset-4 text-sm font-bold uppercase tracking-wider hover:text-yellow-400"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosFiltrados.map((produto) => (
                <Link
                  key={produto.id}
                  href={`/produtos/${produto.slug}`}
                  className="group relative bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 flex flex-col block"
                >
                  {/* Discount Badge */}
                  {produto.precoOriginal && (
                    <div className="absolute top-4 right-4 z-20 bg-red-500 text-white text-[10px] font-black px-2 py-1">
                      -{Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square bg-[#111] overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      width={280}
                      height={280}
                      className="object-contain w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
                    />
                    {produto.tag && (
                      <div className="absolute top-4 left-4 z-10">
                        <TagBadge tag={produto.tag} />
                      </div>
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                      <button
                        onClick={(e) => handleAdd(e, produto)}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 transition-colors border border-yellow-500"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow border-t border-gray-800">
                    {/* Category Label */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-2">
                      {catalogo.categorias.find((c) => c.id === produto.categoria)?.nome} • {produto.peso}
                    </span>

                    <h3 className="text-base font-bold tracking-tight mb-2 group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                      {produto.nome}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                      {produto.descricao}
                    </p>

                    {/* Sabores */}
                    {produto.sabores.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {produto.sabores.slice(0, 3).map((sabor) => (
                          <span
                            key={sabor}
                            className="text-[10px] text-gray-500 border border-gray-800 px-2 py-0.5"
                          >
                            {sabor}
                          </span>
                        ))}
                        {produto.sabores.length > 3 && (
                          <span className="text-[10px] text-gray-600 px-1">
                            +{produto.sabores.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-800/50">
                      <div>
                        {produto.precoOriginal && (
                          <span className="block text-gray-600 text-xs line-through mb-0.5">
                            {formatPreco(produto.precoOriginal)}
                          </span>
                        )}
                        <span className="text-yellow-400 font-black text-xl">
                          {formatPreco(produto.preco)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleAdd(e, produto)}
                        className="w-10 h-10 bg-white/5 border border-gray-800 text-gray-400 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 z-20"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-gray-900 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-36 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { valor: "20+", label: "Produtos" },
              { valor: "6", label: "Categorias" },
              { valor: "100%", label: "Importados" },
              { valor: "5★", label: "Avaliação" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-3xl md:text-5xl font-black text-yellow-500 mb-2">
                  {stat.valor}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-900 py-20 px-4 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-400 text-lg">
              Fale com nossos especialistas para indicações personalizadas.
            </p>
          </div>
          <Link
            href="/contato"
            className="group flex items-center gap-4 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 font-bold uppercase tracking-widest transition-all duration-300 flex-shrink-0"
          >
            Falar com Especialista
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}