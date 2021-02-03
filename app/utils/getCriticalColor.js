import { colors } from "../colors";

/**
 * @Doubt
 */
export const getCriticalColor = (placeCrimes, totalCrimes) => {
  const percentageCrimes = (+placeCrimes / +totalCrimes) * 100;
  if (percentageCrimes === 0 || isNaN(percentageCrimes)) {
    return colors.safe;
  } else if (percentageCrimes <= 5) {
    return colors.moderate;
  } else if (percentageCrimes <= 10) {
    return colors.danger;
  } else {
    return colors.critical;
  }
};
