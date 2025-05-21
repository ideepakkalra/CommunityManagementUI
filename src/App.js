import { Outlet } from 'react-router';
import './App.css';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <div id='app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
