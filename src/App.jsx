import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
