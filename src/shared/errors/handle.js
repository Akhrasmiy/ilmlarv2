const { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError } = require("./errors");
const express = require("express");

/**
 * Global Error Handling Middleware
 * @param {Error} err - Xatolik obyekti
 * @param {express.Request} req - HTTP so'rovi
 * @param {express.Response} res - HTTP javobi
 * @param {express.NextFunction} next - Keyingi middleware
 */
module.exports = (err, req, res, next) => {
  console.error("Error Middleware Triggered:", err);

  let status = 500;
  let message = "Ichki server xatoligi.";

  if (err instanceof BadRequestError) {
    status = 400;
    message = err.message;
  } else if (err instanceof UnauthorizedError) {
    status = 401;
    message = err.message;
  } else if (err instanceof ForbiddenError) {
    status = 403;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    status = 404;
    message = err.message;
  }

  // Log response data for debugging
  console.log("Sending Response:", { status, message });

  res.status(status).json({ error: message });
};
