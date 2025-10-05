import { Card, CardContent } from '@/components/ui/card';
import { Star, Trophy, Clock, Heart } from '@phosphor-icons/react';

export default function AboutSection() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion for Excellence',
      description: 'Every dish is crafted with love and attention to detail, ensuring an exceptional culinary experience.'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Premium Ingredients',
      description: 'We source only the finest, freshest ingredients from local farms and trusted suppliers.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Timely Service',
      description: 'Professional, punctual service that respects your schedule and event timeline.'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Award-Winning Team',
      description: 'Our certified chefs have won numerous culinary awards and recognition.'
    }
  ];

  const chefs = [
    {
      name: 'Chef Isabella Martinez',
      role: 'Executive Chef & Founder',
      bio: 'With 20 years of experience in fine dining, Chef Martinez brings her passion for innovative cuisine to every event.',
      specialties: 'Modern European, Molecular Gastronomy'
    },
    {
      name: 'Chef Marcus Thompson',
      role: 'Pastry Chef',
      bio: 'A master of desserts and baked goods, Chef Thompson creates stunning sweet endings to memorable meals.',
      specialties: 'French Pastries, Wedding Cakes'
    },
    {
      name: 'Chef Sophie Chen',
      role: 'Sous Chef',
      bio: 'Specializing in fusion cuisine, Chef Chen brings creative Asian-inspired flavors to our catering menu.',
      specialties: 'Asian Fusion, Vegetarian Cuisine'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Story
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Founded in 2008, Savory Delights began as a small family kitchen with a big dream: 
            to create extraordinary culinary experiences that bring people together. Today, we're 
            proud to be the region's premier catering service, having served over 500 memorable events.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            What started with traditional family recipes has evolved into an innovative culinary 
            journey that honors both heritage and creativity. Every dish tells a story, every event 
            becomes a cherished memory, and every client becomes part of our extended family.
          </p>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="font-display text-3xl font-bold text-center text-foreground mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-lg mb-3">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chef Profiles */}
        <div>
          <h3 className="font-display text-3xl font-bold text-center text-foreground mb-12">
            Meet Our Culinary Team
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {chef.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="font-display text-xl font-semibold mb-1">{chef.name}</h4>
                    <p className="text-primary font-medium">{chef.role}</p>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {chef.bio}
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-foreground mb-1">Specialties:</p>
                    <p className="text-sm text-muted-foreground">{chef.specialties}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Events Catered</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Menu Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}