const { NotFoundError } = require('../../shared/errors');
const User = require('./User');

exports.removeUser = async ({ id }) => {
  const existing = await User.findById(id);

  if (!existing) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  return User.findByIdAndRemove(id);
};
