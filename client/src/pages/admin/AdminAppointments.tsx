import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@shared/schema";

export default function AdminAppointments() {
  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    queryFn: async () => {
      const response = await fetch("/api/appointments");
      return response.json();
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Manage Appointments</h2>

      {isLoading ? (
        <div>Loading appointments...</div>
      ) : appointments && appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="p-4" data-testid={`card-appointment-${apt.id}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold">{apt.name}</h3>
                  <p className="text-sm text-muted-foreground">{apt.email}</p>
                  <p className="text-sm">{apt.date} at {apt.time}</p>
                  <p className="text-sm">{apt.consultationType}</p>
                </div>
                <Badge variant={apt.paymentStatus === "completed" ? "default" : "outline"}>
                  {apt.paymentStatus}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          No appointments yet
        </Card>
      )}
    </div>
  );
}
