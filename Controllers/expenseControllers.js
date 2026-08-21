const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);

    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add expense",
      error: error.message
    });
  }
};

// adhirajpratapsingh079_db_user
// wHoGHcd4qfWeamBU


// Get All Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get expenses",
      error: error.message
    });
  }
};


// Get One Expense
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get expense",
      error: error.message
    });
  }
};


// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
      error: error.message
    });
  }
};


// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message
    });
  }
};


// Analytics Summary
const getAnalytics = async (req, res) => {
  try {
    const categoryData = await Expense.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]);

    const monthlyData = await Expense.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.status(200).json({ categoryData, monthlyData });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get analytics",
      error: error.message
    });
  }
};
// Statistics Summary
const getStatistics = async (req, res) => {
  try {
    const expenses = await Expense.find();

    if (expenses.length === 0) {
      return res.status(200).json({
        totalCount: 0,
        totalAmount: 0,
        averageAmount: 0,
        highestExpense: null,
        lowestExpense: null,
        mostUsedCategory: null
      });
    }

    const totalCount = expenses.length;
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const averageAmount = totalAmount / totalCount;

    const highestExpense = expenses.reduce((max, exp) =>
      exp.amount > max.amount ? exp : max
    );
    const lowestExpense = expenses.reduce((min, exp) =>
      exp.amount < min.amount ? exp : min
    );

    const categoryCounts = {};
    expenses.forEach((exp) => {
      categoryCounts[exp.category] = (categoryCounts[exp.category] || 0) + 1;
    });
    const mostUsedCategory = Object.keys(categoryCounts).reduce((a, b) =>
      categoryCounts[a] > categoryCounts[b] ? a : b
    );

    res.status(200).json({
      totalCount,
      totalAmount,
      averageAmount: Math.round(averageAmount),
      highestExpense,
      lowestExpense,
      mostUsedCategory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get statistics",
      error: error.message
    });
  }
};


module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getAnalytics,
  getStatistics
};