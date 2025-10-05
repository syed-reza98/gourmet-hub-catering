import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useKV } from '@github/spark/hooks';
import { Calendar, Clock, Users, Phone, Envelope, MapPin } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  requests: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export default function BookingSection() {
  const [bookings, setBookings] = useKV<Booking[]>('bookings', []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    time: '',
    guests: '',
    location: '',
    requests: ''
  });

  const eventTypes = [
    'Wedding Reception',
    'Corporate Event',
    'Birthday Party',
    'Anniversary Celebration',
    'Baby Shower',
    'Graduation Party',
    'Holiday Gathering',
    'Other'
  ];

  const timeSlots = [
    '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.date || !formData.guests) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      location: formData.location,
      requests: formData.requests,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setBookings((currentBookings = []) => [...currentBookings, newBooking]);

    toast.success('Booking request submitted! We\'ll contact you within 24 hours.');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      date: '',
      time: '',
      guests: '',
      location: '',
      requests: ''
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Event
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let us make your special occasion unforgettable. Fill out the form below 
            and we'll create a custom catering package just for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select 
                      value={formData.eventType} 
                      onValueChange={(value) => handleInputChange('eventType', value)}
                    >
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={today}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select 
                      value={formData.time} 
                      onValueChange={(value) => handleInputChange('time', value)}
                    >
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      placeholder="50"
                      min="1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Address or venue name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={formData.requests}
                    onChange={(e) => handleInputChange('requests', e.target.value)}
                    placeholder="Dietary restrictions, special menu items, setup requirements, etc."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-FOOD</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Envelope className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">events@savorydelights.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground">123 Culinary Ave, Food City</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}