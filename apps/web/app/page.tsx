import { getLeads } from "./actions";
import { LeadTable } from "@/components/LeadTable";
import { N8NStatusCard } from "@/components/N8NStatusCard";

export default async function DashboardPage() {
  const leads = await getLeads();

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard de Prospección Sonora</h1>
      
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <N8NStatusCard isActive={true} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Leads Recientes</h2>
        <LeadTable leads={leads as any} />
      </section>
    </main>
  );
}
