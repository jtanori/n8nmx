import { LeadTable } from "@/components/LeadTable";
import { getLeads } from "./actions";

interface Lead {
  id: string;
  business_name: string;
  city: string;
  is_high_quality: boolean;
  relevance_score: number;
}

export default async function Page() {
  const leads = await getLeads();
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prospección Sonora</h1>
      <LeadTable leads={leads as unknown as Lead[]} />
    </main>
  );
}
