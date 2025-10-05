import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';
import { ShoppingCart, List, X, ChefHat } from '@phosphor-icons/react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onCartOpen: () => void;
  onAdminAccess: () => void;
}

export default function Header({ currentSection, onSectionChange, onCartOpen, onAdminAccess }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart] = useKV<any[]>('cart', []);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'booking', label: 'Book Event' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const cartItemCount = cart?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-primary" weight="fill" />
            <span className="font-display font-bold text-xl text-foreground">
              Savory Delights
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={currentSection === item.id ? 'default' : 'ghost'}
                className="font-medium"
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Cart and Admin */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={onCartOpen}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminAccess}
              className="hidden sm:flex"
            >
              Admin
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <List className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border mt-4 pt-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="justify-start sm:hidden"
                onClick={() => {
                  onAdminAccess();
                  setIsMobileMenuOpen(false);
                }}
              >
                Admin Dashboard
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}