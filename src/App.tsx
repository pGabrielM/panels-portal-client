import { BrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/Auth/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesApp from './routes/RoutesApp';

function App() {

  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  )
}

export default App
