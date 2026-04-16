import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HarvestingProvider } from './context/HarvestingContext.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <HarvestingProvider>
        <App />
      </HarvestingProvider>
    </TooltipProvider>
  </StrictMode>,
)
