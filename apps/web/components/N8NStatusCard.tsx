import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const N8NStatusCard = ({ isActive }: { isActive: boolean }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>N8N Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isActive ? 'Online' : 'Offline'}</span>
        </div>
      </CardContent>
    </Card>
  );
};
