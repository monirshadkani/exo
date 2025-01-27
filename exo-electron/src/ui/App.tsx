import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import CookieButton from "./components/CookieButton";
import StatsDisplay from "./components/StatsDisplay";
import GeneralShop from "./components/GeneralShop";
import Signup from "./components/Signup";
import "./App.css";
import grandmaImage from "./assets/grandmother.png";
import grandmaSound from "./assets/grandmere.mp3";
import factoryImage from "./assets/factory.png";
import factorySound from "./assets/factory.mp3";
import mineImage from "./assets/mine.png";
import mineSound from "./assets/mine.mp3";

interface Shop {
  name: string;
  price: number;
  addedValue: number;
  inflationRate: number;
  imageUrl: string;
  audioSrc: string;
}

// GraphQL mutations
const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $clickValue: Int
    $totalCookies: Int
  ) {
    createUser(
      username: $username
      password: $password
      clickValue: $clickValue
      totalCookies: $totalCookies
    ) {
      id
      username
    }
  }
`;

const SAVE_GAME_STATE = gql`
  mutation SaveGameState(
    $totalCookies: Int!
    $clickValue: Int!
    $totalShops: Int!
    $shopPrice: Int!
  ) {
    saveGameState(
      totalCookies: $totalCookies
      clickValue: $clickValue
      totalShops: $totalShops
      shopPrice: $shopPrice
    ) {
      success
    }
  }
`;

// Apollo Client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const shops: Shop[] = [
  {
    name: "Grandma",
    price: 10,
    addedValue: 10,
    inflationRate: 20,
    imageUrl: grandmaImage,
    audioSrc: grandmaSound,
  },
  {
    name: "Factory",
    price: 100,
    addedValue: 50,
    inflationRate: 15,
    imageUrl: factoryImage,
    audioSrc: factorySound,
  },
  {
    name: "Mine",
    price: 500,
    addedValue: 200,
    inflationRate: 10,
    imageUrl: mineImage,
    audioSrc: mineSound,
  },
];

function App() {
  const [totalCookies, setTotalCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [totalShops, setTotalShops] = useState(0);
  const [shopPrices, setShopPrices] = useState<{ [key: string]: number }>({
    Grandma: shops[0].price,
    Factory: shops[1].price,
    Mine: shops[2].price,
  });
  const [shopCounts, setShopCounts] = useState<number[]>([0, 0, 0]); // Track how many of each shop are owned

  // GraphQL mutations
  const [createUser] = useMutation(CREATE_USER, { client });
  const [saveGameState] = useMutation(SAVE_GAME_STATE, { client });

  const handleCookieClick = () => {
    setTotalCookies(totalCookies + clickValue);
  };

  const handleShopClick = (shop: Shop, index: number) => {
    const currentPrice = shopPrices[shop.name];

    if (totalCookies >= currentPrice) {
      setTotalCookies(totalCookies - currentPrice);
      setTotalShops(totalShops + 1);

      // Update shop count
      const updatedShopCounts = [...shopCounts];
      updatedShopCounts[index] += 1; // Increase the count for the shop the user clicked on
      setShopCounts(updatedShopCounts);

      // Update shop price with inflation
      setShopPrices((prevPrices) => ({
        ...prevPrices,
        [shop.name]: Math.floor(currentPrice * (1 + shop.inflationRate / 100)),
      }));
    } else {
      alert(`Not enough cookies to buy a ${shop.name}!`);
    }
  };

  const submitHandler = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await createUser({
        variables: {
          username: data.username,
          password: data.password,
          clickValue: clickValue,
          totalCookies: totalCookies,
        },
      });
      console.log("User created:", response.data.createUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Calculate cookies per second
  useEffect(() => {
    const interval = setInterval(() => {
      let cookiesPerSecond = 0;
      shops.forEach((shop, index) => {
        cookiesPerSecond += shopCounts[index] * shop.addedValue;
      });
      setTotalCookies((prevCookies) => prevCookies + cookiesPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [shopCounts]);

  // Save game state
  useEffect(() => {
    const saveState = async () => {
      try {
        const response = await saveGameState({
          variables: {
            totalCookies,
            clickValue,
            totalShops,
            shopPrice: 0, // You can decide how to handle shopPrice
          },
        });
        console.log("Game state saved:", response.data.saveGameState);
      } catch (error) {
        console.error("Error saving game state:", error);
      }
    };

    saveState();
  }, [totalCookies, clickValue, totalShops]);

  return (
    <>
      <div>
        <CookieButton onClick={handleCookieClick} />
      </div>
      <div>
        <StatsDisplay
          totalCookies={totalCookies}
          totalShops={totalShops}
          clickValue={clickValue}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        {shops.map((shop, index) => (
          <GeneralShop
            key={index}
            price={shopPrices[shop.name]}
            addedValue={shop.addedValue}
            inflationRate={shop.inflationRate}
            onClick={() => handleShopClick(shop, index)}
            imageUrl={shop.imageUrl}
            audioSrc={shop.audioSrc}
          >
            <p>Owned: {shopCounts[index]}</p>{" "}
          </GeneralShop>
        ))}
      </div>
      <div>
        <Signup onSubmit={submitHandler} />
      </div>
    </>
  );
}

export default App;
