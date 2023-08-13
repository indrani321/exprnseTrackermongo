const Expense = require('../models/expense');
const User = require('../models/user');

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({}).select('totalamount name').exec();

        let userLeaderBoard = users.map(user => ({
            name: user.name,
            total_cost: user.totalamount || 0
        }));

        userLeaderBoard.sort((a, b) => b.total_cost - a.total_cost);

        res.status(200).json(userLeaderBoard);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getLeaderboard,
};
