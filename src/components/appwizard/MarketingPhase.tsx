import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Smartphone, 
  Store,
  FileText,
  BarChart,
  Megaphone
} from "lucide-react";

interface MarketingData {
  marketResearch: string;
  competitors: { name: string; strengths: string; weaknesses: string }[];
  swag: { strengths: string; weaknesses: string; opportunities: string; threats: string };
  pricingModel: string;
  pricing: { tier: string; price: string; features: string[] }[];
  platforms: string[];
  channels: string[];
  businessPlan: string;
  marketingPlan: string;
  advertisingPlan: string;
}

interface MarketingPhaseProps {
  step: number;
  data: MarketingData;
  onDataChange: (data: Partial<MarketingData>) => void;
}

const platformOptions = [
  { id: "web", label: "Web Application" },
  { id: "ios", label: "iOS Mobile" },
  { id: "android", label: "Android Mobile" },
  { id: "desktop", label: "Desktop (Electron)" },
  { id: "pwa", label: "Progressive Web App" },
];

const channelOptions = [
  { id: "app-store", label: "Apple App Store" },
  { id: "play-store", label: "Google Play Store" },
  { id: "website", label: "Website" },
  { id: "social", label: "Social Media" },
  { id: "email", label: "Email Marketing" },
];

export function MarketingPhase({ step, data, onDataChange }: MarketingPhaseProps) {
  const steps = [
    { id: 11, title: "Market Research", icon: "📊" },
    { id: 12, title: "Competitors", icon: "🎯" },
    { id: 13, title: "SWOT", icon: "📈" },
    { id: 14, title: "Pricing Model", icon: "💰" },
    { id: 15, title: "Platforms", icon: "📱" },
    { id: 16, title: "Channels", icon: "🏪" },
    { id: 17, title: "Business Plan", icon: "📋" },
    { id: 18, title: "Marketing Plan", icon: "📣" },
    { id: 19, title: "Advertising Plan", icon: "📢" },
  ];

  const addCompetitor = () => {
    onDataChange({
      competitors: [
        ...data.competitors,
        { name: "", strengths: "", weaknesses: "" },
      ],
    });
  };

  const addPricingTier = () => {
    onDataChange({
      pricing: [
        ...data.pricing,
        { tier: "", price: "", features: [] },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap ${
              step === s.id
                ? "border-green-500 bg-green-500/10 text-green-600"
                : step > s.id
                ? "border-primary bg-primary/10"
                : "border-border bg-muted"
            }`}
          >
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm font-medium">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 11 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Market Research</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketResearch">
              Analyze your target market, size, and trends
            </Label>
            <Textarea
              id="marketResearch"
              placeholder="Market size, target audience demographics, growth trends..."
              value={data.marketResearch}
              onChange={(e) => onDataChange({ marketResearch: e.target.value })}
              rows={8}
            />
          </div>
        </div>
      )}

      {step === 12 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Competitors</h3>
          </div>
          <Button onClick={addCompetitor} className="mb-4">
            Add Competitor
          </Button>
          <div className="space-y-4">
            {data.competitors.map((competitor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">Competitor #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input
                      placeholder="Competitor name"
                      value={competitor.name}
                      onChange={(e) => {
                        const updated = [...data.competitors];
                        updated[index].name = e.target.value;
                        onDataChange({ competitors: updated });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Strengths</Label>
                      <Textarea
                        placeholder="What they do well..."
                        value={competitor.strengths}
                        rows={3}
                        onChange={(e) => {
                          const updated = [...data.competitors];
                          updated[index].strengths = e.target.value;
                          onDataChange({ competitors: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Weaknesses</Label>
                      <Textarea
                        placeholder="Their gaps and limitations..."
                        value={competitor.weaknesses}
                        rows={3}
                        onChange={(e) => {
                          const updated = [...data.competitors];
                          updated[index].weaknesses = e.target.value;
                          onDataChange({ competitors: updated });
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 13 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">SWOT Analysis</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Internal positive attributes..."
                  value={data.swag.strengths}
                  rows={4}
                  onChange={(e) =>
                    onDataChange({
                      swag: { ...data.swag, strengths: e.target.value },
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Internal limitations..."
                  value={data.swag.weaknesses}
                  rows={4}
                  onChange={(e) =>
                    onDataChange({
                      swag: { ...data.swag, weaknesses: e.target.value },
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="External positive possibilities..."
                  value={data.swag.opportunities}
                  rows={4}
                  onChange={(e) =>
                    onDataChange({
                      swag: { ...data.swag, opportunities: e.target.value },
                    })
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="External risks..."
                  value={data.swag.threats}
                  rows={4}
                  onChange={(e) =>
                    onDataChange({
                      swag: { ...data.swag, threats: e.target.value },
                    })
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 14 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Pricing Model</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Select Pricing Strategy</Label>
              <select
                className="w-full border rounded-md px-3 py-2 mt-2"
                value={data.pricingModel}
                onChange={(e) => onDataChange({ pricingModel: e.target.value })}
              >
                <option value="">Select a model</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="subscription">Subscription</option>
                <option value="one-time">One-time Purchase</option>
                <option value="usage-based">Usage-based</option>
              </select>
            </div>
            <Button onClick={addPricingTier} className="mt-4">
              Add Pricing Tier
            </Button>
            <div className="space-y-3 mt-4">
              {data.pricing.map((tier, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Tier Name</Label>
                        <Input
                          placeholder="e.g., Basic, Pro"
                          value={tier.tier}
                          onChange={(e) => {
                            const updated = [...data.pricing];
                            updated[index].tier = e.target.value;
                            onDataChange({ pricing: updated });
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Price</Label>
                        <Input
                          placeholder="$0, $9.99/mo"
                          value={tier.price}
                          onChange={(e) => {
                            const updated = [...data.pricing];
                            updated[index].price = e.target.value;
                            onDataChange({ pricing: updated });
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Key Features</Label>
                        <Input
                          placeholder="Comma separated"
                          value={tier.features.join(", ")}
                          onChange={(e) => {
                            const updated = [...data.pricing];
                            updated[index].features = e.target.value
                              .split(",")
                              .map((f) => f.trim());
                            onDataChange({ pricing: updated });
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 15 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Platforms</h3>
          </div>
          <div className="space-y-2">
            <Label>Select target platforms</Label>
            {platformOptions.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-2">
                <Checkbox
                  id={platform.id}
                  checked={data.platforms.includes(platform.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onDataChange({ platforms: [...data.platforms, platform.id] });
                    } else {
                      onDataChange({
                        platforms: data.platforms.filter((p) => p !== platform.id),
                      });
                    }
                  }}
                />
                <Label htmlFor={platform.id} className="font-normal cursor-pointer">
                  {platform.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 16 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Distribution Channels</h3>
          </div>
          <div className="space-y-2">
            <Label>Select distribution channels</Label>
            {channelOptions.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.id}
                  checked={data.channels.includes(channel.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onDataChange({ channels: [...data.channels, channel.id] });
                    } else {
                      onDataChange({
                        channels: data.channels.filter((c) => c !== channel.id),
                      });
                    }
                  }}
                />
                <Label htmlFor={channel.id} className="font-normal cursor-pointer">
                  {channel.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 17 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Business Plan Generation</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessPlan">
              Outline your business strategy, revenue model, and growth plan
            </Label>
            <Textarea
              id="businessPlan"
              placeholder="Executive summary, market opportunity, financial projections..."
              value={data.businessPlan}
              onChange={(e) => onDataChange({ businessPlan: e.target.value })}
              rows={10}
            />
          </div>
        </div>
      )}

      {step === 18 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Marketing Plan & Tracking</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketingPlan">
              Define your marketing strategy, tactics, and KPIs
            </Label>
            <Textarea
              id="marketingPlan"
              placeholder="Target audience, marketing channels, campaigns, metrics..."
              value={data.marketingPlan}
              onChange={(e) => onDataChange({ marketingPlan: e.target.value })}
              rows={10}
            />
          </div>
        </div>
      )}

      {step === 19 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Advertising Plan</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="advertisingPlan">
              Plan your paid advertising strategy and budget allocation
            </Label>
            <Textarea
              id="advertisingPlan"
              placeholder="Ad platforms, budget, targeting, creative strategy..."
              value={data.advertisingPlan}
              onChange={(e) => onDataChange({ advertisingPlan: e.target.value })}
              rows={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}
