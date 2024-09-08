const express = require("express");
const prisma = require("./prisma");
const app = express();
const PORT = 3001;

// body parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));


// GET

// Get Customer
app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});
// get specific customer
app.get("/api/customers/:customerId", async (req, res, next) => {
    try {
    const id = +req.params.customerId;
    const exists = await prisma.customer.findFirst({ where: { id } });
    if (!exists) {
        return next({
        status: 404,
        message: `Unable to find customer with customerId of ${id}`,
        });
    }
      res.json(exists);
    } catch (error) {
      next(error);
    }
  });

// Get Restaurant
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});

// get specific restaurant
app.get("/api/restaurants/:restaurantId", async (req, res, next) => {
    try {
    const id = +req.params.restaurantId;
    const exists = await prisma.restaurant.findFirst({ where: { id } });
    if (!exists) {
        return next({
        status: 404,
        message: `Unable to find restaurant with restaurantId of ${id}`,
        });
    }
      res.json(exists);
    } catch (error) {
      next(error);
    }
  });

// Get Reservation
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findMany();
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

// get specific reservation
app.get("/api/reservations/:reservationId", async (req, res, next) => {
    try {
    const id = +req.params.reservationId;
    const exists = await prisma.reservation.findFirst({ where: { id } });
    if (!exists) {
        return next({
        status: 404,
        message: `Unable to find reservation with reservationId of ${id}`,
        });
    }
      res.json(exists);
    } catch (error) {
      next(error);
    }
  });

// POST Reservation
app.post("/api/customers/:customerId/reservations", async (req, res, next) => {
  try {
    // verify customer exists
    const customerId = +req.params.customerId;
    const customerExists = await prisma.customer.findFirst({ where: { id: customerId } });
    if (!customerExists) {
        return next({
        status: 404,
        message: `Unable to find customer with customerId of ${customerId}`,
        });
    }
    // deconstruct body and create new reservation
    const { restaurantId, date, partyCount } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        restaurantId,
        date,
        partyCount,
        customerId
      },
    });
    //send
    res.sendStatus(201);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});
// DELETE Reservation
app.delete("/api/customers/:customerId/reservations/:id", async (req, res, next) => {
  try {
    // verify customer exists
    const customerId = +req.params.customerId;
    const customerExists = await prisma.customer.findFirst({ where: { id: customerId } });
    if (!customerExists) {
        return next({
        status: 404,
        message: `Unable to find customer with customerId of ${customerId}`,
        });
    }
    // verify reservation exists
    const reservationId = +req.params.id;
    const reservationExists = await prisma.reservation.findFirst({ where: { id: reservationId } });
    if (!reservationExists) {
        return next({
        status: 404,
        message: `Unable to find reservation with id of ${reservationId}`,
        });
    }
    //send
    await prisma.reservation.delete({ where: { id: reservationId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
// error handling middleware, which MUST BE AFTER EVERYTHING BUT LISTEN
app.use((error, req, res, next) => {
    console.log("MADE IT TO ERROR HANDLER")
    res.status(Math.floor(res.status) || 500).send({ error: error });
  });
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
