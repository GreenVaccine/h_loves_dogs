export const handleIntegerValidation = (str: string, max?: number): string => {
  if (str === "") return "";
  const number = parseInt(str.replace(/\D/g, ""), 10);
  if (isNaN(number) || number < 0) {
    return "0";
  } else if (number > (max || 100)) {
    return `${max}` || "100";
  }
  return String(number);
};
