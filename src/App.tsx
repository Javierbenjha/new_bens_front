import { AppRouter } from './routes';
import { Toaster } from 'sileo';
import 'sileo/styles.css';
import './index.css';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AppRouter />
    </>
  );
}

export default App;
