/**
 * How to derive?
 * by try and error i got that 0.022 difference is equal to 5.17 kms
 * so by that relation i made this equation
 */
exports.getLatLongDifferenceFromKms = (kms) =>
  ((0.022 * kms) / 5.17).toFixed(2);
