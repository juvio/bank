const { Router } = require('express');
const AccountController = require('./controller/Account');
const accountController = new AccountController({});
const router = Router();

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Busca contas
 *     tags: [Contas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas encontradas
 */
router.get('/account', accountController.find.bind(accountController));

/**
 * @swagger
 * /account/transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               value:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [Debit, Credit]
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               anexo:
 *                 type: string
 *               urlAnexo:
 *                 type: string
 *                 description: URL do anexo armazenado
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 */
router.post(
  '/account/transaction',
  accountController.createTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/transaction/{id}:
 *   put:
 *     summary: Atualiza uma transação existente
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *       404:
 *         description: Transação não encontrada
 */
router.put(
  '/account/transaction/:id',
  accountController.updateTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/transaction/{id}:
 *   delete:
 *     summary: Remove uma transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transação removida com sucesso
 *       404:
 *         description: Transação não encontrada
 */
router.delete(
  '/account/transaction/:id',
  accountController.deleteTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/{accountId}/statement:
 *   get:
 *     summary: Obtém extrato da conta
 *     tags: [Extratos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extrato encontrado
 *       401:
 *         description: Token invalido
 */
router.get(
  '/account/:accountId/statement',
  accountController.getStatment.bind(accountController)
);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Busca transações com paginação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de transações com paginação
 */
router.get('/api/transactions', async (req, res) => {
  try {
    const { page = 0, limit = 10 } = req.query;
    const detailedAccountRepository = require('./infra/mongoose/repository/detailedAccountRepository');
    const accountRepository = require('./infra/mongoose/repository/accountRepository');
    const mongoose = require('mongoose');

    const skip = parseInt(page) * parseInt(limit);
    const limitNum = parseInt(limit);

    const userId = req.user.id;
    const accounts = await accountRepository.get({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    const accountId = accounts[0]._id;
    const balance = accounts[0].balance || 0;

    const transactions = await detailedAccountRepository.get(
      { accountId: accountId },
      skip,
      limitNum
    );
    const total = await detailedAccountRepository.count({
      accountId: accountId,
    });

    console.log(
      `GET /api/transactions - page: ${page}, limit: ${limit}, skip: ${skip}, found: ${transactions.length}, total: ${total}, balance: ${balance}`
    );

    const formattedTransactions = transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: t.value,
      description: t.from || t.to || 'Transação',
      date: t.date,
    }));

    const hasNextPage = skip + limitNum < total;

    console.log(
      `Returning ${
        formattedTransactions.length
      } transactions, hasNextPage: ${hasNextPage}, nextPage: ${
        hasNextPage ? parseInt(page) + 1 : null
      }`
    );

    res.json({
      data: formattedTransactions,
      nextPage: hasNextPage ? parseInt(page) + 1 : null,
      total,
      balance,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - description
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [transfer, payment, deposit, withdraw]
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 */
router.post('/api/transactions', async (req, res) => {
  try {
    const { accountId, type, amount, description, date } = req.body;

    if (!type || !amount || !description) {
      return res.status(400).json({
        error: 'type, amount e description são obrigatórios',
      });
    }

    const DetailedAccountModel = require('./models/DetailedAccount');
    const detailedAccountRepository = require('./infra/mongoose/repository/detailedAccountRepository');
    const accountRepository = require('./infra/mongoose/repository/accountRepository');
    const saveTransaction = require('./feature/Transaction/saveTransaction');
    const mongoose = require('mongoose');

    // Buscar a conta do usuário logado
    let validAccountId;
    if (accountId && mongoose.Types.ObjectId.isValid(accountId)) {
      validAccountId = accountId;
    } else {
      // Busca a conta do usuário logado (via JWT)
      const userId = req.user.id;
      const accounts = await accountRepository.get({
        userId: new mongoose.Types.ObjectId(userId),
      });

      if (!accounts || accounts.length === 0) {
        return res
          .status(404)
          .json({ error: 'Conta não encontrada para este usuário' });
      }

      validAccountId = accounts[0]._id;
    }

    const transactionDTO = new DetailedAccountModel({
      accountId: validAccountId,
      type: type,
      value: amount,
      from: type === 'deposit' ? description : null,
      to: type !== 'deposit' ? description : null,
      date: date ? new Date(date) : new Date(),
      anexo: null,
      urlAnexo: null,
    });

    const savedTransaction = await saveTransaction({
      transaction: transactionDTO,
      repository: detailedAccountRepository,
    });

    const formattedTransaction = {
      id: savedTransaction.id,
      type: savedTransaction.type,
      amount: savedTransaction.value,
      description: savedTransaction.from || savedTransaction.to || description,
      date: savedTransaction.date,
    };

    res.status(201).json({
      message: 'Transação criada com sucesso',
      result: formattedTransaction,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Atualiza uma transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 */
router.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description, date } = req.body;

    const detailedAccountRepository = require('./infra/mongoose/repository/detailedAccountRepository');
    const updateTransaction = require('./feature/Transaction/updateTransaction');

    const updates = {};
    if (type) {
      updates.type = type;
      updates.from = type === 'deposit' ? description : null;
      updates.to = type !== 'deposit' ? description : null;
    }
    if (amount !== undefined) updates.value = amount;
    if (description) {
      if (type === 'deposit') {
        updates.from = description;
      } else {
        updates.to = description;
      }
    }
    if (date) updates.date = new Date(date);

    const updatedTransaction = await updateTransaction({
      transactionId: id,
      updates: updates,
      repository: detailedAccountRepository,
    });

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    const formattedTransaction = {
      id: updatedTransaction.id,
      type: updatedTransaction.type,
      amount: updatedTransaction.value,
      description: updatedTransaction.from || updatedTransaction.to,
      date: updatedTransaction.date,
    };

    res.json({
      message: 'Transação atualizada com sucesso',
      result: formattedTransaction,
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Exclui uma transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação excluída com sucesso
 *       404:
 *         description: Transação não encontrada
 */
router.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const detailedAccountRepository = require('./infra/mongoose/repository/detailedAccountRepository');
    const deleteTransaction = require('./feature/Transaction/deleteTransaction');

    const result = await deleteTransaction({
      transactionId: id,
      repository: detailedAccountRepository,
    });

    if (!result) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    res.json({ message: 'Transação excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Erro ao excluir transação' });
  }
});

/**
 * @swagger
 * /api/debug/transactions:
 *   get:
 *     summary: Debug - Ver todos os dados brutos do MongoDB
 *     tags: [Debug]
 *     responses:
 *       200:
 *         description: Dados brutos do MongoDB
 */
router.get('/api/debug/transactions', async (req, res) => {
  try {
    const { DetailedAccount } = require('./infra/mongoose/modelos');
    const allData = await DetailedAccount.find({}).lean();
    res.json({
      total: allData.length,
      data: allData,
    });
  } catch (error) {
    console.error('Error fetching debug data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
