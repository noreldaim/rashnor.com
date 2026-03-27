'use client'
import React, {useState, useCallback} from 'react'
import "@styles/globals.css";
import dynamic from 'next/dynamic';
import UserInterface from '@components/UserInterface';
import NavigationOverlay from '@components/NavigationOverlay';

const MainCanvas = dynamic(() => import('@components/MainCanvas'), {
  ssr: false,
});

function smoothScrollTo(scrollEl, targetOffset, duration = 1200) {
  const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
  const startTop = scrollEl.scrollTop;
  const endTop = targetOffset * maxScroll;
  const delta = endTop - startTop;
  const startTime = performance.now();
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    scrollEl.scrollTop = startTop + delta * easeInOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

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

  const onSignIn = useCallback(() => {
    if (scroll?.el) {
      smoothScrollTo(scroll.el, 1.0, 1500);
    }
  }, [scroll]);

  return (
    <div className='app w-screen h-screen'  >
        <UserInterface isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} exitLandingPage={exitLandingPage} setExitLandingPage={setExitLandingPage} scroll={scroll} onNavigate={onNavigate}/>
        <MainCanvas setScroll={setScroll} autoShowProjects={autoShowProjects} onSignIn={onSignIn}/>
        <NavigationOverlay scroll={scroll} onNavigate={onNavigate}/>
    </div>
  )
}

export default Home
