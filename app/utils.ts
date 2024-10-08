export const sliceAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  let truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    truncatedText = truncatedText.slice(0, lastSpaceIndex);
  }

  return truncatedText + "...";
};

export const dateToTimestamp = (dateString: string): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const dateObject = new Date(year, month - 1, day);
  return dateObject.getTime() / 1000;
};

export const isDateAtLeastOneWeekInFuture = (dateString: string): boolean => {
  const oneWeekInSeconds = 60 * 60 * 24 * 7;

  const inputDateInTimestamp = dateToTimestamp(dateString);

  const todayTimestamp = new Date().getTime() / 1000;

  return inputDateInTimestamp - todayTimestamp >= oneWeekInSeconds;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
