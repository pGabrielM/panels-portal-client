import AuthProvider from './contexts/Auth/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesApp from './routes/RoutesApp';
import DataProvider from './contexts/Auth/Data/DataProvider';

function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <RoutesApp />
      </DataProvider>
    </AuthProvider>
  )
}

export default App
