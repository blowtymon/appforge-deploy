import { ChevronRight, ChevronDown, Box, Type, Layout, Menu, Square } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Component {
  id: string;
  type: string;
  name: string;
  properties: Record<string, any>;
  children?: Component[];
}

interface ComponentTreeProps {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const componentIcons: Record<string, any> = {
  page: Layout,
  header: Type,
  menu: Menu,
  button: Square,
  text: Type,
  box: Box,
};

export function ComponentTree({ components, selectedId, onSelect }: ComponentTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["root"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const renderComponent = (component: Component, level: number = 0) => {
    const Icon = componentIcons[component.type] || Box;
    const hasChildren = component.children && component.children.length > 0;
    const isExpanded = expanded.has(component.id);
    const isSelected = selectedId === component.id;

    return (
      <div key={component.id}>
        <div
          className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-accent/50 rounded-sm ${
            isSelected ? "bg-accent" : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onSelect(component.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(component.id);
              }}
              className="p-0 h-4 w-4"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{component.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">{component.type}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {component.children!.map((child) => renderComponent(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Component Hierarchy</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {components.map((component) => renderComponent(component))}
        </div>
      </ScrollArea>
    </div>
  );
}
