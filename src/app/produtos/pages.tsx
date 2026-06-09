// src/app/produtos/page.tsx
import Link from "next/link";

export default function ProdutosPage() {
  const produtos = [
    { nome: "Whey Protein", preco: "R$ 129,90", descricao: "24g de proteína por dose" },
    { nome: "Creatina", preco: "R$ 89,90", descricao: "300g – pura e micronizada" },
    { nome: "Pré-Treino", preco: "R$ 149,90", descricao: "Foco e energia sem crash" },
    { nome: "BCAA", preco: "R$ 79,90", descricao: "Recuperação muscular" },
  ];

  return (
    <div className="bg-black text-white py-12 px-4 md:px-8 lg:px-36">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Nossos <span className="text-yellow-400">Produtos</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Suplementos de qualidade para você atingir seus objetivos.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((produto, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-yellow-500/50 transition"
            >
              <div className="text-4xl mb-3"></div>
              <h2 className="text-xl font-bold mb-2">{produto.nome}</h2>
              <p className="text-gray-400 text-sm mb-3">{produto.descricao}</p>
              <p className="text-yellow-400 font-bold text-lg">{produto.preco}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contato"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition"
          >
            Tire suas dúvidas
          </Link>
        </div>
      </div>
    </div>
  );
}