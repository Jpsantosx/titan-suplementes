"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Header() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Impedir scroll quando menu ou carrinho estiver aberto
  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isMenuOpen]);

  function formatPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleFinalizarPedido() {
    if (cart.length === 0) return;

    const telefone = "5515999999999"; // WhatsApp de contato (15) 99999-9999
    let mensagem = "*NOVO PEDIDO - TITAN SUPLEMENTOS*\n\n";
    mensagem += "Gostaria de solicitar os seguintes itens:\n\n";

    cart.forEach((item) => {
      mensagem += `• *${item.quantidade}x ${item.nome}* (${item.peso}) - Sabor: _${item.sabor}_\n`;
      mensagem += `  Valor un: ${formatPreco(item.preco)} | Subtotal: ${formatPreco(item.preco * item.quantidade)}\n\n`;
    });

    mensagem += `*Valor Total do Pedido:* ${formatPreco(totalPrice)}\n\n`;
    mensagem += "_Enviado via Vitrine Titan Suplementos_";

    const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <header className="w-full h-20 bg-black border-b border-yellow-500 px-4 md:px-8 lg:px-36 flex items-center justify-between sticky top-0 z-50">
        {/* Logo e nome */}
        <Link href="/" className="flex items-center gap-4 group">
          <Image
            src="/logo/logo.png"
            alt="Logo da empresa"
            width={50}
            height={50}
            className="h-10 w-auto object-contain transition-transform duration-500 group-hover:rotate-12"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter leading-none">TITAN</span>
            <span className="text-xs font-bold text-yellow-500 tracking-widest leading-none mt-1 uppercase">Suplementos</span>
          </div>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Sobre", path: "/sobre" },
            { name: "Produtos", path: "/produtos" },
            { name: "Contato", path: "/contato" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-yellow-400 transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTAs Header */}
        <div className="flex items-center gap-4">
          {/* Calculadora (Desktop Only) */}
          <Link
            href="/calculadora"
            className="hidden lg:block text-xs font-black uppercase tracking-wider border border-yellow-500 px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Calculadora de Macros
          </Link>

          {/* Sacola de compras */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#111] border border-gray-800 hover:border-yellow-500 p-3 transition-colors text-white"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburguer Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-[#111] border border-gray-800 p-3 text-white hover:border-yellow-500"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-md flex flex-col md:hidden animate-fade-in">
          <nav className="flex flex-col items-center justify-center flex-grow space-y-8 p-8 border-t border-gray-950">
            {[
              { name: "Home", path: "/" },
              { name: "Sobre", path: "/sobre" },
              { name: "Produtos", path: "/produtos" },
              { name: "Contato", path: "/contato" },
              { name: "Calculadora de Macros", path: "/calculadora" }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-widest text-white hover:text-yellow-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* DRAWER DO CARRINHO */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-[#050505] border-l-2 border-yellow-500 flex flex-col transition-transform duration-500 ease-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header Drawer */}
          <div className="p-6 border-b border-gray-900 flex justify-between items-center bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-black uppercase tracking-tight">Sua Sacola ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-yellow-500 p-2 border border-transparent hover:border-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Itens Lista */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-gray-500 text-lg uppercase tracking-wide">Seu carrinho está vazio</p>
                <Link
                  href="/produtos"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-yellow-500 text-black font-bold uppercase px-6 py-3 hover:bg-yellow-400 text-xs tracking-widest transition-colors"
                >
                  Abastecer Arsenal
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.sabor}`}
                  className="flex gap-4 p-4 bg-[#111] border border-gray-900 hover:border-yellow-500/30 transition-all duration-300 relative group"
                >
                  <div className="w-20 h-20 bg-[#0a0a0a] border border-gray-900 p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-white leading-tight">
                        {item.nome}
                      </h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                        Sabor: <span className="text-yellow-500">{item.sabor}</span> • {item.peso}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-800 bg-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.sabor, item.quantidade - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-yellow-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white">{item.quantidade}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.sabor, item.quantidade + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-yellow-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-yellow-400 text-sm">
                        {formatPreco(item.preco * item.quantidade)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.sabor)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
                    aria-label="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Drawer */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0a0a0a] border-t border-gray-900 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Valor Total:</span>
                <span className="text-3xl font-black text-yellow-400">{formatPreco(totalPrice)}</span>
              </div>
              
              <button
                onClick={handleFinalizarPedido}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 flex items-center justify-center gap-3 transition-colors"
              >
                Disparar no WhatsApp
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-transparent hover:bg-white/5 border border-gray-800 text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest py-3 transition-all"
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}