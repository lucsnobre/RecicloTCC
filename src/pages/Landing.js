import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: 'Scanner Inteligente',
      description: 'Identifique materiais recicláveis com nossa IA avançada'
    },
    {
      icon: <TrophyIcon className="h-8 w-8" />,
      title: 'Gamificação',
      description: 'Ganhe pontos, suba de nível e desbloqueie recompensas'
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: 'Mapa Interativo',
      description: 'Encontre pontos de coleta próximos a você'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Comunidade Verde',
      description: 'Conecte-se com outros eco-guerreiros'
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: 'Impacto Real',
      description: 'Acompanhe sua contribuição para o planeta'
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Certificado Verde',
      description: 'Receba certificados de sustentabilidade'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Usuários Ativos' },
    { value: '2M+', label: 'Garrafas Recicladas' },
    { value: '100+', label: 'Pontos de Coleta' },
    { value: '500+', label: 'Produtos Eco' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 eco-pattern opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="text-7xl">♻️</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                RECICLO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Transforme garrafas PET em moda sustentável.
              <br />
              Conecte-se à economia circular e faça parte da mudança!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4 text-lg shadow-lg"
                >
                  Começar Agora
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline px-8 py-4 text-lg"
                >
                  Já tenho conta
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Recursos que Transformam
            </h2>
            <p className="text-lg text-gray-600">
              Tecnologia e sustentabilidade juntas para um futuro melhor
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="card p-6 hover:shadow-xl"
              >
                <div className="text-primary-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
            Como Funciona?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Cadastre-se', emoji: '📱', desc: 'Crie sua conta gratuitamente' },
              { step: '2', title: 'Colete PET', emoji: '♻️', desc: 'Recolha garrafas plásticas' },
              { step: '3', title: 'Escaneie', emoji: '📸', desc: 'Use o scanner para registrar' },
              { step: '4', title: 'Ganhe Pontos', emoji: '🎁', desc: 'Troque por recompensas eco' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="text-center"
              >
                <div className="relative">
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Junte-se à Revolução Verde! 🌍
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Cada garrafa conta. Cada ação importa. Vamos transformar o mundo juntos!
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-10 py-4 text-lg shadow-xl"
              >
                Comece Sua Jornada Eco
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>© 2024 RECICLO - Transformando o futuro, uma garrafa por vez</p>
      </footer>
    </div>
  );
};

export default Landing;
