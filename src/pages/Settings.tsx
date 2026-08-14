import { Card, Button, Input, Select, PageHeader, FormSection } from "../components/ui";

export default function Settings({ darkMode, onToggleDark }: { darkMode: boolean; onToggleDark: () => void }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" subtitle="Application preferences and configuration" />
      <FormSection title="Appearance">
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
          </div>
          <button
            onClick={onToggleDark}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </FormSection>
      <FormSection title="Default Context">
        <div className="space-y-3">
          <Select label="Default Competition">
            <option>Betway Premiership</option>
            <option>Nedbank Cup</option>
          </Select>
          <Select label="Default Season">
            <option>2026/2027</option>
            <option>2025/2026</option>
          </Select>
        </div>
      </FormSection>
      <FormSection title="API Configuration">
        <div className="space-y-3">
          <Input label="API Base URL" defaultValue="https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net" />
          <Input label="API Key" type="password" placeholder="Enter your API key" />
          <Button variant="primary">Save Configuration</Button>
        </div>
      </FormSection>
      <FormSection title="About">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Football Intelligence v1.0.0</p>
          <p>A private football analysis platform.</p>
        </div>
      </FormSection>
    </div>
  );
}
