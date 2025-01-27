interface GeneralShopProps {
  price: number;
  onClick: () => void;
  addedValue: number;
  inflationRate: number;
  imageUrl: string;
  audioSrc: string;
  children?: React.ReactNode;
}

const GeneralShop = ({
  price,
  onClick,
  addedValue,
  inflationRate,
  imageUrl,
  audioSrc,
  children,
}: GeneralShopProps) => {
  const handleClick = () => {
    const audio = new Audio(audioSrc);
    audio.play();
    onClick();
  };
  return (
    <div
      className="h-64 w-64 border-2 border-gray-300 shadow-lg rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex flex-col items-center justify-center p-4"
      onClick={handleClick}
    >
      <img src={imageUrl} className="mb-2 h-32 w-32" />
      <span className="block text-center">Price: {price} cookies.</span>
      <span className="block text-center">
        Adds {addedValue} cookies per second!
      </span>
      <span>inflationRate: {inflationRate}%</span>
      <div>{children}</div>
    </div>
  );
};

export default GeneralShop;
