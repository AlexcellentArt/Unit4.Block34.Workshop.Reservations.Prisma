const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const CreateCustomers = async () => {
    
  }
  const CreateRestaurants = async () => {
    
  }
  const CreateReservations = async () => {
    
  }
  await CreateCustomers
  await CreateRestaurants
  await CreateReservations
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });