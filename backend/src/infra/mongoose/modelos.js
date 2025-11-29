const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    functions: {
      type: String,
      required: true,
    },
    cvc: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    name: {
      type: String,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  },
  { timestamps: true }
);

const AccountSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DetailedAccountSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    anexo: {
      type: String,
    },
    urlAnexo: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  },
  { timestamps: true }
);

const getBalanceImpact = (type, value) => {
  switch (type) {
    case 'deposit':
      return value;
    case 'transfer':
    case 'payment':
    case 'withdraw':
      return -value;
    default:
      return 0;
  }
};

DetailedAccountSchema.post('save', async function () {
  const Account = mongoose.model('Account');
  const account = await Account.findById(this.accountId);

  if (account) {
    const impact = getBalanceImpact(this.type, this.value);
    account.balance = (account.balance || 0) + impact;
    await account.save();
  }
});

DetailedAccountSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate) {
    this._oldTransaction = {
      type: docToUpdate.type,
      value: docToUpdate.value,
      accountId: docToUpdate.accountId,
    };
  }
});

DetailedAccountSchema.post('findOneAndUpdate', async function (doc) {
  if (doc && doc.accountId && this._oldTransaction) {
    const Account = mongoose.model('Account');
    const account = await Account.findById(doc.accountId);

    if (account) {
      const oldImpact = getBalanceImpact(
        this._oldTransaction.type,
        this._oldTransaction.value
      );

      const newImpact = getBalanceImpact(doc.type, doc.value);

      account.balance = (account.balance || 0) - oldImpact + newImpact;
      await account.save();
    }
  }
});

DetailedAccountSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.accountId) {
    const Account = mongoose.model('Account');
    const account = await Account.findById(doc.accountId);

    if (account) {
      const impact = getBalanceImpact(doc.type, doc.value);
      account.balance = (account.balance || 0) - impact;
      await account.save();
    }
  }
});

const InvestmentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Definindo as relações virtuais
AccountSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'accountId',
});

AccountSchema.virtual('investments', {
  ref: 'Investment',
  localField: '_id',
  foreignField: 'accountId',
});

AccountSchema.virtual('transactions', {
  ref: 'DetailedAccount',
  localField: '_id',
  foreignField: 'accountId',
});

UserSchema.virtual('accounts', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'userId',
});

// Configurando as opções para que os virtuals sejam incluídos quando converter para JSON
const schemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

AccountSchema.set(schemaOptions);
UserSchema.set(schemaOptions);

// Criando os modelos
const Card = mongoose.model('Card', CardSchema);
const Account = mongoose.model('Account', AccountSchema);
const DetailedAccount = mongoose.model(
  'DetailedAccount',
  DetailedAccountSchema
);
const Investment = mongoose.model('Investment', InvestmentSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Account, User, Investment, DetailedAccount, Card };
