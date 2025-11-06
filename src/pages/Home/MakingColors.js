function GetColors(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

function RandomNumber(min, max) {
  if (min < 0) return "The min is 0";

  if (max > 255) return "The max is 255";

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function MakingColors(data) {
  const toColorsCollection = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const r = RandomNumber(0, 255);
    const g = RandomNumber(0, 255);
    const b = RandomNumber(0, 255);

    const colors = GetColors(r, g, b);
    toColorsCollection.push(colors);
  }

  return toColorsCollection;
}
