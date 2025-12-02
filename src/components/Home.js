import React from 'react';
import Hero from './Hero';
import About from './About';
// import Events from './Events';
import News from './News';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            {/* <Events /> */}
            <News />
        </>
    );
};

export default Home;
