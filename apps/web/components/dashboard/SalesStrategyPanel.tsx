import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target } from "lucide-react";

interface Suggestion {
  service: string;
  reason: string;
}

export const SalesStrategyPanel = ({ suggestions }: { suggestions: Suggestion[] }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No hay sugerencias de venta disponibles para este lead.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" /> Oportunidades Detectadas
      </h3>
      {suggestions.map((s, idx) => (
        <Card key={idx}>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> {s.service}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{s.reason}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
