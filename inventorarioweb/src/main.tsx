import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { TooltipProvider } from '@radix-ui/react-tooltip';
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './components/ui/sidebar.tsx';
import Header from './components/ui/header.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <TooltipProvider>
          <Sidebar />
          <Header />
        </TooltipProvider>
        <div className="ml-12 flex-1">
          <App />
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
