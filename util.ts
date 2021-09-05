const replaceAt = (text: string, index: number, replacement: string) => {
  return (
    text.substr(0, index) +
    replacement +
    text.substr(index + replacement.length)
  );
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { replaceAt, randomInt };
