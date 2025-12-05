const DetailedAccountModel = require('../../models/DetailedAccount');

const updateTransaction = async ({
  transactionId,
  updates = {},
  repository,
}) => {
  const currentTransaction = await repository.getById(transactionId);
  if (!currentTransaction) return null;

  const dataToPersist = { ...updates };

  const result = await repository.updateById(transactionId, dataToPersist);
  if (!result) return null;

  const plainResult = result.toJSON ? result.toJSON() : result;
  return new DetailedAccountModel(plainResult);
};

module.exports = updateTransaction;
