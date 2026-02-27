import { AppNavigationProvider } from './context/AppNavigationContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AppNavigationProvider>
      <AppRoutes />
    </AppNavigationProvider>
  );
}

export default App;
