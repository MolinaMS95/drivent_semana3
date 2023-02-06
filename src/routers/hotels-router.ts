import { Router } from "express";
import { authenticateToken, userValidation } from "@/middlewares";
import { getHotels, getHotelWithRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .all("/*", userValidation)
  .get("/", getHotels)
  .get("/:hotelId", getHotelWithRooms);

export { hotelsRouter };
