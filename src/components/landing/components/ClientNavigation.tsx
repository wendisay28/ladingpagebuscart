'use client';

import Navigation from './Navigation';
import { NavigationProvider } from '../../../context/NavigationContext';

export default function ClientNavigation() {
  return (
    <NavigationProvider>
      <Navigation />
    </NavigationProvider>
  );
}
