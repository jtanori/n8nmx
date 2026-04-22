import { AuditView } from "@/components/dashboard/AuditView";
import { getAuditDetails } from "./actions";

interface Lead {
  id: string;
  business_name: string;
  relevance_score: number;
  is_high_quality: boolean;
}

export default async function AuditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const leads = (await getAuditDetails(id)) as Lead[];
  
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Auditoría de Búsqueda: {id}</h1>
      <AuditView leads={leads} />
    </main>
  );
}
