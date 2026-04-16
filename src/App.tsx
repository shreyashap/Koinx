import { AppShell } from "./components/layout/AppShell";
import { TaxHeader } from "./components/layout/TaxHeader";
import { ImportantNotes } from "./components/layout/ImportantNotes";

function App() {
  return (
    <AppShell>
      <TaxHeader />
      <ImportantNotes />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Placeholder for Goals/Cards */}
        <div className="h-64 bg-card rounded-xl border border-border flex items-center justify-center">
          Pre-Harvesting Card Component
        </div>
        <div className="h-64 bg-blue-600 text-white rounded-xl flex items-center justify-center">
          After-Harvesting Card Component
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 min-h-[400px]">
        {/* Placeholder for Table */}
        <p className="text-center mt-20 text-muted-foreground">Holdings Table Component</p>
      </div>
    </AppShell>
  );
}

export default App;
