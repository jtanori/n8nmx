import React from 'react';
import { Badge } from "@/components/ui/badge";

export const LeadBadge = ({ score }: { score: number }) => {
  const isHighRelevance = score >= 70;
  
  return (
    <Badge variant={isHighRelevance ? "default" : "secondary"}>
      {isHighRelevance ? "Alta Relevancia" : "Baja Relevancia"}
    </Badge>
  );
};
