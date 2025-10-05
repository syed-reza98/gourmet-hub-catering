import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import BookingSection from '@/components/BookingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import AdminDashboard from '@/components/AdminDashboard';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-background font-body">
        <AdminDashboard onExitAdmin={() => setIsAdminMode(false)} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Header 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onCartOpen={() => setIsCartOpen(true)}
        onAdminAccess={() => setIsAdminMode(true)}
      />
      
      <main>
        {currentSection === 'home' && <Hero onSectionChange={setCurrentSection} />}
        {currentSection === 'menu' && <MenuSection />}
        {currentSection === 'booking' && <BookingSection />}
        {currentSection === 'about' && <AboutSection />}
        {currentSection === 'contact' && <ContactSection />}
      </main>

      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      <Toaster />
    </div>
  );
}

export default App;