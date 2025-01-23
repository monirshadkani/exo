import { useEffect, useState } from "react";
import CookieButton from "./components/cookieButton";
import StatsDisplay from "./components/StatsDisplay";

import "./App.css";

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  const handleClick = async () => {
    const response = await window.versions.isClicked();
    setCookies(cookies + clickValue);
    console.log(response);
  };

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
