import { validate } from "./CpfValidator";
import { v4 as uuid } from "uuid";

interface IPassenger {
  name: string;
  email: string;
  document: string;
}

export default class Passenger {
  public id: string;
  public name: string;
  public email: string;
  private document: string;

  constructor(passenger: IPassenger) {
    this.validateFields(passenger.name, passenger.email, passenger.document);

    this.name = passenger.name;
    this.email = passenger.email;
    this.document = passenger.document;
    this.id = this.generateUUIDTOKEN();
  }

  public getDocument() {
    return this.document;
  }

  private generateUUIDTOKEN() {
    return uuid();
  }

  private validateFields(name: string, email: string, document: string) {
    if (!name) throw new Error("Name is a required field");

    if (!email) throw new Error("Name is a required field");

    if (!document) throw new Error("Name is a required field");

    if (!validate(document)) throw new Error("Document is not valid");
  }
}
