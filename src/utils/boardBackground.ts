export const getDarkenedBoardBackground = (background: string) => {
  const overlay = "linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))";
  return `${overlay}, ${background}`;
};