// src/app/contato/page.tsx
export default function ContatoPage() {
  return (
    <div className="bg-black text-white py-12 px-4 md:px-8 lg:px-36">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Fale com a <span className="text-yellow-400">gente</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Respondemos rápido e estamos prontos para ajudar você a escolher os melhores
           suplementos para seus objetivos. Entre em contato conosco!
        </p>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-gray-400">joaopedrostadlerroza.senai@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-gray-400">(15) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-gray-400">Rua da Academia, 123 - São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              Horário de atendimento: seg-sex das 9h às 18h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}