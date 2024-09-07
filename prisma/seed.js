const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const CreateCustomers = async () => {
    const customers = [
      { name: "Katliyn Kane" },
      { name: "Mark Hammer" },
      { name: "Leoroy Jenkins" },
      { name: "Sally Mae" },
      { name: "Joe Wachowski" },
    ];
    await prisma.customer.createMany({ data: customers });
  };
  const CreateRestaurants = async () => {
    const restaurants = [
      { name: "Freddy Fazbear's Pizza" },
      { name: "Papa's Freezeria" },
      { name: "Krusty Krab" },
      { name: "Los Pollos Hermanos" },
      { name: "Mondo Burger" },
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  };
  const CreateReservations = async () => {
    const reservations = [
      {
        customerId: 1,
        restaurantId: 1,
        date: new Date("2024-07-01"),
        partyCount: 5,
      },
      {
        customerId: 2,
        restaurantId: 2,
        date: new Date("2024-07-02"),
        partyCount: 4,
      },
      {
        customerId: 3,
        restaurantId: 3,
        date: new Date("2024-07-03"),
        partyCount: 3,
      },
      {
        customerId: 4,
        restaurantId: 4,
        date: new Date("2024-08-06"),
        partyCount: 2,
      },
      { customerId: 5, restaurantId: 5, date: new Date("2024-09-09") },
    ];
    await prisma.reservation.createMany({ data: reservations });
  };
  await CreateCustomers();
  await CreateRestaurants();
  await CreateReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
