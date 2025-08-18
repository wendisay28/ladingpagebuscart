import { Benefit } from '../types';

interface BenefitsProps {
  benefits: Benefit[];
}

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">Beneficios</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-400">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
