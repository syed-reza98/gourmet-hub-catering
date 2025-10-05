import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from '@phosphor-icons/react';

interface HeroProps {
  onSectionChange: (section: string) => void;
}

export default function Hero({ onSectionChange }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.accent/20),transparent_50%),radial-gradient(circle_at_80%_20%,theme(colors.primary/10),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-accent fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Rated #1 Catering Service in the City
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Exceptional Catering
            <br />
            <span className="text-primary">for Every Occasion</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we craft unforgettable culinary experiences 
            using the finest ingredients and artisanal techniques.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gap-2"
              onClick={() => onSectionChange('menu')}
            >
              Explore Our Menu
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => onSectionChange('booking')}
            >
              Book Your Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Events Catered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-float">
        <div className="w-20 h-20 rounded-full bg-accent/30 blur-sm" />
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 rounded-full bg-primary/30 blur-sm" />
      </div>
    </section>
  );
}