import { AppShell } from "./components/layout/AppShell";
import { TaxHeader } from "./components/layout/TaxHeader";
import { ImportantNotes } from "./components/layout/ImportantNotes";
import { GainsCard } from "./components/harvesting/GainsCard";
import { useHarvesting } from "./context/HarvestingContext";

function App() {
  const { preHarvesting, postHarvesting, loading, error, savingsCount } = useHarvesting();

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground animate-pulse font-medium">Loading holdings...</p>
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64 text-destructive">
          <p className="font-medium">{error}</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TaxHeader />
      <ImportantNotes />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GainsCard
          title="Pre Harvesting"
          data={preHarvesting}
          variant="dark"
        />
        <GainsCard
          title="After Harvesting"
          data={postHarvesting}
          variant="blue"
          savings={savingsCount}
        />
      </div>

      <div className="bg-card rounded-xl border border-border p-6 min-h-[400px] flex items-center justify-center">
        {/* Placeholder for Table */}
        <p className="text-muted-foreground text-sm font-medium">Holdings Table Component (Coming in Task 6)</p>
      </div>
    </AppShell>
  );
}

export default App;
