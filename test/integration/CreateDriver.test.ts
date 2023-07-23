import DriverRepositoryDatabase from "../../src/application/infra/repository/DriverRepositoryDatabase";
import DriverRepository from "../../src/application/repository/DriverRepository";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import Driver from "../../src/domain/Driver";

test("Deve cadastrar o motorista", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "163.381.040-25",
    carPlate: "AAA9999",
  };

  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute(input);

  expect(output.driverId).toBeDefined();
});

test("Não deve cadastrar o motorista com cpf inválido", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "999.381.040-99",
    carPlate: "AAA9999",
  };

  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  await expect(() => usecase.execute(input)).rejects.toThrow(
    new Error("Invalid CPF!")
  );
});

test("Deve obter o motorista", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "163.381.040-25",
    carPlate: "AAA9999",
  };

  const driverRepository: DriverRepository = {
    async save(driver: Driver): Promise<void> {},
    async get(driverId: string): Promise<any> {
      return Driver.create(
        input.name,
        input.email,
        input.document,
        input.carPlate
      );
    },
  };

  const usecase1 = new CreateDriver(driverRepository);
  const output1 = await usecase1.execute(input);

  const usecase2 = new GetDriver(driverRepository);
  const output2 = await usecase2.execute({ driverId: output1.driverId });

  expect(output2.name).toBe("Leonardo Messias");
  expect(output2.email).toBe("messias@email.com");
  expect(output2.document).toBe("163.381.040-25");
  expect(output2.carPlate).toBe("AAA9999");
});
