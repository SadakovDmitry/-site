import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import NewsPage from './components/NewsPage';
import EventsPage from './components/EventsPage';
import TestPage from './components/TestPage';
import EventDetailPage from './components/EventDetailPage';
// Local font files (Proxima Nova)
import ProximaRegular from './Proxima Nova/proximanova_regular.ttf';
import ProximaSemibold from './Proxima Nova/proximanova_bold.otf';
import ProximaBold from './Proxima Nova/proximanova_extrabold.otf';

const AppContainer = styled.div`
  font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
  overflow-x: hidden;
  background: #000;
  color: #fff;
`;

const GlobalStyles = createGlobalStyle`
  :root {
    --container-w: min(1600px, 94vw);
    --container-pad: 8px;
    --container-x: calc((100vw - var(--container-w)) / 2 + var(--container-pad));
    --page-x: var(--container-x);
  }
  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaSemibold}) format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Proxima Nova';
    src: url(${ProximaBold}) format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #000;
    color: #fff;
    font-family: 'Proxima Nova', 'Raleway', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  .space-gradient {
    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  }

  .cosmic-glow {
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
