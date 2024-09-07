const express = require("express");
const prisma = require("./prisma");
const app = express();
const PORT = 3000;

// body parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));
// error handling middleware
app.use((error, req, res, next) => {
  res.status(res.status || 500).send({ error: error });
});

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

// Get Restaurant
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});

// Get Reservation
app.get("/api/customers", async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findMany();
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

// POST Reservation
app.get("/api/customers/:customerId/reservations", async (req, res, next) => {
  try {
    const { restaurantId, date, partyCount } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        restaurantId,
        date,
        partyCount,
      },
    });
    res.sendStatus(201);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});
// DELETE Reservation
app.delete("/api/customers/:customerId/reservations/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const exists = await prisma.reservation.findFirst({ where: { id } });
    if (!exists) {
      return next({
        status: 404,
        message: `Unable to find reservation with id of ${id}`,
      });
    }
    await prisma.reservation.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
