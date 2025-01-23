import cookieImage from "../assets/cookie.png";
interface CookieButtonProps {
  onClick: () => void;
}

const CookieButton = ({ onClick }: CookieButtonProps) => {
  return (
    <button
      className="w-32 h-32 p-0 border-none rounded-full shadow-lg flex items-center justify-center transform active:scale-90 transition duration-150"
      onClick={onClick}
    >
      <img className="border-none" src={cookieImage} />
    </button>
  );
};

export default CookieButton;
