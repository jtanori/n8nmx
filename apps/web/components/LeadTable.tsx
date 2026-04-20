import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Lead {
  id: string;
  name: string;
  city: string;
}

export const LeadTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Ciudad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
