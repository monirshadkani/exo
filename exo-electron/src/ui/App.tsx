import { useState, useEffect } from "react";
import CookieButton from "./components/cookieButton";
import StatsDisplay from "./components/StatsDisplay";

import "./App.css";

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  const handleClick = async () => {
    const response = await window.electron.isClicked();
    setCookies(cookies + clickValue);
    console.log(response);
  };

  // save the game state whenever it changes
  useEffect(() => {
    window.electron.saveGameState(cookies, clickValue, autoClickers);
  }, [cookies, clickValue, autoClickers]);
  return (
    <>
      <div>
        <CookieButton onClick={handleClick}></CookieButton>
      </div>
      <div>
        {
          <StatsDisplay
            cookies={cookies}
            autoClickers={autoClickers}
            clickValue={clickValue}
          ></StatsDisplay>
        }
      </div>
    </>
  );
}

export default App;
