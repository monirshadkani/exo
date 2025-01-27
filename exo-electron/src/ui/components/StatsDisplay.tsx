interface StatsDisplayProps {
  totalCookies: number;
  totalShops: number;
  clickValue: number;
}

const StatsDisplay = ({
  totalCookies,
  totalShops,
  clickValue,
}: StatsDisplayProps) => {
  return (
    <div>
      <p>Cookies: {totalCookies}</p>
      <p>Auto-Clickers: {totalShops}</p>
      <p>Click Value: {clickValue}</p>
    </div>
  );
};

export default StatsDisplay;
