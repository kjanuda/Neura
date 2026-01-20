// app/Components/nav&foot/ConditionalLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where navbar and footer should be hidden
  const hideNavAndFooter = pathname === '/login' || 
                           pathname === '/signup' || 
                           pathname === '/register' || 
                           pathname === '/signin';

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}