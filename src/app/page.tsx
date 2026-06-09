// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-yellow-400">Titan Suplementos</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          O melhor em suplementos para você.
        </p>
        <p className="text-gray-400 mb-8">
          Qualidade, respeito e resultado. Chegou a hora de evoluir com quem entende do assunto.
        </p>
        <Link
          href="/produtos"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition"
        >
          Ver produtos
        </Link>
      </div>
    </div>
  );
}