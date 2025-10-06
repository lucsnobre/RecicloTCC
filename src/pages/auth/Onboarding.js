import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  MapPinIcon,
  BellIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    location: '',
    interests: [],
    notifications: {
      collectReminders: true,
      challenges: true,
      community: false,
      promotions: true
    },
    goals: ''
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Bem-vindo ao RECICLO! 🌍',
      description: 'Vamos personalizar sua experiência',
      content: WelcomeStep
    },
    {
      id: 'location',
      title: 'Sua Localização 📍',
      description: 'Encontre pontos de coleta próximos',
      content: LocationStep
    },
    {
      id: 'interests',
      title: 'Seus Interesses ♻️',
      description: 'O que mais te motiva?',
      content: InterestsStep
    },
    {
      id: 'notifications',
      title: 'Notificações 🔔',
      description: 'Mantenha-se informado',
      content: NotificationsStep
    },
    {
      id: 'complete',
      title: 'Tudo Pronto! 🎉',
      description: 'Comece sua jornada sustentável',
      content: CompleteStep
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    await updateProfile({ preferences, onboarded: true });
    toast.success('Perfil configurado com sucesso!');
    navigate('/dashboard');
  };

  const CurrentStepComponent = steps[currentStep].content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Etapa {currentStep + 1} de {steps.length}
                </span>
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <button
                    onClick={handleSkip}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Pular
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>

              <CurrentStepComponent 
                preferences={preferences}
                setPreferences={setPreferences}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    className="btn-ghost flex items-center"
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-2" />
                    Voltar
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className={`btn-primary flex items-center ${currentStep === 0 ? 'ml-auto' : ''}`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Começar
                      <CheckIcon className="h-5 w-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Step Components
function WelcomeStep({ preferences, setPreferences }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-6"
        >
          <span className="text-8xl">♻️</span>
        </motion.div>
        <p className="text-lg text-gray-700">
          Parabéns por dar o primeiro passo para um futuro mais sustentável!
        </p>
        <p className="text-gray-600 mt-2">
          Vamos configurar algumas coisas para melhorar sua experiência.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { emoji: '🌱', label: 'Iniciante Eco' },
          { emoji: '🌍', label: 'Protetor do Planeta' },
          { emoji: '♻️', label: 'Reciclador Expert' },
          { emoji: '🌟', label: 'Eco Influencer' }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-4 border-2 border-gray-200 rounded-xl text-center cursor-pointer hover:border-primary-500 transition-colors"
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LocationStep({ preferences, setPreferences }) {
  const cities = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Porto Alegre, RS',
    'Curitiba, PR',
    'Salvador, BA',
    'Brasília, DF',
    'Fortaleza, CE'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <MapPinIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Digite sua cidade ou escolha abaixo
        </label>
        <input
          type="text"
          value={preferences.location}
          onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
          className="input mb-4"
          placeholder="Ex: São Paulo, SP"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setPreferences({ ...preferences, location: city })}
            className={`p-3 rounded-lg border-2 transition-all ${
              preferences.location === city
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Sua localização nos ajuda a encontrar pontos de coleta e eventos próximos a você.
        </p>
      </div>
    </div>
  );
}

function InterestsStep({ preferences, setPreferences }) {
  const interests = [
    { id: 'recycling', icon: '♻️', label: 'Reciclagem', desc: 'Transformar resíduos em recursos' },
    { id: 'fashion', icon: '👕', label: 'Moda Sustentável', desc: 'Roupas eco-friendly' },
    { id: 'education', icon: '📚', label: 'Educação Ambiental', desc: 'Aprender e compartilhar' },
    { id: 'community', icon: '🤝', label: 'Comunidade', desc: 'Conectar com outros eco-guerreiros' },
    { id: 'challenges', icon: '🏆', label: 'Desafios', desc: 'Competir e ganhar prêmios' },
    { id: 'impact', icon: '📊', label: 'Impacto', desc: 'Ver minha contribuição' }
  ];

  const toggleInterest = (id) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest) => (
          <motion.button
            key={interest.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleInterest(interest.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              preferences.interests.includes(interest.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start">
              <span className="text-2xl mr-3">{interest.icon}</span>
              <div>
                <p className="font-medium text-gray-900">{interest.label}</p>
                <p className="text-xs text-gray-600 mt-1">{interest.desc}</p>
              </div>
            </div>
            {preferences.interests.includes(interest.id) && (
              <CheckIcon className="h-5 w-5 text-primary-500 float-right mt-2" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function NotificationsStep({ preferences, setPreferences }) {
  const notificationTypes = [
    {
      id: 'collectReminders',
      icon: <BellIcon className="h-6 w-6" />,
      title: 'Lembretes de Coleta',
      description: 'Notificações sobre dias de coleta na sua região'
    },
    {
      id: 'challenges',
      icon: <SparklesIcon className="h-6 w-6" />,
      title: 'Desafios e Metas',
      description: 'Atualizações sobre seus desafios ativos'
    },
    {
      id: 'community',
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: 'Atividade da Comunidade',
      description: 'Novidades dos seus amigos eco'
    },
    {
      id: 'promotions',
      icon: <SparklesIcon className="h-6 w-6" />,
      title: 'Ofertas e Promoções',
      description: 'Produtos sustentáveis com desconto'
    }
  ];

  const toggleNotification = (id) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [id]: !prev.notifications[id]
      }
    }));
  };

  return (
    <div className="space-y-4">
      {notificationTypes.map((type) => (
        <div
          key={type.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-start">
            <div className="text-primary-500 mr-3">{type.icon}</div>
            <div>
              <p className="font-medium text-gray-900">{type.title}</p>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.notifications[type.id]}
              onChange={() => toggleNotification(type.id)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      ))}
    </div>
  );
}

function CompleteStep({ preferences, setPreferences }) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="h-12 w-12 text-green-600" />
        </div>
      </motion.div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Configuração Concluída!
        </h3>
        <p className="text-gray-600">
          Você está pronto para começar sua jornada sustentável.
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-3">
          🎁 Bônus de Boas-Vindas
        </h4>
        <div className="space-y-2 text-left">
          <p className="flex items-center text-sm">
            <span className="text-xl mr-2">🌟</span>
            <span>100 pontos iniciais</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="text-xl mr-2">🎯</span>
            <span>Primeiro desafio desbloqueado</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="text-xl mr-2">🎁</span>
            <span>Cupom de 10% na primeira compra</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
