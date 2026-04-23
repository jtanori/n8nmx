import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from 'lucide-react';

interface Lead {
  business_name: string;
  city: string;
}

interface Suggestion {
  service: string;
  reason: string;
  pitch: string;
}

export const PitchGenerator = ({ lead, suggestion }: { lead: Lead; suggestion: Suggestion }) => {
  const [copied, setCopied] = useState(false);

  const generatedPitch = suggestion.pitch
    .replace('{business_name}', lead.business_name)
    .replace('{city}', lead.city);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="glass-panel">
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm text-foreground">{generatedPitch}</p>
        <Button onClick={handleCopy} className="w-full glow-button" variant="outline">
          {copied ? "¡Copiado!" : <><Copy className="mr-2 h-4 w-4" /> Copiar Pitch</>}
        </Button>
      </CardContent>
    </Card>
  );
};
