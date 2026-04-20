import { getAuditDetails } from "./actions";
import { AuditView } from "@/components/dashboard/AuditView";

export default async function AuditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const leads = await getAuditDetails(id);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Auditoría de Búsqueda: {id}</h1>
      <AuditView leads={leads as any} />
    </main>
  );
}
