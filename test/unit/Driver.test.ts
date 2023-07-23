import Driver from "../../src/domain/Driver";

test("Deve criar um motorista", function () {
  const driver = Driver.create(
    "Leonardo Messias",
    "messias@email.com",
    "163.381.040-25",
    "AAA9999"
  );

  expect(driver.driverId).toBeDefined();
  expect(driver.name).toBe("Leonardo Messias");
  expect(driver.email.value).toBe("messias@email.com");
  expect(driver.document.value).toBe("163.381.040-25");
  expect(driver.carPlate.value).toBe("AAA9999");
});

test("Não pode criar motorista com cpf inválido", function () {
  expect(() =>
    Driver.create(
      "Leonardo Messias",
      "messias@email.com",
      "163.381.040-2X",
      "AAA9999"
    )
  ).toThrow(new Error("Invalid CPF!"));
});

test("Não pode criar motorista com email inválido", function () {
  expect(() =>
    Driver.create(
      "Leonardo Messias",
      "messiasemail.com",
      "163.381.040-25",
      "AAA9999"
    )
  ).toThrow(new Error("Invalid email"));
});

test("Não pode criar motorista com place do carro inválida", function () {
  expect(() =>
    Driver.create(
      "Leonardo Messias",
      "messias@email.com",
      "163.381.040-25",
      "AAAAA99"
    )
  ).toThrow(new Error("Invalid car plate"));
});
