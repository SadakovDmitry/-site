import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import News from './components/News';
import Partners from './components/Partners';
import Footer from './components/Footer';
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
        <AppContainer>
            <GlobalStyles />
            <Header />
            <Hero />
            <About />
            <Projects />
            <News />
            <Partners />
            <Footer />
        </AppContainer>
    );
}

export default App;
