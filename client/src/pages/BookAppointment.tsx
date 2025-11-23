import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Award, CheckCircle2, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/authContext";
import type { Appointment } from "@shared/schema";
import { getAuthToken } from "@/lib/supabase";

export default function BookAppointment() {
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState("Personal");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  const consultationTypes = ["Personal", "Business", "Relationship", "Health"];

  // Fetch appointments for admin
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    queryFn: async () => {
      const token = await getAuthToken();
      if (!token) return [];
      const response = await fetch("/api/appointments", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) return [];
      return response.json();
    },
    enabled: isAdmin && !authLoading
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Requested",
      description: "We'll confirm your booking via email shortly",
    });
  };

  // Admin view - show all bookings
  if (isAdmin && !authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Consultation Bookings</h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">Manage all customer consultation bookings</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          {appointmentsLoading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading bookings...</p>
              </CardContent>
            </Card>
          ) : appointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No consultation bookings yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold">{appointment.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm">{appointment.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold">{appointment.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <Badge>{appointment.consultationType}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><CalendarIcon className="w-4 h-4" />Date</p>
                        <p className="font-semibold">{appointment.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" />Time</p>
                        <p className="font-semibold">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={appointment.paymentStatus === "completed" ? "default" : "outline"}>
                          {appointment.paymentStatus}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booked</p>
                        <p className="font-semibold text-sm">
                          {appointment.createdAt ? new Date(appointment.createdAt).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>
                    {appointment.message && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Message</p>
                        <p className="text-sm">{appointment.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-appointment-title">
            Book Your Consultation
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Get personalized astrology guidance from our expert astrologers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Astrologer Profile */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
                    <AvatarFallback>PJ</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-2xl font-bold mb-2" data-testid="text-astrologer-name">
                    Pandit Rajesh Sharma
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Senior Vedic Astrologer
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(500+ consultations)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">25+ Years Experience</p>
                      <p className="text-xs text-muted-foreground">Expert in Vedic Astrology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Certified Astrologer</p>
                      <p className="text-xs text-muted-foreground">IVA & ICAS Certified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">60-Minute Session</p>
                      <p className="text-xs text-muted-foreground">Detailed analysis & remedies</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Consultation Fee</p>
                    <p className="text-3xl font-bold text-accent" data-testid="text-fee">₹2,100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required data-testid="input-email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required data-testid="input-phone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input id="dob" type="date" required data-testid="input-dob" />
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-2">
                    <Label>Consultation Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {consultationTypes.map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={consultationType === type ? "default" : "outline"}
                          onClick={() => setConsultationType(type)}
                          data-testid={`button-type-${type.toLowerCase()}`}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <div className="border rounded-md p-4 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>Select Time Slot</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          data-testid={`button-time-${time.replace(/[:\s]/g, '-').toLowerCase()}`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Share any specific concerns or questions..."
                      rows={4}
                      data-testid="textarea-message"
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" size="lg" className="w-full" data-testid="button-book-now">
                    Confirm Booking & Pay ₹2,100
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
