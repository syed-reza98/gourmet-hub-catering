import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKV } from '@github/spark/hooks';
import { Plus, Leaf, Fire, Prohibit } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
  image?: string;
}

export default function MenuSection() {
  const [menuItems] = useKV<MenuItem[]>('menu-items', [
    {
      id: '1',
      name: 'Truffle Mushroom Bruschetta',
      description: 'Artisanal sourdough topped with wild mushrooms, truffle oil, and aged parmesan',
      price: 18,
      category: 'starters',
      dietary: ['vegetarian']
    },
    {
      id: '2',
      name: 'Smoked Salmon Canapés',
      description: 'House-cured salmon with cream cheese, capers, and fresh dill on rye',
      price: 24,
      category: 'starters',
      dietary: []
    },
    {
      id: '3',
      name: 'Herb-Crusted Lamb Wellington',
      description: 'Tender lamb loin wrapped in puff pastry with rosemary and thyme',
      price: 45,
      category: 'mains',
      dietary: []
    },
    {
      id: '4',
      name: 'Pan-Seared Halibut',
      description: 'Fresh halibut with lemon butter sauce, seasonal vegetables, and wild rice',
      price: 38,
      category: 'mains',
      dietary: ['gluten-free']
    },
    {
      id: '5',
      name: 'Chocolate Lava Tart',
      description: 'Warm chocolate tart with molten center, vanilla bean ice cream',
      price: 12,
      category: 'desserts',
      dietary: ['vegetarian']
    },
    {
      id: '6',
      name: 'Signature Craft Cocktail',
      description: 'House-made botanical gin with elderflower and fresh herbs',
      price: 15,
      category: 'beverages',
      dietary: ['vegan', 'gluten-free']
    }
  ]);

  const [cart, setCart] = useKV<any[]>('cart', []);
  const [selectedCategory, setSelectedCategory] = useState('starters');

  const categories = [
    { id: 'starters', label: 'Starters', icon: '🥗' },
    { id: 'mains', label: 'Main Course', icon: '🍽️' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
    { id: 'beverages', label: 'Beverages', icon: '🥂' }
  ];

  const addToCart = (item: MenuItem) => {
    setCart((currentCart = []) => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
    toast.success(`Added ${item.name} to cart`);
  };

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian': return <Leaf className="h-4 w-4 text-secondary" />;
      case 'vegan': return <Leaf className="h-4 w-4 text-secondary" />;
      case 'spicy': return <Fire className="h-4 w-4 text-destructive" />;
      case 'gluten-free': return <Prohibit className="h-4 w-4 text-accent" />;
      default: return null;
    }
  };

  const filteredItems = menuItems?.filter(item => item.category === selectedCategory) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Culinary Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted dishes using the finest seasonal ingredients, 
            designed to create memorable dining experiences for your guests.
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-display font-semibold text-xl text-foreground">
                          {item.name}
                        </h3>
                        <span className="font-bold text-primary text-lg">
                          ${item.price}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {item.dietary.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          {item.dietary.map((diet) => (
                            <Badge key={diet} variant="secondary" className="flex items-center gap-1">
                              {getDietaryIcon(diet)}
                              <span className="capitalize">{diet}</span>
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button 
                        onClick={() => addToCart(item)}
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}