import React from 'react';
import Hero from './Hero';
import About from './About';
// import Events from './Events';
import News from './News';
import Partners from './Partners';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            {/* <Events /> */}
            <News />
            <Partners />
        </>
    );
};

export default Home;
