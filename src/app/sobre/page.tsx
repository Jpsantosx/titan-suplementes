// src/app/sobre/page.tsx
import Link from "next/link";
import { ShieldAlert, Trophy, Zap } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 md:px-8 lg:px-36 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Typographic Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Nossa <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Essência
            </span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-6"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light">
            Não somos apenas mais uma loja de suplementos. Somos a fundação do seu próximo nível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              A TITAN NASCEU DA <span className="text-yellow-500">EXIGÊNCIA</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Cansamos de fórmulas fracas, subdosadas e embalagens bonitas que escondiam produtos inúteis. 
              A <strong className="text-white">Titan Suplementos</strong> foi criada para entregar performance brutal, 
              ingredientes premium e transparência total.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Nosso objetivo não é te vender uma promessa, é te fornecer a ferramenta. 
              Quem treina pesado sabe que o resultado vem do esforço, mas exige o combustível correto.
            </p>
          </div>
          
          <div className="bg-[#111] border border-gray-800 p-10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-2xl md:text-4xl font-black uppercase text-center leading-tight tracking-tighter relative z-10">
              &ldquo;Qualidade não é<br/> promessa, é<br/> <span className="text-yellow-500">entrega</span>. E é por isso<br/> que a Titan existe.&rdquo;
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 hover:border-yellow-500 transition-colors duration-300">
            <ShieldAlert className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Puro & Testado</h3>
            <p className="text-gray-400">Cada lote é rigorosamente testado. Sem misturas, sem enchimentos. Apenas a substância pura.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 hover:border-yellow-500 transition-colors duration-300">
            <Trophy className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Alta Performance</h3>
            <p className="text-gray-400">Fórmulas desenvolvidas especificamente para quebrar platôs e maximizar hipertrofia e força.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 hover:border-yellow-500 transition-colors duration-300">
            <Zap className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Entrega Brutal</h3>
            <p className="text-gray-400">Logística agressiva para que seu suplemento chegue rápido. O treino não pode esperar.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-900 pt-20 mb-20">
          <div className="mb-12">
            <span className="text-xs font-bold text-yellow-500 uppercase tracking-[0.3em] block mb-2">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Perguntas <span className="text-yellow-500">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {[
              {
                q: "Os produtos são realmente testados em laboratório?",
                a: "Sim. Todos os lotes de matérias-primas importadas da Titan passam por rigorosos testes físico-químicos e microbiológicos. Garantimos pureza absoluta e dosagens clínicas reais em cada dose."
              },
              {
                q: "Como funciona o fechamento do pedido e entrega?",
                a: "Após montar seu carrinho, você clica em 'Disparar no WhatsApp'. Nosso sistema gerará uma mensagem com o resumo exato da sua compra. Nosso especialista confirmará os detalhes de endereço e forma de pagamento para despachar o produto imediatamente."
              },
              {
                q: "Posso alterar o sabor ou quantidade no WhatsApp?",
                a: "Com certeza. O atendimento é humanizado exatamente para te dar flexibilidade. Você pode adicionar itens, alterar sabores e solicitar recomendações diretamente para o atendente."
              },
              {
                q: "Quais são os prazos de despacho?",
                a: "Despachamos em tempo recorde. Pedidos confirmados até as 13:00 são coletados e enviados no mesmo dia útil. Você receberá o código de rastreamento no mesmo instante."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-900 bg-[#050505] p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:border-yellow-500"
              >
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <h3 className="font-bold uppercase tracking-wider text-sm text-white group-hover:text-yellow-500 transition-colors">
                    {faq.q}
                  </h3>
                  <span className="ml-1.5 flex-shrink-0 rounded-none bg-black border border-gray-800 p-1.5 text-gray-400 group-open:text-yellow-500 group-open:border-yellow-500 transition-colors">
                    <svg
                      className="h-5 w-5 transform transition-transform duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-950 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center border-t border-gray-900 pt-20 pb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
            Pronto para <span className="text-yellow-500">evoluir?</span>
          </h2>
          <Link
            href="/produtos"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest px-10 py-5 transition-all duration-300"
          >
            Ver Arsenal de Suplementos
          </Link>
        </div>
      </div>
    </div>
  );
}