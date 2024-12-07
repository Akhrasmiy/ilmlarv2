class BadRequestError extends Error {
  constructor(msg = "Xato so'rov.") {
    super(msg);
    this.name = "BadRequestError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

class NotFoundError extends Error {
  constructor(msg = "Topilmadi.") {
    super(msg);
    this.name = "NotFoundError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

class UnauthorizedError extends Error {
  constructor(msg = "Ruxsat berilmagan.") {
    super(msg);
    this.name = "UnauthorizedError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

class ForbiddenError extends Error {
  constructor(msg = "Kirish ta'qiqlangan.") {
    super(msg);
    this.name = "ForbiddenError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};
