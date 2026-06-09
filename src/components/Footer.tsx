export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-slate-200/20 px-4 md:px-8 lg:px-36 py-6 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Titan Suplementos. 
        <span className="hidden md:inline"> Todos os direitos reservados.</span>
      </p>
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
          Política de Privacidade
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
          Termos de Uso
        </a>
      </div>
    </footer>
  );
}