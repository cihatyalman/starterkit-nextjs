export function getRange(length: number) {
  return Array.from({ length: length }, (_, i) => i);
}

export function getRandom({ min = 0, max = 1, isDecimal = true }) {
  const random = Math.random() * (max - min) + min;
  if (isDecimal) return random;
  return Math.floor(random);
}

export function fixedNumber(value?: number, decimals: number = 2): number {
  if (!value) return 0;
  const factor = Math.pow(10, decimals);
  const fixed = Math.round(value * factor) / factor;

  // Ondalık kısmı sıfırsa (örneğin "12.00"), tam sayı olarak döndür
  if (Number(fixed) % 1 === 0) return Math.trunc(Number(fixed));
  return fixed;
}

export function getStringFixedNumber(
  value: Nullable<number>,
  fractionDigits: number = 2,
): string {
  if (!value) return "0";
  const fixed = value.toFixed(fractionDigits);

  // Ondalık kısmı sıfırsa (örneğin "12.00"), tam sayı olarak döndür
  if (Number(fixed) % 1 === 0) return Math.trunc(Number(fixed)).toString();
  return fixed;
}
