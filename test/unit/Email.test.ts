import Email from "../../src/domain/Email";

test("Deve validar o email", function () {
  const email = new Email("messias@email.com");
  expect(email).toBeTruthy();
});

test("Não deve validar um email inválido", function () {
  const email = "messias@email";
  expect(() => new Email(email)).toThrow(new Error("Invalid email"));
});
