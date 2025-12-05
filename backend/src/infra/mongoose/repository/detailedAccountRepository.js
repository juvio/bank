const { DetailedAccount } = require('../modelos');

const create = async (action) => {
    const detailedAccount = new DetailedAccount(action);
    return detailedAccount.save();
};

const getById = async (id) => {
  return DetailedAccount.findById(id);
};

const get = async (detailedAccount={}, skip = 0, limit = 10) => {
    return DetailedAccount.find(detailedAccount)
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });
};

const count = async (filter = {}) => {
    return DetailedAccount.countDocuments(filter);
};

const updateById = async (id, updates = {}) => {
  return DetailedAccount.findByIdAndUpdate(id, updates, { new: true });
};

const removeById = async (id) => {
  return DetailedAccount.findByIdAndDelete(id);
};

module.exports = {
  create,
  getById,
  get,
  count,
  updateById,
  removeById
};
