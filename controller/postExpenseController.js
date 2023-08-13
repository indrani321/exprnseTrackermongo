const Expense = require('../models/expense');
const User = require('../models/user');
const mongoose = require('mongoose');

async function postExpense(req, res) {
    const { amount, etype, date } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const expenseData = {
            amount: amount,
            etype: etype,
            date: date,
            userId: req.user.id, 
        };

        const result = await Expense.create([expenseData], { session });

        const oldAmount = parseInt(req.user.totalamount);
        const newAmount = Number(oldAmount) + Number(amount);

        console.log('Old Amount:', oldAmount);
        console.log('New Expense Amount:', amount);
        console.log('New Total Amount:', newAmount);

        await User.updateOne(
            { _id: req.user._id },
            { totalamount: newAmount },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ newexpense: result });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    postExpense,
};


module.exports = {
    postExpense,
};
