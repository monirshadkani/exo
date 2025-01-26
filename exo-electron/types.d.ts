type GameState = {
  cookies: number;
  clickValue: number;
  autoClickers: number;
  name: string;
};

interface Window {
  electron: {
    isClicked: () => Promise<string>;
    saveGameState: (
      cookies: number,
      clickValue: number,
      autoClickers: number
    ) => Promise<void>;
    loadGameState: (
      cookies: number,
      clickValue: number,
      autoClickers: number
    ) => Promise<void>;
  };
}
