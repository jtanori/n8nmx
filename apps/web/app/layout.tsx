import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBuilderDialog } from "@/components/dashboard/SearchBuilderDialog";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col">
          <Navbar />
          <main className="pt-16 p-6">
            {children}
          </main>
        </div>
        <SearchBuilderDialog />
      </body>
    </html>
  );
}
