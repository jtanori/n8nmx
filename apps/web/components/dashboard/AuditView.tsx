import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: string;
  business_name: string;
  relevance_score: number;
  is_high_quality: boolean;
}

export const AuditView = ({ leads }: { leads: Lead[] }) => {
  const highQualityCount = leads.filter(l => l.is_high_quality).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Resumen de Auditoría</CardTitle></CardHeader>
          <CardContent>
            <p>Leads Totales: {leads.length}</p>
            <p>Leads Alta Calidad: {highQualityCount}</p>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Negocio</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.business_name}</TableCell>
              <TableCell>{lead.relevance_score}</TableCell>
              <TableCell>
                <Badge variant={lead.is_high_quality ? "default" : "secondary"}>
                  {lead.is_high_quality ? "Alta Calidad" : "Estándar"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
