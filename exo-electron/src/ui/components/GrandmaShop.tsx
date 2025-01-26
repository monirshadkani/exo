import grandmaImage from "../assets/grandmother.png";
import grandmaSound from "../assets/grandmere.mp3";

interface grandmaShopProps {
  shopValue: number;
  onClick: () => void;
  addedValue: number;
}

const GrandmaShop = ({ shopValue, onClick, addedValue }: grandmaShopProps) => {
  const handleClick = () => {
    const audio = new Audio(grandmaSound);
    audio.play();
    onClick();
  };
  return (
    <div
      className="h-64 w-64 border-2 border-gray-300 shadow-lg rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex flex-col items-center justify-center p-4"
      onClick={handleClick}
    >
      <img src={grandmaImage} alt="Grandma" className="mb-2 h-32 w-32" />
      <span className="block text-center">Price: {shopValue} cookies.</span>
      <span className="block text-center">
        Adds {addedValue} cookies per second!
      </span>
    </div>
  );
};

export default GrandmaShop;
