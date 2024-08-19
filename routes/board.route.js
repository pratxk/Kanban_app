const express = require('express');
const auth = require('../middlewares/auth.middleware');
const boardModel = require('../models/board.model');
const boardRouter = express.Router();


boardRouter.post('/add-board', auth, async (req, res) => {
    const { title, description } = req.body;
    try {
        const board = new boardModel({
            userId: req.user._id,
            title,
            description
        });
        await board.save();
        res.status(201).json({
            message: "Board created successfully"
        })
    } catch (error) {
        res.status(401).json({
            message: 'Error creating the board',
            error
        })
    }
});


boardRouter.put('/update/:id', auth, async (req, res) => {
    const { title } = req.body;
    try {
        const board = await boardModel.findOne({ _id: req.params.id, userId: req.user._id });
        if (!board) {
            return res.status(401).json({
                message: 'Board not found...Please input correct id again'
            })
        }
        board.title = title;
        await board.save();
        res.status(200).json({
            message: 'Board Name Updated succesfully'
        })
    } catch (error) {
        res.status(405).json({
            message: 'Error updating the board name',
            error
        })
    }
});


// boardRouter.delete('/delete/:id', auth, async (req, res) => {
//     try {
//         const task = await taskModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
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


boardRouter.get('/view', auth, async (req, res) => {
    try {
        const boards = await boardModel.find({ userId: req.user._id });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching boards', error });
    }
});

module.exports = boardRouter;