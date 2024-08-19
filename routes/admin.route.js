const express = require('express');
const auth = require('../middlewares/auth.middleware');
const taskModel = require('../models/task.model');
const userModel = require('../models/user.model');
const checkAdmin = require('../middlewares/checkAdmin.Middleware');
const boardModel = require('../models/board.model');
const adminRouter = express.Router();


adminRouter.put('/update-user.status/:id', [auth, checkAdmin], async (req, res) => {
    const { status } = req.body;
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(401).json({
                message: 'user not found...Please enter correct user id again'
            })
        }
        user.status = status;
        await user.save();
        res.status(200).json({
            message: 'User Status Updated succesfully'
        });
    } catch (error) {
        res.status(405).json({
            message: 'Error updating the user',
            error
        })
    }
});



adminRouter.post('/add-task', [auth, checkAdmin], async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new taskModel({
            userId: req.user._id,
            title,
            description
        });
        await task.save();
        res.status(201).json({
            message: "Task added successfully"
        })
    } catch (error) {
        res.status(401).json({
            message: 'Error adding the task',
            error
        })
    }
});


adminRouter.put('/update-task/:id', [auth, checkAdmin], async (req, res) => {
    const { status } = req.body;

    try {
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(401).json({
                message: 'Task not found...Please login again'
            })
        }
        task.status = status;

        if (status === 'completed') {
            task.completedAt = new Date();
        }
        else {
            task.completedAt = null;
        }
        await task.save();
        res.status(200).json({
            message: 'Task Updated succesfully'
        })
    } catch (error) {
        res.status(405).json({
            message: 'Error updating the task',
            error
        })
    }
});


adminRouter.delete('/delete-task/:id', [auth, checkAdmin], async (req, res) => {
    try {
        console.log("User role:", req.user.role);
        const task = await taskModel.findOneAndDelete({ _id: req.params.id });
        if (!task) {
            return res.status(401).json({
                message: 'Task not found...Please login again'
            })
        }
        res.status(200).json({
            message: 'Task Deleted successfully'
        })
    } catch (error) {
        res.status(405).json({
            message: 'Error deleting the task',
            error
        })
    }
});



adminRouter.get('/view-task/:id', [auth, checkAdmin], async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const tasks = await taskModel.find({ boardId: req.params.id })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const totalTasks = await taskModel.countDocuments({ boardId: req.params.id });
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching tasks', error });
    }
});

adminRouter.get('/view-boards', [auth, checkAdmin], async (req, res) => {
    try {
        const boards = await boardModel.find();
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error occurred while fetching boards:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error occurred while fetching boards', error });
    }
});
module.exports = adminRouter;