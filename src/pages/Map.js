import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPinIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  StarIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ListBulletIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different types of collection points
const createCustomIcon = (color, emoji) => {
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        transform: rotate(-45deg);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      ">
        <span style="transform: rotate(45deg);">${emoji}</span>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Map controller component
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

const Map = () => {
  const [userLocation, setUserLocation] = useState([-23.550520, -46.633308]); // São Paulo default
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // map or list
  const [filters, setFilters] = useState({
    type: 'all',
    distance: 5,
    rating: 0,
    openNow: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock collection points
  const collectionPoints = [
    {
      id: 1,
      name: 'EcoPonto Central',
      type: 'ecoponto',
      position: [-23.550520, -46.633308],
      address: 'Praça da Sé, Centro, São Paulo',
      hours: '8:00 - 18:00',
      phone: '(11) 3456-7890',
      rating: 4.8,
      reviews: 234,
      materials: ['PET', 'Vidro', 'Papel', 'Metal'],
      distance: 0.5,
      emoji: '♻️',
      color: '#2fbf80',
      isOpen: true
    },
    {
      id: 2,
      name: 'Supermercado Verde',
      type: 'supermercado',
      position: [-23.548720, -46.635508],
      address: 'Rua XV de Novembro, 123',
      hours: '7:00 - 22:00',
      phone: '(11) 2345-6789',
      rating: 4.5,
      reviews: 189,
      materials: ['PET', 'Vidro'],
      distance: 1.2,
      emoji: '🛒',
      color: '#3aadff',
      isOpen: true
    },
    {
      id: 3,
      name: 'Cooperativa Recicla+',
      type: 'cooperativa',
      position: [-23.553120, -46.631108],
      address: 'Av. Ipiranga, 456',
      hours: '6:00 - 20:00',
      phone: '(11) 3456-7891',
      rating: 4.9,
      reviews: 456,
      materials: ['PET', 'Vidro', 'Papel', 'Metal', 'Eletrônicos'],
      distance: 2.3,
      emoji: '🏢',
      color: '#fbbf24',
      isOpen: true
    },
    {
      id: 4,
      name: 'Escola Municipal Verde',
      type: 'escola',
      position: [-23.546920, -46.638708],
      address: 'Rua das Flores, 789',
      hours: '7:00 - 17:00',
      phone: '(11) 4567-8901',
      rating: 4.7,
      reviews: 123,
      materials: ['PET', 'Papel'],
      distance: 3.1,
      emoji: '🏫',
      color: '#fb923c',
      isOpen: false
    },
    {
      id: 5,
      name: 'Shopping EcoPlaza',
      type: 'shopping',
      position: [-23.555320, -46.629308],
      address: 'Av. Paulista, 1000',
      hours: '10:00 - 22:00',
      phone: '(11) 5678-9012',
      rating: 4.6,
      reviews: 567,
      materials: ['PET', 'Vidro', 'Papel', 'Pilhas'],
      distance: 1.8,
      emoji: '🏬',
      color: '#a855f7',
      isOpen: true
    }
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Não foi possível obter sua localização');
        }
      );
    }
  }, []);

  // Filter collection points
  const filteredPoints = collectionPoints.filter(point => {
    if (filters.type !== 'all' && point.type !== filters.type) return false;
    if (filters.openNow && !point.isOpen) return false;
    if (filters.rating > 0 && point.rating < filters.rating) return false;
    if (filters.distance > 0 && point.distance > filters.distance) return false;
    if (searchQuery && !point.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    if (viewMode === 'list') {
      setViewMode('map');
    }
  };

  const handleGetDirections = (point) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${point.position[0]},${point.position[1]}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full -mx-4 sm:-mx-6 lg:-mx-8 -mt-6">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Pontos de Coleta
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {filteredPoints.length} pontos encontrados próximos a você
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ponto de coleta..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'map'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <MapIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
              
              {/* Fullscreen Toggle (Map only) */}
              {viewMode === 'map' && (
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isFullscreen ? (
                    <ArrowsPointingInIcon className="h-5 w-5" />
                  ) : (
                    <ArrowsPointingOutIcon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setFilters({ ...filters, type: 'all' })}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              filters.type === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {['ecoponto', 'supermercado', 'cooperativa', 'escola', 'shopping'].map(type => (
            <button
              key={type}
              onClick={() => setFilters({ ...filters, type })}
              className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                filters.type === type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
          
          <button
            onClick={() => setFilters({ ...filters, openNow: !filters.openNow })}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              filters.openNow
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ClockIcon className="h-4 w-4 inline mr-1" />
            Aberto agora
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'}`}>
        {viewMode === 'map' ? (
          <MapContainer
            center={userLocation}
            zoom={15}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <MapController center={userLocation} zoom={15} />
            
            {/* User location circle */}
            <Circle
              center={userLocation}
              radius={100}
              pathOptions={{
                color: '#3aadff',
                fillColor: '#3aadff',
                fillOpacity: 0.2
              }}
            />
            
            {/* User marker */}
            <Marker
              position={userLocation}
              icon={createCustomIcon('#3aadff', '📍')}
            >
              <Popup>
                <div className="text-center">
                  <strong>Você está aqui!</strong>
                </div>
              </Popup>
            </Marker>
            
            {/* Collection points */}
            {filteredPoints.map(point => (
              <Marker
                key={point.id}
                position={point.position}
                icon={createCustomIcon(point.color, point.emoji)}
                eventHandlers={{
                  click: () => handlePointClick(point)
                }}
              >
                <Popup>
                  <div className="w-64 p-2">
                    <h3 className="font-semibold text-lg mb-2">{point.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                    
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(point.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-gray-600">({point.reviews})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        point.isOpen
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {point.isOpen ? 'Aberto' : 'Fechado'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {point.materials.map(material => (
                        <span
                          key={material}
                          className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleGetDirections(point)}
                      className="btn-primary w-full py-2 text-sm"
                    >
                      Como Chegar
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="h-full overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredPoints.map((point, index) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePointClick(point)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{point.emoji}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {point.name}
                            </h3>
                            <p className="text-sm text-gray-600">{point.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">{point.distance} km</span>
                          </div>
                          
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">{point.hours}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">{point.phone}</span>
                          </div>
                          
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(point.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-gray-600">
                              {point.rating} ({point.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {point.materials.map(material => (
                            <span
                              key={material}
                              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          point.isOpen
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {point.isOpen ? 'Aberto' : 'Fechado'}
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGetDirections(point);
                          }}
                          className="btn-primary px-4 py-2 text-sm"
                        >
                          <MapPinIcon className="h-4 w-4 inline mr-1" />
                          Direções
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Point Details (Mobile) */}
      {selectedPoint && viewMode === 'map' && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-6 z-40"
        >
          <button
            onClick={() => setSelectedPoint(null)}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="flex items-start gap-4">
            <span className="text-4xl">{selectedPoint.emoji}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{selectedPoint.name}</h3>
              <p className="text-sm text-gray-600">{selectedPoint.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedPoint.isOpen
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedPoint.isOpen ? 'Aberto' : 'Fechado'}
                </span>
                <span className="text-sm text-gray-600">{selectedPoint.hours}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => handleGetDirections(selectedPoint)}
            className="btn-primary w-full mt-4"
          >
            <MapPinIcon className="h-5 w-5 inline mr-2" />
            Como Chegar
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Map;
