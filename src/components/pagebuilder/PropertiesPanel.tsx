import { Component } from "./ComponentTree";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertiesPanelProps {
  component: Component | null;
  onPropertyChange: (componentId: string, property: string, value: any) => void;
}

export function PropertiesPanel({ component, onPropertyChange }: PropertiesPanelProps) {
  if (!component) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p className="text-sm">Select a component to view properties</p>
      </div>
    );
  }

  const handleChange = (property: string, value: any) => {
    onPropertyChange(component.id, property, value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Properties</h3>
        <p className="text-xs text-muted-foreground mt-1">{component.name}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {Object.entries(component.properties).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
              {typeof value === "string" && (
                key.toLowerCase().includes("color") ? (
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-20 h-9"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                ) : (
                  <Input
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )
              )}
              {typeof value === "number" && (
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(key, parseInt(e.target.value))}
                />
              )}
              {typeof value === "boolean" && (
                <Select
                  value={value.toString()}
                  onValueChange={(v) => handleChange(key, v === "true")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
