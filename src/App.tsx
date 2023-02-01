import RoutesApp from './routes/RoutesApp';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/Auth/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
