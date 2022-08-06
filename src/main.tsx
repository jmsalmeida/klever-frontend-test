import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home';
import { AddToken } from './pages/AddToken';
import { NotFound } from './pages/NotFound';
import { EditToken } from './pages/EditToken';

import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/add-token" element={<AddToken />} />
        <Route path="/edit-token/:tokenId" element={<EditToken />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
