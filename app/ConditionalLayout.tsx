'use client';

import { usePathname } from 'next/navigation';
import { NavigationMenu } from '@/components/nav/nav';
import { Footer } from '@/components/footer/Footer';
import { NavProvider } from './context/NavContext';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isLumePage = pathname === '/lume';

  if (isLumePage) {
    // Para la página de Lume, no mostrar navegación ni footer
    return <main>{children}</main>;
  }

  // Para todas las demás páginas, mostrar navegación y footer
  return (
    <NavProvider>
      <NavigationMenu />
      <main className="min-h-screen">{children}</main>
       <Footer /> 
    </NavProvider>
  );
}