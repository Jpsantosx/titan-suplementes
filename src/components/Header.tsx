import Link from "next/link";
import Image from "next/image";


export default function Header() {
  return (
    <header className="w-full h-16 bg-gradient-to-r from-black to-gray-900 border-b border-yellow-500/30 shadow-lg px-4 md:px-8 lg:px-36 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      {/* Logo e nome */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <Image
          src="/logo/logo.png"
          alt="Logo da empresa"
          width={50}
          height={50}
          className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <h1 className="text-xl font-bold text-white">TITAN</h1>
        <span className="text-lg font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            SUPLEMENTOS
        </span>
      </div>

      {/* Navegação */}
      <nav className="flex space-x-6">
        <Link
          href="/"
          className="relative text-sm font-medium text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full hover:text-yellow-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/produtos"
          className="relative text-sm font-medium text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full hover:text-yellow-400 transition-colors"
        >
          Produtos
        </Link>
        <Link
          href="/contato"
          className="relative text-sm font-medium text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full hover:text-yellow-400 transition-colors"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}