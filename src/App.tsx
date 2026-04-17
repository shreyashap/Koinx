import { AppShell } from "./components/layout/AppShell";
import { TaxHeader } from "./components/layout/TaxHeader";
import { ImportantNotes } from "./components/layout/ImportantNotes";
import { GainsCard } from "./components/harvesting/GainsCard";
import { HoldingsTable } from "./components/harvesting/HoldingsTable";
import { useHarvesting } from "./context/HarvestingContext";
import { AlertCircle, Loader2 } from "lucide-react";

function App() {
  const { preHarvesting, postHarvesting, loading, error, savingsCount } = useHarvesting();

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-gray-400 font-medium animate-pulse">Fetching your holdings...</p>
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4 max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors"
          >
            Try Again
          </button>
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

      <div className="mb-10">
        <HoldingsTable />
      </div>
    </AppShell>
  );
}

export default App;
