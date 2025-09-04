import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';

type SubscriptionFormProps = {
  buttonText?: string;
  placeholder?: string;
  source?: string;
  className?: string;
  onSuccess?: () => void;
};

export function SubscriptionForm({
  buttonText = 'Suscribirse',
  placeholder = 'Tu correo electrónico',
  source = 'unknown',
  className = '',
  onSuccess,
}: SubscriptionFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showNameField, setShowNameField] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ text: 'Por favor ingresa tu correo electrónico', type: 'error' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: 'Por favor ingresa un correo electrónico válido', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la suscripción');
      }

      setMessage({
        text: '¡Gracias por suscribirte! Pronto te contactaremos.',
        type: 'success',
      });
      
      // Limpiar el formulario
      setEmail('');
      setName('');
      setShowNameField(false);
      
      // Llamar al callback de éxito si existe
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error al suscribirse:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Ocurrió un error al suscribirse',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {showNameField && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre (opcional)"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
              disabled={isSubmitting}
            />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[150px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : message?.type === 'success' ? (
              <>
                <Check className="w-5 h-5" />
                ¡Listo!
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
        
        {!showNameField && (
          <button
            type="button"
            onClick={() => setShowNameField(true)}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ¿Quieres dejarnos tu nombre? (opcional)
          </button>
        )}
      </form>
      
      {message && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-900/30 border border-green-500/50 text-green-200' 
            : 'bg-red-900/30 border border-red-500/50 text-red-200'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
