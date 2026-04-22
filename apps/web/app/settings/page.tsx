import { SettingsForm } from "@/components/SettingsForm";

export default function SettingsPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ajustes</h1>
      <SettingsForm />
    </main>
  );
}
