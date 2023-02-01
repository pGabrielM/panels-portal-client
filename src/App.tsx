import RoutesApp from './routes/RoutesApp';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/Auth/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

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
