import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from './context/SearchContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SearchProvider>
        <App/>
      </SearchProvider>
    </BrowserRouter>
  </QueryClientProvider>
);