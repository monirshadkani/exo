interface StatsDisplayProps {
  cookies: number;
  autoClickers: number;
  clickValue: number;
}

const StatsDisplay = ({
  cookies,
  autoClickers,
  clickValue,
}: StatsDisplayProps) => {
  return (
    <div>
      <p>Cookies: {cookies}</p>
      <p>Auto-Clickers: {autoClickers}</p>
      <p>Click Value: {clickValue}</p>
    </div>
  );
};

export default StatsDisplay;
