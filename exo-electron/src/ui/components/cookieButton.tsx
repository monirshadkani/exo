import cookieImage from "../assets/cookie.png";
import clickSound from "../assets/cri.mp3";

interface CookieButtonProps {
  onClick: () => void;
}

const CookieButton = ({ onClick }: CookieButtonProps) => {
  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
    onClick();
  };
  return (
    <button
      className="w-32 h-32 p-0 border-none rounded-full shadow-lg flex items-center justify-center transform active:scale-90 transition duration-150"
      onClick={handleClick}
    >
      <img className="border-none" src={cookieImage} />
    </button>
  );
};

export default CookieButton;
