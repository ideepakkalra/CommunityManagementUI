import './App.css';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <div id='app'>
      <Header />
      <div className='app-main'>
        Main content Outer will come here
      </div>
      <Footer />
    </div>
  );
}

export default App;
