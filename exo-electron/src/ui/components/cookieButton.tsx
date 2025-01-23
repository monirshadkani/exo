import cookieImage from "../assets/cookie.png";
interface CookieButtonProps {
  onClick: () => void;
}

const CookieButton = ({ onClick }: CookieButtonProps) => {
  return (
    <button onClick={onClick}>
      <img src={cookieImage} />
    </button>
  );
};

export default CookieButton;
