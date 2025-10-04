import { ReactNode, useState, useEffect } from "react";
import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DraggableCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  transparent?: boolean;
}

export const DraggableCard = ({ title, icon, children, defaultOpen = true, transparent = false }: DraggableCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={`w-full max-w-md shadow-lg ${transparent ? "bg-background/70 backdrop-blur-sm" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "auto",
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onMouseDown={handleMouseDown}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-secondary rounded"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </button>
              <CardTitle className="text-lg">
                {icon} {title}
              </CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
