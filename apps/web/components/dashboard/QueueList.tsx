import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical, Pause, Trash2, MapPin } from 'lucide-react';

interface SearchQuery {
  id: string;
  term: string;
  priority_order: number;
}

export const QueueList = ({ queries }: { queries: SearchQuery[] }) => {
  return (
    <ScrollArea className="h-[500px] w-full rounded-xl glass-panel p-2">
      <div className="space-y-2 p-2">
        {queries.map((query) => (
          <div key={query.id} className="grid grid-cols-[48px_80px_1fr_120px] gap-4 px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-lg items-center hover:bg-white/[0.05] hover:border-white/10 transition-colors group cursor-default relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_8px_rgba(0,242,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-center cursor-grab text-muted-foreground group-hover:text-foreground">
              <GripVertical size={20} />
            </div>
            
            <div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded border border-primary/30 bg-primary/10 text-primary font-bold text-sm">
                {String(query.priority_order).padStart(2, '0')}
              </span>
            </div>
            
            <div className="font-medium text-foreground truncate flex items-center gap-2">
              {query.term}
            </div>
            
            <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10">
                <Pause size={18} />
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
