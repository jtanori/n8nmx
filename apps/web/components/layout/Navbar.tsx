import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-64 right-0 glass-panel h-16 flex items-center justify-between px-6 border-b">
      <div className="flex-1" />
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2">
        <Plus size={18} /> Start New Regional Search
      </Button>
    </header>
  );
};
