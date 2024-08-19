const express = require('express');
const auth = require('../middlewares/auth.middleware');
const taskModel = require('../models/task.model');
const taskRouter = express.Router();


taskRouter.post('/add', auth, async (req, res) => {
    const { title, boardId } = req.body;
    try {
        const task = new taskModel({
            boardId,
            title
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


taskRouter.put('/update/:id', auth, async (req, res) => {
    const { status } = req.body;
    try {
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        task.status = status;

        if (status === 'completed') {
            task.completedAt = new Date();
        } else {
            task.completedAt = null;
        }
        await task.save();
        res.status(200).json({
            message: 'Task updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating the task',
            error
        });
    }
});



// taskRouter.delete('/delete/:id', auth,async (req, res) => {
//     try {
//         const task = await taskModel.findOneAndDelete({ _id: req.params.id});
//         if (!task) {
//             return res.status(401).json({
//                 message: 'Task not found...Please login again'
//             })
//         }
//         res.status(200).json({
//             message: 'Task Deleted succesfully'
//         })
//     } catch (error) {
//         res.status(405).json({
//             message: 'Error deleting the task',
//             error
//         })
//     }
// });


taskRouter.get('/view/:id', auth, async (req, res) => {
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


module.exports = taskRouter;