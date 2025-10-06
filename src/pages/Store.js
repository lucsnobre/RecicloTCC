import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  FireIcon,
  CheckBadgeIcon,
  TruckIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const Store = () => {
  const { userStats } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: '🛍️' },
    { id: 'fashion', name: 'Moda', icon: '👕' },
    { id: 'accessories', name: 'Acessórios', icon: '👜' },
    { id: 'home', name: 'Casa', icon: '🏠' },
    { id: 'beauty', name: 'Beleza', icon: '💄' },
    { id: 'tech', name: 'Tech', icon: '📱' },
    { id: 'vouchers', name: 'Vouchers', icon: '🎟️' }
  ];

  const products = [
    {
      id: 1,
      name: 'Camiseta Eco PET',
      description: 'Feita com 10 garrafas PET recicladas',
      category: 'fashion',
      price: 150,
      originalPrice: 200,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 234,
      eco: true,
      hot: true,
      stock: 15,
      brand: 'EcoWear',
      materials: ['100% PET reciclado'],
      co2Saved: '2.5kg'
    },
    {
      id: 2,
      name: 'Mochila Sustentável',
      description: 'Resistente e ecológica',
      category: 'accessories',
      price: 250,
      originalPrice: 350,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviews: 189,
      eco: true,
      hot: false,
      stock: 8,
      brand: 'GreenBag',
      materials: ['PET reciclado', 'Algodão orgânico'],
      co2Saved: '3.2kg'
    },
    {
      id: 3,
      name: 'Garrafa Reutilizável Premium',
      description: 'Mantém temperatura por 24h',
      category: 'home',
      price: 100,
      originalPrice: 150,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviews: 456,
      eco: true,
      hot: true,
      stock: 25,
      brand: 'HydroEco',
      materials: ['Aço inoxidável', 'Silicone livre de BPA'],
      co2Saved: '1.8kg'
    },
    {
      id: 4,
      name: 'Kit Beleza Natural',
      description: 'Produtos veganos e cruelty-free',
      category: 'beauty',
      price: 180,
      originalPrice: 250,
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviews: 123,
      eco: true,
      hot: false,
      stock: 12,
      brand: 'NaturaSkin',
      materials: ['Ingredientes orgânicos'],
      co2Saved: '1.2kg'
    },
    {
      id: 5,
      name: 'Carregador Solar Portátil',
      description: 'Energia limpa onde você estiver',
      category: 'tech',
      price: 300,
      originalPrice: 450,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 89,
      eco: true,
      hot: true,
      stock: 6,
      brand: 'SolarTech',
      materials: ['Painéis solares', 'Plástico reciclado'],
      co2Saved: '5.0kg'
    },
    {
      id: 6,
      name: 'Voucher Loja Parceira',
      description: '20% de desconto em produtos selecionados',
      category: 'vouchers',
      price: 50,
      originalPrice: null,
      image: '/api/placeholder/300/300',
      rating: 5.0,
      reviews: 567,
      eco: false,
      hot: true,
      stock: 100,
      brand: 'Parceiros Eco',
      validity: '30 dias'
    }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    if (userStats.totalPoints < product.price) {
      toast.error('Pontos insuficientes!');
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Loja Eco 🌱
            </h1>
            <p className="text-gray-600">
              Troque seus pontos por produtos sustentáveis
            </p>
          </div>
          
          {/* Points Balance */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-3 rounded-xl">
              <p className="text-sm text-gray-600">Seus Pontos</p>
              <p className="text-2xl font-bold text-primary-600">
                {userStats?.totalPoints || 0} pts
              </p>
            </div>
            
            <button className="relative p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos eco..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="popular">Mais Popular</option>
            <option value="rating">Melhor Avaliado</option>
            <option value="price-low">Menor Preço</option>
            <option value="price-high">Maior Preço</option>
          </select>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <FunnelIcon className="h-5 w-5" />
            Filtros
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-6 no-scrollbar">
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.eco && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                      <CheckBadgeIcon className="h-3 w-3" />
                      ECO
                    </span>
                  )}
                  {product.hot && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                      <FireIcon className="h-3 w-3" />
                      HOT
                    </span>
                  )}
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
                >
                  {favorites.includes(product.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary-500 text-white text-sm font-bold rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                {/* Eco Info */}
                {product.co2Saved && (
                  <div className="text-xs text-green-600 mb-3">
                    🌱 Economiza {product.co2Saved} de CO₂
                  </div>
                )}
                
                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary-600">
                        {product.price} pts
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice} pts
                        </span>
                      )}
                    </div>
                    {product.stock <= 10 && (
                      <p className="text-xs text-orange-600 mt-1">
                        Apenas {product.stock} em estoque!
                      </p>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Benefits Banner */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Por que comprar na Loja Eco?
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg">
              <TruckIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Entrega Sustentável</h3>
              <p className="text-sm text-gray-600">Compensação de carbono em todas as entregas</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg">
              <ArrowsRightLeftIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Troca Fácil</h3>
              <p className="text-sm text-gray-600">30 dias para trocar seus produtos</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg">
              <SparklesIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Produtos Certificados</h3>
              <p className="text-sm text-gray-600">100% eco-friendly e sustentáveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 bg-white rounded-xl shadow-2xl p-4 z-30"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Carrinho ({cart.length})</h3>
            <p className="text-lg font-bold text-primary-600">{getCartTotal()} pts</p>
          </div>
          <button className="btn-primary w-full py-2">
            Finalizar Compra
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Store;
