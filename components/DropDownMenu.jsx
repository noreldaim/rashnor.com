"use client";
import React, { useState, useCallback } from "react";

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

const DropDownMenu = ({ isMenuOpen, scroll, onNavigate }) => {
  const [isContacts, setIsContacts] = useState(false);

  const scrollToFraction = useCallback((fraction, waypointIndex) => {
    if (scroll?.el) {
      smoothScrollTo(scroll.el, fraction);
      if (onNavigate) onNavigate(waypointIndex);
    }
  }, [scroll, onNavigate]);

  return (
    <div
      className={` fixed z-10 right-0 h-screen sm:w-1/2 md:w-1/6 flex flex-col justify-top items-center transition-all duration-300 ease-linear transform ${
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ backgroundColor: "#13083f", border: "1px solid white" }}
    >
      {isContacts && <img className="mt-7 fixed left-6 hover:cursor-pointer" onClick={()=>setIsContacts(false)} src="images/left_arrow.svg" alt="left arrow" width={35}></img>}
      {!isContacts ? (
        <>
          <div
            onClick={() => scrollToFraction(0, 0)}
            className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500 ml-12 mt-24 hover:cursor-pointer"
          >
            {" "}
            <b>Home</b>
          </div>
          <div
            onClick={() => scrollToFraction(0.252, 1)}
            className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500 ml-12 mt-4 hover:cursor-pointer"
          >
            {" "}
            <b>About</b>
          </div>
          <div
            onClick={() => scrollToFraction(0.500, 2)}
            className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500 ml-12 mt-4 hover:cursor-pointer"
          >
            {" "}
            <b>Skills</b>
          </div>
          <div
            onClick={() => scrollToFraction(0.788, 3)}
            className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500  ml-12 mt-4 hover:cursor-pointer"
          >
            {" "}
            <b>Terminal</b>
          </div>
          <div
            onClick={() => {
              setIsContacts(true);
            }}
            className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500  ml-12 mt-4 hover:cursor-pointer"
          >
            {" "}
            <b>Contact</b>
          </div>
        </>
      ) : (
        <>
        <a
          className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500  ml-12 mt-24 hover:cursor-pointer"
          href="https://www.linkedin.com/in/rashmed/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <b>Linkedin</b>
        </a>
        <a
          className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500  ml-12 mt-4 hover:cursor-pointer"
          href="https://github.com/Rasheednour"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <b>Github</b>
        </a>
        <a
          className="font-montserrat text-2xl text-white mr-10 hover:text-indigo-500  ml-12 mt-4 hover:cursor-pointer"
          href="mailto:r.noreldaim@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <b>Email</b>
        </a>
        </>
        
      )}
    </div>
  );
};

export default DropDownMenu;
