const path = require('path');
const Expense = require('../models/expense');
const User = require('../models/user');
const mongoose = require('mongoose');

async function deleteExpense(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const expenseId = req.params.id;
        const expenseObj = await Expense.findById(expenseId).session(session);

        if (!expenseObj) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const user = await User.findById(expenseObj.userId).session(session);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.totalamount -= expenseObj.amount;
        await user.save({ session });

        await Expense.findByIdAndDelete(expenseId, { session });

        await session.commitTransaction();
        session.endSession();

        res.sendStatus(201);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    deleteExpense,
};
