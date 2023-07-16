// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import crypto from "crypto";
import pgp from "pg-promise";
import { validate } from "./CpfValidator";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/passengers", async function (req, res) {
  try {
    const connection = pgp()(
      "postgres://postgres:123@172.17.0.2:5432/postgres"
    );
    const passengerID = crypto.randomUUID();
    if (!validate(req.body.document)) throw new Error("Invalid cpf");
    await connection.query(
      "insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)",
      [passengerID, req.body.name, req.body.email, req.body.document]
    );
    await connection.$pool.end();
    res.json({
      passengerID,
    });
  } catch (e: any) {
    res.status(422).send(e.message);
  }
});

app.get("/passengers/:passengerID", async function (req, res) {
  const connection = pgp()("postgres://postgres:123@172.17.0.2:5432/postgres");
  const [passengerData] = await connection.query(
    "select * from cccat12.passenger where passenger_id = $1",
    [req.params.passengerID]
  );
  await connection.$pool.end();
  res.json(passengerData);
});

app.post("/drivers", async function (req, res) {
  try {
    const connection = pgp()(
      "postgres://postgres:123@172.17.0.2:5432/postgres"
    );
    const driverId = crypto.randomUUID();
    if (!validate(req.body.document)) throw new Error("Invalid cpf");
    await connection.query(
      "insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)",
      [
        driverId,
        req.body.name,
        req.body.email,
        req.body.document,
        req.body.carPlate,
      ]
    );
    await connection.$pool.end();
    res.json({
      driverId,
    });
  } catch (e: any) {
    res.status(422).send(e.message);
  }
});

app.get("/drivers/:driverId", async function (req, res) {
  const connection = pgp()("postgres://postgres:123@172.17.0.2:5432/postgres");
  const [driverData] = await connection.query(
    "select * from cccat12.driver where driver_id = $1",
    [req.params.driverId]
  );
  await connection.$pool.end();
  res.json({
    driverId: driverData.driver_id,
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    carPlate: driverData.car_plate,
  });
});

app.listen(3000);
