import { useState } from "react";
import { ComponentTree, Component } from "./ComponentTree";
import { PropertiesPanel } from "./PropertiesPanel";
import { BuildLogs, BuildLog } from "./BuildLogs";
import { ChatInterface, ChatMessage } from "./ChatInterface";
import { PreviewPane } from "./PreviewPane";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageBuilder() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI page builder. Tell me what kind of page you'd like to create, and I'll generate the components for you. Try commands like 'Create a React page with a header' or 'Add a navigation menu'.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [buildLogs, setBuildLogs] = useState<BuildLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedComponent = components.find((c) => findComponentById(c, selectedId));

  function findComponentById(component: Component, id: string | null): Component | null {
    if (component.id === id) return component;
    if (component.children) {
      for (const child of component.children) {
        const found = findComponentById(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  const addLog = (message: string, type: "info" | "success" | "error" = "info") => {
    const log: BuildLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setBuildLogs((prev) => [...prev, log]);
  };

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    addLog(`Processing request: ${message}`, "info");

    // Simulate AI generation
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      let newComponents: Component[] = [];
      let responseMessage = "";

      if (lowerMessage.includes("react page") || lowerMessage.includes("page")) {
        const pageId = `page-${Date.now()}`;
        newComponents = [
          {
            id: pageId,
            type: "page",
            name: "Main Page",
            properties: {
              backgroundColor: "#ffffff",
              padding: "20px",
            },
            children: [],
          },
        ];
        responseMessage = "Created a new React page component.";
        addLog("Generated Page component", "success");
      }

      if (lowerMessage.includes("header")) {
        const headerId = `header-${Date.now()}`;
        const headerComponent: Component = {
          id: headerId,
          type: "header",
          name: "Header",
          properties: {
            text: "My Application",
            backgroundColor: "#1a1a1a",
            textColor: "#ffffff",
            padding: "16px",
          },
        };

        if (components.length > 0 && components[0].type === "page") {
          setComponents((prev) => {
            const updated = [...prev];
            updated[0].children = [...(updated[0].children || []), headerComponent];
            return updated;
          });
        } else {
          newComponents = [...newComponents, headerComponent];
        }
        responseMessage += " Added a header component.";
        addLog("Generated Header component", "success");
      }

      if (lowerMessage.includes("menu") || lowerMessage.includes("nav")) {
        const menuId = `menu-${Date.now()}`;
        const menuComponent: Component = {
          id: menuId,
          type: "menu",
          name: "Navigation Menu",
          properties: {
            items: ["Home", "Products", "About", "Contact"],
            backgroundColor: "#f5f5f5",
            textColor: "#000000",
          },
        };

        if (components.length > 0 && components[0].type === "page") {
          setComponents((prev) => {
            const updated = [...prev];
            updated[0].children = [...(updated[0].children || []), menuComponent];
            return updated;
          });
        } else {
          newComponents = [...newComponents, menuComponent];
        }
        responseMessage += " Added a navigation menu.";
        addLog("Generated Menu component", "success");
      }

      if (lowerMessage.includes("button")) {
        const buttonId = `button-${Date.now()}`;
        const buttonComponent: Component = {
          id: buttonId,
          type: "button",
          name: "Button",
          properties: {
            text: "Click Me",
            backgroundColor: "#0066cc",
            textColor: "#ffffff",
            padding: "8px 16px",
          },
        };
        newComponents = [...newComponents, buttonComponent];
        responseMessage += " Added a button component.";
        addLog("Generated Button component", "success");
      }

      if (newComponents.length > 0) {
        setComponents((prev) => [...prev, ...newComponents]);
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseMessage || "I've processed your request. What would you like to add next?",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
      setIsGenerating(false);
      addLog("Build complete", "success");
    }, 1500);
  };

  const handlePropertyChange = (componentId: string, property: string, value: any) => {
    const updateComponent = (component: Component): Component => {
      if (component.id === componentId) {
        return {
          ...component,
          properties: { ...component.properties, [property]: value },
        };
      }
      if (component.children) {
        return {
          ...component,
          children: component.children.map(updateComponent),
        };
      }
      return component;
    };

    setComponents((prev) => prev.map(updateComponent));
    addLog(`Updated ${property} property`, "info");
  };

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <ComponentTree
            components={components}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <PreviewPane components={components} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <Tabs defaultValue="properties" className="h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
              <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
              <TabsTrigger value="logs" className="flex-1">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="flex-1 m-0">
              <PropertiesPanel
                component={selectedComponent || null}
                onPropertyChange={handlePropertyChange}
              />
            </TabsContent>
            <TabsContent value="chat" className="flex-1 m-0">
              <ChatInterface
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                isGenerating={isGenerating}
              />
            </TabsContent>
            <TabsContent value="logs" className="flex-1 m-0">
              <BuildLogs logs={buildLogs} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
