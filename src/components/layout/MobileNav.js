import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  CameraIcon,
  MapIcon,
  ShoppingBagIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  CameraIcon as CameraIconSolid,
  MapIcon as MapIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserCircleIcon as UserCircleIconSolid
} from '@heroicons/react/24/solid';

const MobileNav = ({ className = '' }) => {
  const navigation = [
    { name: 'Início', href: '/dashboard', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Scanner', href: '/scanner', icon: CameraIcon, activeIcon: CameraIconSolid },
    { name: 'Mapa', href: '/map', icon: MapIcon, activeIcon: MapIconSolid },
    { name: 'Loja', href: '/store', icon: ShoppingBagIcon, activeIcon: ShoppingBagIconSolid },
    { name: 'Perfil', href: '/profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 ${className}`}>
      <nav className="flex justify-around items-center h-16 px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 px-1 ${
                isActive ? 'text-primary-600' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <item.activeIcon className="h-6 w-6 mb-1" />
                ) : (
                  <item.icon className="h-6 w-6 mb-1" />
                )}
                <span className="text-xs font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
