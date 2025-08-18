interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center text-xl font-bold text-purple-400 mb-4 mx-auto">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
