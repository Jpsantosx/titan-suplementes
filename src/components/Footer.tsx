"use client";

import Link from "next/link";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Por favor, digite seu e-mail.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("E-mail inválido.");
      return;
    }
    
    // Simular envio
    setSubmitted(true);
    setEmail("");
    setError("");
  }

  return (
    <footer className="w-full bg-[#050505] border-t border-gray-950 px-4 md:px-8 lg:px-36 py-16 text-left text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl font-black text-white tracking-tighter leading-none">TITAN</span>
            <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase mt-1">Suplementos</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Fórmulas brutais, matérias-primas importadas e pureza absoluta. A fundação do seu progresso diário. Sem atalhos, apenas resultados reais.
          </p>
        </div>

        {/* Links Col */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-yellow-500 pl-3">
            Navegação
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Arsenal de Produtos", path: "/produtos" },
              { name: "Sobre a Titan", path: "/sobre" },
              { name: "Falar Conosco", path: "/contato" },
              { name: "Calculadora de Macros", path: "/calculadora" }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="hover:text-yellow-400 transition-colors uppercase tracking-wider text-xs font-bold">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorias Col */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-yellow-500 pl-3">
            Categorias
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Proteínas", slug: "proteinas" },
              { name: "Performance / Pré-Treinos", slug: "performance" },
              { name: "Recuperação / Aminoácidos", slug: "recuperacao" },
              { name: "Saúde & Bem-estar", slug: "saude" },
              { name: "Emagrecimento / Thermos", slug: "emagrecimento" }
            ].map((cat) => (
              <li key={cat.name}>
                <Link href={`/produtos?categoria=${cat.slug}`} className="hover:text-yellow-400 transition-colors uppercase tracking-wider text-xs font-semibold text-gray-500">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Col */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-yellow-500 pl-3">
            Receba Ofertas Exclusivas
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Assine nossa lista de transmissão para receber cupons brutais e lançamentos antecipados.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-3 text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              E-mail cadastrado com sucesso!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex border border-gray-900 focus-within:border-yellow-500 transition-colors bg-[#0a0a0a]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail hardcore..."
                  className="bg-transparent text-white px-4 py-3 outline-none text-xs flex-grow font-bold placeholder:text-gray-700"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 flex items-center justify-center transition-colors"
                  aria-label="Cadastrar"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>}
            </form>
          )}
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-gray-950 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:items-start gap-1">
          <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} Titan Suplementos. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-gray-700 leading-none">
            CNPJ: 00.000.000/0001-00 | Endereço fictício para fins de desenvolvimento.
          </p>
        </div>

        {/* Métodos de Pagamento Simbolizados */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {["PIX", "BOLETO", "VISA", "MASTERCARD", "ELO"].map((pay) => (
            <span
              key={pay}
              className="text-[9px] font-black uppercase tracking-wider border border-gray-900 px-2.5 py-1.5 bg-[#0a0a0a] text-gray-500"
            >
              {pay}
            </span>
          ))}
        </div>

        {/* Políticas de Uso */}
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
            Privacidade
          </a>
          <span className="text-gray-900">/</span>
          <a href="#" className="text-gray-600 hover:text-yellow-500 transition-colors">
            Termos
          </a>
        </div>
      </div>
    </footer>
  );
}