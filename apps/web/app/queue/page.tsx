import { QueueList } from "@/components/dashboard/QueueList";

// Simulamos la obtención de datos
const getQueries = async () => [
  { id: "1", term: "Agencia Aduanal", priority_order: 1 },
  { id: "2", term: "Logistics Centers", priority_order: 2 },
];

export default async function QueuePage() {
  const queries = await getQueries();
  
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary-container neon-text-glow">Active Queue</h1>
      <QueueList queries={queries} />
    </main>
  );
}
