import Passenger from "../../src/domain/Passenger";

test("Deve criar um passageiro", function () {
  const passenger = Passenger.create(
    "Leonardo Messias",
    "messias@email.com",
    "163.381.040-25"
  );
  expect(passenger.passengerId).toBeDefined();
  expect(passenger.name).toBe("Leonardo Messias");
  expect(passenger.email.value).toBe("messias@email.com");
  expect(passenger.document.value).toBe("163.381.040-25");
});

test("Não pode criar passageiro com cpf inválido", function () {
  expect(() =>
    Passenger.create("Leonardo Messias", "messias@email.com", "163.381.040-2X")
  ).toThrow(new Error("Invalid CPF!"));
});

test("Não pode criar passageiro com email inválido", function () {
  expect(() =>
    Passenger.create("Leonardo Messias", "messias@email", "163.381.040-25")
  ).toThrow(new Error("Invalid email"));
});
