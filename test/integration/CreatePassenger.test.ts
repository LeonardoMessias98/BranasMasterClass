import PassengerRepositoryDatabase from "../../src/application/infra/repository/PassengerRepositoryDatabase";
import PassengerRepository from "../../src/application/repository/PassengerRepository";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import Passenger from "../../src/domain/Passenger";

test("Deve cadastrar o passageiro", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "163.381.040-25",
  };

  const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
  const output = await usecase.execute(input);

  expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com cpf inválido", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "999.381.040-99",
  };

  const usecase = new CreatePassenger(new PassengerRepositoryDatabase());

  await expect(() => usecase.execute(input)).rejects.toThrow(
    new Error("Invalid CPF!")
  );
});

test("Deve obter o passageiro", async function () {
  const input = {
    name: "Leonardo Messias",
    email: "messias@email.com",
    document: "163.381.040-25",
  };

  const passengerRepository: PassengerRepository = {
    async save(passenger: Passenger): Promise<void> {},
    async get(passengerId: string): Promise<any> {
      return Passenger.create(input.name, input.email, input.document);
    },
  };

  const usecase1 = new CreatePassenger(passengerRepository);
  const output1 = await usecase1.execute(input);

  const usecase2 = new GetPassenger(passengerRepository);
  const output2 = await usecase2.execute({ passengerId: output1.passengerId });

  expect(output2.name).toBe("Leonardo Messias");
  expect(output2.email).toBe("messias@email.com");
  expect(output2.document).toBe("163.381.040-25");
});
