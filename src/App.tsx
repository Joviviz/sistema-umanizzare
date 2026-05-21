import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/theme.css';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function AppRoutes() {
  const location = useLocation();

  // Rotas que NÃO devem ter o menu lateral nem o rodapé
  const rotasSemNavegacao = ['/login', '/register'];
  const esconderNavegacao = rotasSemNavegacao.includes(location.pathname);

  return (
    <div className="app-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Só mostra o Header se não for login ou cadastro */}
      {!esconderNavegacao && <Header />}

      {/* Container do conteúdo principal */}
      <div 
        style={{ 
          flex: 1, 
          // Se for login/cadastro, a margem esquerda zera. Se não, assume os 300px da barra.
          marginLeft: esconderNavegacao ? '0px' : '300px', 
          display: 'flex',
          flexDirection: 'column', /* CORRIGIDO: Agora com aspas certinhas */
          width: '100%'
        }}
      >
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>

        {/* Só mostra o Footer se não for login ou cadastro */}
        {!esconderNavegacao && <Footer />}
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}