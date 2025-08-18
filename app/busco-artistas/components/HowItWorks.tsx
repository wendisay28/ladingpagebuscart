import { HowItWorksStep } from '../types';

interface HowItWorksProps {
  steps: HowItWorksStep[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-pink-500/30 to-transparent"></div>
        
        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              <div className="lg:w-1/2 lg:px-8 mb-6 lg:mb-0">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-white/5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:px-8 flex justify-center">
                <div className="bg-gray-800/30 rounded-xl p-4 border border-white/5 w-full max-w-md">
                  <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-500">
                    {step.icon && (
                      <step.icon className="w-12 h-12 text-purple-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
