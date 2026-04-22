import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeadBadge } from "./LeadBadge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface Lead {
  id: string;
  business_name: string;
  city: string;
  is_high_quality: boolean;
  relevance_score: number;
}

export const LeadTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Relevancia</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.business_name}</TableCell>
            <TableCell>{lead.city}</TableCell>
            <TableCell>
                <LeadBadge score={lead.relevance_score} />
            </TableCell>
            <TableCell>
              <Link href={`/audit/${lead.id}`}>
                <Button variant="ghost" size="sm">Auditar</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
