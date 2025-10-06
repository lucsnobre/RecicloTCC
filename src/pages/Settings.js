import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  MoonIcon,
  LanguageIcon,
  DevicePhoneMobileIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Settings = () => {
  const { logout, user } = useAuth();
  const { preferences, updatePreferences } = useNotification();
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', name: 'Notificações', icon: BellIcon },
    { id: 'privacy', name: 'Privacidade', icon: ShieldCheckIcon },
    { id: 'account', name: 'Conta', icon: UserIcon },
    { id: 'appearance', name: 'Aparência', icon: MoonIcon },
    { id: 'about', name: 'Sobre', icon: CogIcon }
  ];

  const handleToggle = (setting) => {
    updatePreferences({ ...preferences, [setting]: !preferences[setting] });
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Configurações
        </h1>
        <p className="text-gray-600">
          Personalize sua experiência no RECICLO
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </div>
                {activeTab === tab.id && (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
            ))}
            
            <hr className="my-2" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Preferências de Notificação
                </h2>
                
                <div className="space-y-6">
                  {/* Push Notifications */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Notificações Push</h3>
                      <p className="text-sm text-gray-600">Receba alertas em tempo real</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.push}
                        onChange={() => handleToggle('push')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">E-mail</h3>
                      <p className="text-sm text-gray-600">Resumos semanais e ofertas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.email}
                        onChange={() => handleToggle('email')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* SMS */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS</h3>
                      <p className="text-sm text-gray-600">Lembretes importantes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.sms}
                        onChange={() => handleToggle('sms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <hr />

                  <h3 className="font-medium text-gray-900">Tipos de Notificação</h3>
                  
                  {[
                    { key: 'collectReminders', label: 'Lembretes de Coleta', desc: 'Alertas sobre dias de coleta' },
                    { key: 'challengeUpdates', label: 'Atualizações de Desafios', desc: 'Progresso e novos desafios' },
                    { key: 'communityActivity', label: 'Atividade da Comunidade', desc: 'Posts e interações de amigos' },
                    { key: 'promotions', label: 'Promoções e Ofertas', desc: 'Descontos especiais na loja' },
                    { key: 'educationalContent', label: 'Conteúdo Educativo', desc: 'Novos cursos e artigos' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[item.key]}
                          onChange={() => handleToggle(item.key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}

                  <hr />

                  {/* Quiet Hours */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Horário Silencioso</h3>
                        <p className="text-sm text-gray-600">Pausar notificações em horários específicos</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.quietHours?.enabled}
                          onChange={() => updatePreferences({
                            quietHours: {
                              ...preferences.quietHours,
                              enabled: !preferences.quietHours?.enabled
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    {preferences.quietHours?.enabled && (
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">Início</label>
                          <input
                            type="time"
                            value={preferences.quietHours?.start}
                            className="input"
                            onChange={(e) => updatePreferences({
                              quietHours: {
                                ...preferences.quietHours,
                                start: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">Fim</label>
                          <input
                            type="time"
                            value={preferences.quietHours?.end}
                            className="input"
                            onChange={(e) => updatePreferences({
                              quietHours: {
                                ...preferences.quietHours,
                                end: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Privacidade e Segurança
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Perfil Público</h3>
                      <p className="text-sm text-gray-600">Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Compartilhar Localização</h3>
                      <p className="text-sm text-gray-600">Usar localização para encontrar pontos próximos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Autenticação em Dois Fatores</h3>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <button className="btn-outline px-4 py-2 text-sm">
                      Configurar
                    </button>
                  </div>

                  <hr />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Dados e Privacidade</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Baixar meus dados</span>
                          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Política de Privacidade</span>
                          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Excluir minha conta</span>
                          <ChevronRightIcon className="h-4 w-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Informações da Conta
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 98765-4321"
                      className="input"
                    />
                  </div>

                  <hr />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Alterar Senha</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nova Senha
                        </label>
                        <input
                          type="password"
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmar Nova Senha
                        </label>
                        <input
                          type="password"
                          className="input"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => toast.success('Informações atualizadas com sucesso!')}
                    className="btn-primary px-6 py-3"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Aparência
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border-2 border-primary-500 rounded-lg text-center">
                        <MoonIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm font-medium">Claro</span>
                      </button>
                      <button className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-gray-300">
                        <MoonIcon className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        <span className="text-sm font-medium">Escuro</span>
                      </button>
                      <button className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-gray-300">
                        <DevicePhoneMobileIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm font-medium">Sistema</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Idioma</h3>
                    <select className="input">
                      <option>Português (Brasil)</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Tamanho da Fonte</h3>
                    <div className="flex items-center gap-4">
                      <button className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">A-</button>
                      <span className="flex-1 text-center">Normal</span>
                      <button className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">A+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Sobre o RECICLO
                </h2>
                
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <span className="text-6xl">♻️</span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">RECICLO</h3>
                    <p className="text-gray-600">Versão 1.0.0</p>
                  </div>

                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Nossa Missão</h4>
                    <p className="text-sm text-gray-700">
                      Transformar a maneira como o mundo recicla, conectando pessoas, 
                      empresas e comunidades em prol de um futuro mais sustentável.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Termos de Uso</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Política de Privacidade</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Central de Ajuda</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fale Conosco</span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500 pt-4">
                    <p>© 2024 RECICLO. Todos os direitos reservados.</p>
                    <p className="mt-2">Feito com 💚 para um mundo melhor</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
