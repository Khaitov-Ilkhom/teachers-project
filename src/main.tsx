import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/utils.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>,
)
