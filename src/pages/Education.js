import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, PlayCircleIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';

const Education = () => {
  const courses = [
    {
      id: 1,
      title: 'Introdução à Reciclagem',
      description: 'Aprenda os conceitos básicos da reciclagem',
      duration: '15 min',
      level: 'Iniciante',
      icon: '♻️',
      progress: 100
    },
    {
      id: 2,
      title: 'O Ciclo do PET',
      description: 'Entenda como as garrafas PET se transformam em produtos',
      duration: '20 min',
      level: 'Intermediário',
      icon: '🍾',
      progress: 60
    },
    {
      id: 3,
      title: 'Economia Circular',
      description: 'Descubra o modelo econômico do futuro',
      duration: '30 min',
      level: 'Avançado',
      icon: '🔄',
      progress: 0
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <AcademicCapIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Reciclo Educa
        </h1>
        <p className="text-gray-600">
          Aprenda sobre sustentabilidade e ganhe pontos!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            className="card p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{course.icon}</span>
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                {course.level}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpenIcon className="h-4 w-4" />
                <span>5 aulas</span>
              </div>
            </div>
            
            {course.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progresso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <button className="btn-primary w-full py-2 flex items-center justify-center">
              <PlayCircleIcon className="h-5 w-5 mr-2" />
              {course.progress === 0 ? 'Começar' : course.progress === 100 ? 'Revisar' : 'Continuar'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Featured Video */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vídeo em Destaque</h2>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <PlayCircleIcon className="h-24 w-24 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default Education;
