import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';
import { ArrowLeft, Calendar, ShoppingBag, Envelope, Users } from '@phosphor-icons/react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

export default function AdminDashboard({ onExitAdmin }: AdminDashboardProps) {
  const [bookings] = useKV<any[]>('bookings', []);
  const [orders] = useKV<any[]>('orders', []);
  const [messages] = useKV<any[]>('contact-messages', []);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onExitAdmin}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
              <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{bookings?.length || 0}</p>
                      <p className="text-muted-foreground">Total Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{orders?.length || 0}</p>
                      <p className="text-muted-foreground">Total Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Envelope className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{messages?.length || 0}</p>
                      <p className="text-muted-foreground">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {(bookings || []).slice(0, 3).map((booking: any) => (
                    <div key={booking.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-muted-foreground">{booking.eventType}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  )) || <p className="text-muted-foreground">No bookings yet</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  {(messages || []).slice(0, 3).map((message: any) => (
                    <div key={message.id} className="py-2 border-b last:border-0">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</p>
                    </div>
                  )) || <p className="text-muted-foreground">No messages yet</p>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {(bookings || []).length > 0 ? (
                  <div className="space-y-4">
                    {(bookings || []).map((booking: any) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h3 className="font-semibold">{booking.name}</h3>
                              <p className="text-muted-foreground">{booking.email}</p>
                              <p className="text-muted-foreground">{booking.phone}</p>
                            </div>
                            <div>
                              <p><strong>Event:</strong> {booking.eventType}</p>
                              <p><strong>Date:</strong> {booking.date}</p>
                              <p><strong>Time:</strong> {booking.time}</p>
                              <p><strong>Guests:</strong> {booking.guests}</p>
                            </div>
                            <div className="flex items-start justify-between">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(booking.createdAt)}
                              </p>
                            </div>
                          </div>
                          {booking.requests && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm"><strong>Special Requests:</strong></p>
                              <p className="text-sm text-muted-foreground">{booking.requests}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No bookings yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Menu Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order management would be implemented here with cart data processing.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {(messages || []).length > 0 ? (
                  <div className="space-y-4">
                    {(messages || []).map((message: any) => (
                      <Card key={message.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{message.name}</h3>
                              <p className="text-muted-foreground">{message.email}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(message.createdAt)}
                            </p>
                          </div>
                          {message.subject && (
                            <p className="font-medium mb-2">Subject: {message.subject}</p>
                          )}
                          <p className="text-muted-foreground">{message.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No messages yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}