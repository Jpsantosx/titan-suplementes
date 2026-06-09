// src/app/contato/page.tsx
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 md:px-8 lg:px-36 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Typographic Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Contato <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Direto
            </span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-6"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light">
            Suporte ágil e sem enrolação. Dúvidas sobre produtos, pedidos ou parcerias? Fale com a gente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Informações de Contato */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Nossos Canais</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-[#111] border border-gray-800 p-4 group-hover:border-yellow-500 transition-colors">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg uppercase tracking-wide mb-1 text-white">E-mail</h3>
                    <p className="text-gray-400">joaopedrostadlerroza.senai@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="bg-[#111] border border-gray-800 p-4 group-hover:border-yellow-500 transition-colors">
                    <Phone className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg uppercase tracking-wide mb-1 text-white">WhatsApp</h3>
                    <p className="text-gray-400">(15) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="bg-[#111] border border-gray-800 p-4 group-hover:border-yellow-500 transition-colors">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg uppercase tracking-wide mb-1 text-white">Sede</h3>
                    <p className="text-gray-400">Rua da Academia, 123 - Centro<br/>São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-900 pt-10">
              <h3 className="font-bold uppercase tracking-widest text-sm text-yellow-500 mb-2">Horário de Batalha</h3>
              <p className="text-gray-400">Segunda a Sexta: 08:00 às 20:00<br/>Sábados: 09:00 às 14:00</p>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 md:p-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Envie uma Mensagem</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-[#111] border border-gray-800 focus:border-yellow-500 text-white p-4 outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[#111] border border-gray-800 focus:border-yellow-500 text-white p-4 outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">Assunto</label>
                <select 
                  id="subject" 
                  className="w-full bg-[#111] border border-gray-800 focus:border-yellow-500 text-white p-4 outline-none transition-colors appearance-none"
                >
                  <option>Dúvida sobre Produto</option>
                  <option>Status do Pedido</option>
                  <option>Parcerias / Revenda</option>
                  <option>Outros</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-[#111] border border-gray-800 focus:border-yellow-500 text-white p-4 outline-none transition-colors resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>

              <button 
                type="button"
                className="w-full group flex items-center justify-center gap-4 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 font-bold uppercase tracking-widest transition-all duration-300"
              >
                Disparar Mensagem
                <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}