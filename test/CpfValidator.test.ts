import Cpf from "../src/Cpf";

test.each([
  "690.850.790-47",
  "313.420.300-60",
  "022.070.390-64",
  "170.182.140-09",
])("Deve verificar se um CPF é valido", function (value: string) {
  const cpf = new Cpf(value);
  expect(cpf.value).toBe(value);
});

test.each([
  "999.999.999-99",
  "170.182.140-08",
  "170.182.140-07",
  "170.182.120-09",
  "172.182.120-09",
])("Deve verificar se um CPF é invalido", function (cpf: string) {
  expect(() => new Cpf(cpf)).toThrow(new Error("Invalid CPF!"));
});
