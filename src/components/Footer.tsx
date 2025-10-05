import { ChefHat, Phone, Envelope, MapPin } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-8 w-8" weight="fill" />
              <span className="font-display font-bold text-xl">Savory Delights</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Creating exceptional culinary experiences for your most important moments since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Our Menu</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Book Event</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-background/80">Wedding Catering</span></li>
              <li><span className="text-background/80">Corporate Events</span></li>
              <li><span className="text-background/80">Private Parties</span></li>
              <li><span className="text-background/80">Holiday Gatherings</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-background/80">+1 (555) 123-FOOD</span>
              </div>
              <div className="flex items-center gap-2">
                <Envelope className="h-4 w-4" />
                <span className="text-background/80">events@savorydelights.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-background/80">123 Culinary Avenue<br />Food City, FC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © {new Date().getFullYear()} Savory Delights Catering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}