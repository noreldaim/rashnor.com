'use client'
import React, {useState} from 'react'
import "@styles/globals.css";
import dynamic from 'next/dynamic';
import UserInterface from '@components/UserInterface';
import NavigationOverlay from '@components/NavigationOverlay';

const MainCanvas = dynamic(() => import('@components/MainCanvas'), {
  ssr: false,
});

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exitLandingPage, setExitLandingPage] = useState(false);
  const [scroll, setScroll] = useState(null);
  const [autoShowProjects, setAutoShowProjects] = useState(false);

  const onNavigate = (waypointIndex) => {
    if (waypointIndex === 3) {
      setAutoShowProjects(true);
    } else {
      setAutoShowProjects(false);
    }
  };

  return (
    <div className='app w-screen h-screen'  >
        <UserInterface isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} exitLandingPage={exitLandingPage} setExitLandingPage={setExitLandingPage} scroll={scroll} onNavigate={onNavigate}/>
        <MainCanvas setScroll={setScroll} autoShowProjects={autoShowProjects}/>
        <NavigationOverlay scroll={scroll} onNavigate={onNavigate}/>
    </div>
  )
}

export default Home
