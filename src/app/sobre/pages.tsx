// src/app/sobre/page.tsx
export default function SobrePage() {
  return (
    <div className="bg-black text-white py-12 px-4 md:px-8 lg:px-36">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Sobre a <span className="text-yellow-400">Titan</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Quem somos, o que acreditamos e por que fazemos sentido.
        </p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            A <strong className="text-yellow-400">Titan Suplementos</strong> nasceu da vontade de oferecer suplementos de verdade, sem firula e com preço justo. 
            Somos uma loja online que trata cliente como gente – e não como número.
          </p>
          <p>
            Nossa missão é simples: ajudar você a alcançar seus resultados com produtos testados, atendimento honesto e entrega rápida.
          </p>
          <p>
            Cada pessoa que treina tem um objetivo diferente. Por isso, gostamos de conversar, entender e indicar o que realmente funciona.
          </p>
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-md">
            <p className="italic text-yellow-300">
              “Qualidade não é promessa, é entrega. E é por isso que a Titan existe.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}