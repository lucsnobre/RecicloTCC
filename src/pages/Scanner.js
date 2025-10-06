import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  CameraIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  PhotoIcon,
  SparklesIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

const Scanner = () => {
  const navigate = useNavigate();
  const { addPoints } = useAuth();
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [mode, setMode] = useState('camera'); // camera or upload
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);

  // Material types and their point values
  const materialTypes = {
    PET: { points: 10, color: 'text-green-600', icon: '♻️', name: 'Garrafa PET' },
    GLASS: { points: 15, color: 'text-blue-600', icon: '🍾', name: 'Vidro' },
    PAPER: { points: 5, color: 'text-yellow-600', icon: '📄', name: 'Papel' },
    METAL: { points: 20, color: 'text-gray-600', icon: '🥫', name: 'Metal' },
    PLASTIC: { points: 8, color: 'text-purple-600', icon: '🧃', name: 'Plástico' }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      processImage(imageSrc);
    }
  }, [webcamRef]);

  const processImage = async (image) => {
    setScanning(true);
    
    // Simula processamento de IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula resultado do scan
    const materials = Object.keys(materialTypes);
    const detectedMaterial = materials[Math.floor(Math.random() * materials.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    
    const result = {
      material: detectedMaterial,
      quantity,
      points: materialTypes[detectedMaterial].points * quantity,
      timestamp: new Date().toISOString()
    };
    
    setScanResult(result);
    setScanning(false);
    
    // Add to recent scans
    setRecentScans(prev => [result, ...prev.slice(0, 4)]);
  };

  const confirmScan = () => {
    if (scanResult) {
      addPoints(scanResult.points, scanResult.quantity);
      setShowConfetti(true);
      toast.success(
        <div>
          <strong>Ótimo trabalho!</strong>
          <br />
          Você ganhou {scanResult.points} pontos!
        </div>
      );
      
      setTimeout(() => {
        setShowConfetti(false);
        resetScan();
      }, 3000);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setCapturedImage(null);
    setScanning(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tips = [
    'Certifique-se de que o material esteja bem iluminado',
    'Posicione o objeto no centro da câmera',
    'Evite reflexos e sombras muito fortes',
    'Limpe as garrafas antes de escanear'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Scanner Inteligente
          </h1>
          <p className="text-gray-600">
            Aponte para materiais recicláveis e ganhe pontos instantaneamente!
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setMode('camera')}
              className={`px-4 py-2 rounded-md transition-all ${
                mode === 'camera'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CameraIcon className="h-5 w-5 inline mr-2" />
              Câmera
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`px-4 py-2 rounded-md transition-all ${
                mode === 'upload'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PhotoIcon className="h-5 w-5 inline mr-2" />
              Upload
            </button>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!scanResult ? (
              <motion.div
                key="scanner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {mode === 'camera' ? (
                  <>
                    {!capturedImage ? (
                      <div className="relative">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className="w-full rounded-t-2xl"
                          videoConstraints={{
                            facingMode: "environment"
                          }}
                        />
                        
                        {/* Scanner overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0 border-4 border-primary-500/20 m-8 rounded-xl">
                            {scanning && (
                              <div className="scanner-line"></div>
                            )}
                          </div>
                          
                          {/* Corner markers */}
                          <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl"></div>
                          <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-xl"></div>
                          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-xl"></div>
                          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <img src={capturedImage} alt="Captured" className="w-full" />
                        {scanning && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="spinner w-12 h-12 mx-auto mb-4"></div>
                              <p className="text-lg font-medium">Analisando material...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-6">
                      {!capturedImage ? (
                        <button
                          onClick={capture}
                          className="btn-primary w-full py-4 text-lg font-semibold"
                        >
                          <CameraIcon className="h-6 w-6 inline mr-2" />
                          Capturar Imagem
                        </button>
                      ) : (
                        <button
                          onClick={resetScan}
                          disabled={scanning}
                          className="btn-outline w-full py-4 text-lg font-semibold"
                        >
                          <ArrowPathIcon className="h-6 w-6 inline mr-2" />
                          Tentar Novamente
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {!capturedImage ? (
                      <>
                        <PhotoIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Envie uma foto do material
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Selecione uma imagem clara do material reciclável
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="btn-primary px-8 py-3"
                        >
                          Escolher Arquivo
                        </button>
                      </>
                    ) : (
                      <>
                        <img src={capturedImage} alt="Uploaded" className="w-full rounded-lg mb-4" />
                        {scanning ? (
                          <div className="flex items-center justify-center">
                            <div className="spinner w-8 h-8 mr-3"></div>
                            <p>Analisando...</p>
                          </div>
                        ) : (
                          <button
                            onClick={resetScan}
                            className="btn-outline px-8 py-3"
                          >
                            Enviar Outra
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block mb-4"
                  >
                    <div className="text-6xl">
                      {materialTypes[scanResult.material].icon}
                    </div>
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Material Detectado!
                  </h2>
                  
                  <div className={`text-xl font-semibold ${materialTypes[scanResult.material].color} mb-4`}>
                    {materialTypes[scanResult.material].name}
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Quantidade</p>
                        <p className="text-2xl font-bold text-gray-900">{scanResult.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pontos</p>
                        <p className="text-2xl font-bold text-primary-600">+{scanResult.points}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={resetScan}
                      className="flex-1 btn-outline py-3"
                    >
                      <XMarkIcon className="h-5 w-5 inline mr-2" />
                      Cancelar
                    </button>
                    <button
                      onClick={confirmScan}
                      className="flex-1 btn-primary py-3"
                    >
                      <CheckCircleIcon className="h-5 w-5 inline mr-2" />
                      Confirmar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Dicas para melhor resultado:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        {recentScans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Scans Recentes</h3>
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{materialTypes[scan.material].icon}</span>
                    <div>
                      <p className="font-medium">{materialTypes[scan.material].name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(scan.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">+{scan.points}</p>
                    <p className="text-xs text-gray-500">{scan.quantity} un.</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 text-center">
            <BoltIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary-700">12</p>
            <p className="text-xs text-primary-600">Scans Hoje</p>
          </div>
          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4 text-center">
            <SparklesIcon className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary-700">250</p>
            <p className="text-xs text-secondary-600">Pontos Hoje</p>
          </div>
          <div className="bg-gradient-to-br from-eco-green/10 to-eco-blue/10 rounded-xl p-4 text-center">
            <CameraIcon className="h-8 w-8 text-eco-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-eco-green">95%</p>
            <p className="text-xs text-gray-600">Precisão</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Scanner;
