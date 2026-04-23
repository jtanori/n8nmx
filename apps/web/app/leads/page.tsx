import { LeadExplorerTable } from "@/components/dashboard/LeadExplorerTable";
import { getLeads } from "../actions";

interface Lead {
  id: string;
  business_name: string;
  city: string;
  relevance_score: number;
  is_high_quality: boolean;
  category: string;
}

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-primary-container neon-text-glow">Prospección Sonora</h1>
      <LeadExplorerTable leads={leads as unknown as Lead[]} />
    </main>
  );
}
