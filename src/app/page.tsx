// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import BannerCarrossel from "@/components/Carrossel";
import { ArrowRight } from "lucide-react";
import catalogo from "@/data/produtos.json";

function formatPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function HomePage() {
  const produtosDestaque = catalogo.produtos.filter((p) => p.destaque);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-yellow-500 selection:text-black">
      
      {/* Massive Typographic Hero */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden px-4 md:px-8 lg:px-36 border-b border-gray-900">
        <div className="absolute inset-0 bg-[url('/banners/banner1.jpg')] bg-cover bg-center opacity-20 grayscale mix-blend-luminosity"></div>
        
        <div className="relative z-10 w-full">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              <span className="block text-white">Força</span>
              <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: '2px #F59E0B' }}>Absoluta</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-12 gap-8">
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-xl border-l-4 border-yellow-500 pl-6">
              Chegou a hora de evoluir com quem entende do assunto. Matéria prima premium, resultados reais.
            </p>
            
            <Link
              href="/produtos"
              className="group bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg uppercase tracking-widest px-10 py-5 transition-all duration-300 flex items-center justify-center gap-4 w-full md:w-auto"
            >
              Comprar Agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-32 px-4 md:px-8 lg:px-36 bg-[#050505]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Os <span className="text-yellow-500">Mais Vendidos</span>
          </h2>
          <Link href="/produtos" className="text-gray-400 hover:text-yellow-500 uppercase tracking-widest font-bold text-sm underline decoration-gray-800 underline-offset-8 mt-4 md:mt-0 transition-colors">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {produtosDestaque.slice(0, 3).map((prod) => (
            <Link key={prod.id} href={`/produtos/${prod.slug}`} className="group block relative bg-[#111] border border-gray-900 hover:border-yellow-500 transition-colors duration-500 overflow-hidden">
              <div className="aspect-square relative p-10 flex items-center justify-center">
                <Image 
                  src={prod.imagem} 
                  alt={prod.nome} 
                  width={300} 
                  height={300} 
                  className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out z-10 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {prod.tag && (
                  <span className="absolute top-4 left-4 z-20 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1">
                    {prod.tag}
                  </span>
                )}
              </div>
              <div className="p-6 border-t border-gray-900 group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-500">
                <h3 className="text-2xl font-black uppercase tracking-wide flex justify-between items-center">
                  {prod.nome}
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold">{formatPreco(prod.preco)}</span>
                  {prod.precoOriginal && (
                    <span className="text-sm line-through opacity-50">
                      {formatPreco(prod.precoOriginal)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Second row with more products */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {produtosDestaque.slice(3, 5).map((prod) => (
            <Link key={prod.id} href={`/produtos/${prod.slug}`} className="group relative bg-[#111] border border-gray-900 hover:border-yellow-500 transition-colors duration-500 overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative p-8 flex items-center justify-center bg-[#0a0a0a]">
                <Image 
                  src={prod.imagem} 
                  alt={prod.nome} 
                  width={250} 
                  height={250} 
                  className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
                />
                {prod.tag && (
                  <span className="absolute top-4 left-4 z-20 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1">
                    {prod.tag}
                  </span>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center w-full md:w-3/5 border-t md:border-t-0 md:border-l border-gray-900">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-yellow-400 transition-colors">
                  {prod.nome}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{prod.descricao}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-yellow-400 font-black text-2xl">{formatPreco(prod.preco)}</span>
                  {prod.precoOriginal && (
                    <span className="text-gray-600 text-sm line-through">
                      {formatPreco(prod.precoOriginal)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Como Funciona */}
      <section className="py-24 px-4 md:px-8 lg:px-36 border-t border-b border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">Fluxo de Batalha</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Como <span className="text-yellow-500">Funciona</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Escolha o Arsenal", desc: "Navegue pelo nosso catálogo e filtre pelas suas necessidades de ganho de massa, queima ou recuperação." },
              { step: "02", title: "Calcule Seus Macros", desc: "Use nossa calculadora inteligente para descobrir exatamente o que seu corpo precisa para bater suas metas." },
              { step: "03", title: "Confirme via Whats", desc: "Envie seu carrinho diretamente para o nosso suporte com um único clique. Rápido, direto e prático." },
              { step: "04", title: "Treino Brutal", desc: "Receba seus suplementos premium no menor tempo possível e parta para a quebra de recordes pessoais." }
            ].map((item) => (
              <div key={item.step} className="bg-[#0a0a0a] border border-gray-900 p-8 hover:border-yellow-500 transition-colors duration-300 relative group">
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-800/40 group-hover:text-yellow-500/20 transition-colors">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-3 mt-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Calculadora */}
      <section className="py-20 px-4 md:px-8 lg:px-36 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto border-2 border-yellow-500 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 inline-block">
              Otimize sua Dieta
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Não treine às cegas.<br/> Descubra seus <span className="text-yellow-500">Macros exatos.</span>
            </h2>
            <p className="text-gray-400 text-base font-light">
              Fórmula desenvolvida por nutricionistas esportivos para alinhar seu peso e frequência de treino aos melhores suplementos.
            </p>
          </div>
          <Link
            href="/calculadora"
            className="group flex items-center justify-center gap-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest px-10 py-5 transition-all duration-300 w-full lg:w-auto text-center"
          >
            Acessar Calculadora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 px-4 md:px-8 lg:px-36 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 block mb-2">Resultados Comprovados</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                Quem Usa, <span className="text-yellow-500">Confirma</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-left md:text-right mt-4 md:mt-0 font-bold uppercase tracking-wider">
              Centenas de atletas quebrando recordes diariamente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { nome: "Carlos 'Titan' Silva", func: "Fisiculturista Amador", text: "Minha recuperação muscular mudou 100% depois que inseri o Titan Whey isolado na minha rotina pós-treino. Fórmulas limpas e honestas.", nota: 5 },
              { nome: "Juliana Mendes", func: "Atleta de CrossFit", text: "A Creatina da Titan é super solúvel e me deu um ganho de explosão absurdo. Entrega super rápida também, sou cliente fiel.", nota: 5 },
              { nome: "Lucas Albuquerque", func: "Personal Trainer", text: "Recomendo a Titan para todos os meus alunos. É raro encontrar marcas que não subdosem a matéria-prima hoje em dia.", nota: 5 }
            ].map((dep) => (
              <div key={dep.nome} className="bg-[#0a0a0a] border border-gray-900 p-8 space-y-4 hover:border-yellow-500/50 transition-colors">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-400 italic text-sm leading-relaxed">
                  &ldquo;{dep.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-gray-900 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-white">{dep.nome}</h4>
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">{dep.func}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner Extra */}
      <section className="py-20 border-t border-gray-900">
        <BannerCarrossel />
      </section>

    </div>
  );
}