import { Outlet } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';

function App() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <Header />
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default App;
