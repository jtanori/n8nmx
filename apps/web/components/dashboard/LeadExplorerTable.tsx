import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, Stethoscope, Factory } from 'lucide-react';

interface Lead {
  id: string;
  business_name: string;
  city: string;
  relevance_score: number;
  is_high_quality: boolean;
  category: string;
}

export const LeadExplorerTable = ({ leads }: { leads: Lead[] }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Logistics': return <Truck className="w-4 h-4" />;
      case 'Health': return <Stethoscope className="w-4 h-4" />;
      case 'Manufacturing': return <Factory className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02]">
            <th className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business</th>
            <th className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
            <th className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Score</th>
            <th className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quality</th>
            <th className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-white/10 flex items-center justify-center text-primary">
                    {getCategoryIcon(lead.category)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{lead.business_name}</div>
                    <div className="text-xs text-muted-foreground">{lead.category}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-muted-foreground flex items-center gap-2 pt-8">
                <MapPin className="w-4 h-4" /> {lead.city}
              </td>
              <td className="py-4 px-6 text-center font-bold text-primary">{lead.relevance_score}</td>
              <td className="py-4 px-6">
                <Badge variant={lead.is_high_quality ? "default" : "secondary"}>
                  {lead.is_high_quality ? "High" : "Standard"}
                </Badge>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/audit/${lead.id}`}>
                    <Button variant="ghost" size="sm" className="hover:text-primary">Audit</Button>
                  </Link>
                  <Button size="sm" className="glow-button bg-primary text-black font-bold">Pitch</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
