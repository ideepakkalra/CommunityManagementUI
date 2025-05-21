import { Outlet } from 'react-router';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div id='app'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </FluentProvider>
  );
}

export default App;
