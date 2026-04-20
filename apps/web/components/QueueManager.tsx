'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface SearchQuery {
  id: string;
  term: string;
  priority_order: number;
}

export const QueueManager = ({ queries: initialQueries }: { queries: SearchQuery[] }) => {
  const [queries, setQueries] = useState(initialQueries);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(queries);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQueries(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="queue">
        {(provided) => (
          <ScrollArea className="h-[300px] border rounded-md p-4" {...provided.droppableProps} ref={provided.innerRef}>
            {queries.map((query, index) => (
              <Draggable key={query.id} draggableId={query.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                  >
                    <Card>
                      <CardContent className="p-3">
                        {query.term}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ScrollArea>
        )}
      </Droppable>
    </DragDropContext>
  );
};
