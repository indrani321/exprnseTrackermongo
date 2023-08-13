const path = require('path');
const jwt = require('jsonwebtoken');
const Expense = require('../models/expense');

function getExpensePage(req, res) {
    res.sendFile(path.join(__dirname, '../views/expense.html'));
}

async function fetchExpense(req, res) {
    try {
        let page = +req.query.page || 1;
        const pageSize = +req.query.pagesize || 5;

        const totalExpense = await Expense.countDocuments();

        let expenses = await Expense.find({ userId: req.user._id })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        res.status(200).json({
            expenses: expenses,
            currentPage: page,
            hasNextPage: page * pageSize < totalExpense,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalExpense / pageSize),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getExpensePage,
    fetchExpense,
};
