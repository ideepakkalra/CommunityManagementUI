import { Outlet } from 'react-router';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Message from './Message';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div id='app'>
        <Message />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </FluentProvider>
  );
}

export default App;
