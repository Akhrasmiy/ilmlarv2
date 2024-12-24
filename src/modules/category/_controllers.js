const express = require('express');
const httpValidator = require('../../shared/http-validator');
const { getcategories } = require('./show-user');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const GetCategory = async (req, res, next) => {
  try {
    const result = await getcategories();

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetCategory
};
