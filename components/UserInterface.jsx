import React from "react";
import GithubButton from "./GithubButton";
import DropDownMenuButton from "./DropDownMenuButton";
import DropDownMenu from "./DropDownMenu";
import Logo from "./Logo";
import LandingPage from "./LandingPage";
const UserInterface = ({ isMenuOpen, setIsMenuOpen, exitLandingPage, setExitLandingPage, scroll, onNavigate }) => {
  return (
    <div>
      <GithubButton/>
      <DropDownMenu isMenuOpen={isMenuOpen} scroll={scroll} onNavigate={onNavigate}/>
      <DropDownMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Logo/>
      {!exitLandingPage && <LandingPage setExitLandingPage={setExitLandingPage}/>}
    </div>
  );
};

export default UserInterface;
