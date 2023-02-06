import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { prisma } from "@/config";
import { AuthenticatedRequest } from "./authentication-middleware";
import { notFoundError, paymentRequiredError } from "@/errors";

export async function userValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId,
      },
    });
    if (!enrollment) throw notFoundError();

    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId: enrollment.id,
      },
    });
    if (!ticket) throw notFoundError();
    if (ticket.status === "RESERVED") throw paymentRequiredError();

    const ticketType = await prisma.ticketType.findFirst({
      where: {
        id: ticket.ticketTypeId,
      },
    });
    if (ticketType.isRemote === true || ticketType.includesHotel === false) throw paymentRequiredError();

    next();
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}
