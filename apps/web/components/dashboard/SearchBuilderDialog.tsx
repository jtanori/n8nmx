import React from 'react';
import { SearchBuilder } from './SearchBuilder';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSearchModal } from '@/lib/store';

export const SearchBuilderDialog = () => {
  const { isOpen, onClose } = useSearchModal();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-4xl">
        <DialogHeader>
          <DialogTitle>Configurar Nueva Misión de Prospección</DialogTitle>
        </DialogHeader>
        <SearchBuilder />
      </DialogContent>
    </Dialog>
  );
};
