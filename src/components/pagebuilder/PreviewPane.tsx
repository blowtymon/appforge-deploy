import { Component } from "./ComponentTree";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewPaneProps {
  components: Component[];
}

export function PreviewPane({ components }: PreviewPaneProps) {
  const renderComponent = (component: Component): JSX.Element => {
    const { type, properties, children } = component;

    const style: React.CSSProperties = {
      backgroundColor: properties.backgroundColor || undefined,
      color: properties.textColor || properties.color || undefined,
      padding: properties.padding || undefined,
      margin: properties.margin || undefined,
      fontSize: properties.fontSize || undefined,
      fontWeight: properties.fontWeight || undefined,
    };

    switch (type) {
      case "page":
        return (
          <div key={component.id} style={style} className="min-h-[400px] bg-background">
            {children?.map((child) => renderComponent(child))}
          </div>
        );
      case "header":
        return (
          <header key={component.id} style={style} className="p-4 border-b">
            <h1 className="text-2xl font-bold">{properties.text || "Header"}</h1>
          </header>
        );
      case "menu":
        return (
          <nav key={component.id} style={style} className="flex gap-4 p-4 border-b">
            {(properties.items || ["Home", "About", "Contact"]).map((item: string, i: number) => (
              <a key={i} href="#" className="hover:text-primary">
                {item}
              </a>
            ))}
          </nav>
        );
      case "button":
        return (
          <button
            key={component.id}
            style={style}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {properties.text || "Button"}
          </button>
        );
      case "text":
        return (
          <p key={component.id} style={style} className="p-2">
            {properties.text || "Text content"}
          </p>
        );
      case "box":
        return (
          <div key={component.id} style={style} className="border rounded-lg p-4">
            {children?.map((child) => renderComponent(child)) || (
              <p className="text-muted-foreground">Empty box</p>
            )}
          </div>
        );
      default:
        return (
          <div key={component.id} style={style} className="border border-dashed rounded p-2">
            {component.name}
            {children?.map((child) => renderComponent(child))}
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Preview</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No components yet. Start chatting to build your page.</p>
            </div>
          ) : (
            components.map((component) => renderComponent(component))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
