// @ts-nocheck

function hasAllDigitEquals(cpf) {
  return cpf.split("").every((digit) => digit === cpf[0]);
}

function isValidLength(cpf) {
  return cpf.length !== 11;
}

function clean(cpf) {
  return cpf.replace(/\D/g, "");
}

function extractCheckDigit(cpf: string) {
  return cpf.slice(9);
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;

  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }

  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function validate(cpf: string) {
  cpf = clean(cpf);
  if (isValidLength(cpf)) return false;
  if (hasAllDigitEquals(cpf)) return false;

  const dg1 = calculateDigit(cpf, 10);
  const dg2 = calculateDigit(cpf, 11);

  return extractCheckDigit(cpf) == `${dg1}${dg2}`;
}
