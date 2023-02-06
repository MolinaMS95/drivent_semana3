import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function getAllHotels() {
  const hotels = await hotelsRepository.findHotels();
  if (!hotels.length) throw notFoundError();
  return hotels;
}

async function getRooms(hotelId: number) {
  const hotelWithRooms = await hotelsRepository.findRooms(hotelId);

  if(!hotelWithRooms) {
    throw notFoundError();
  }
  return hotelWithRooms;
}

const hotelsService = {
  getAllHotels,
  getRooms
};

export default hotelsService;
