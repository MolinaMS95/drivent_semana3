import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRooms(hotelId: number) {
  return prisma.room.createMany({
    data: [
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number({ min: 1, max: 3 }),
        hotelId,
      },
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number({ min: 1, max: 3 }),
        hotelId,
      },
    ],
  });
}
