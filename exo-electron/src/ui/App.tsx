import { useState, useEffect } from "react";
import CookieButton from "./components/cookieButton";
import StatsDisplay from "./components/StatsDisplay";
import GrandmaShop from "./components/GrandmaShop";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [shopValue, setShopValue] = useState(10);
  const grandmaAddedValue = 10; //everygrandma adds 10

  const handleCookieClick = async () => {
    const response = await window.electron.isClicked();
    setCookies(cookies + clickValue);
    console.log(response);
  };

  const handleShopClick = () => {
    if (cookies >= shopValue) {
      setCookies(cookies - shopValue);
      setAutoClickers(autoClickers + 1); //increase the number of grandmas by 1 when you buy a grandma
      setShopValue(shopValue + 10); // inncrease the cost for the next purchase
    } else {
      alert("Not enough cookies to buy a grandma!");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(
        (prevCookies) => prevCookies + autoClickers * grandmaAddedValue
      );
    }, 1000); // add cookies every second

    return () => clearInterval(interval);
  });

  // save the game state whenever it changes
  useEffect(() => {
    window.electron.saveGameState(cookies, clickValue, autoClickers);
  }, [cookies, clickValue, autoClickers]);
  return (
    <>
      <div>
        <CookieButton onClick={handleCookieClick}></CookieButton>
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
      <div className="flex-1 flex items-center justify-center">
        <GrandmaShop
          addedValue={grandmaAddedValue}
          shopValue={shopValue}
          onClick={handleShopClick}
        />
      </div>
    </>
  );
}

export default App;
