import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import {getInitTasks} from "./helper";
import Task from "./Types/task";

//For env File
dotenv.config();

const app: Application = express();
app.use(express.json());
const port = process.env.PORT || 8000;
const cors = require('cors');

let tasksObjects: Array<Task> = getInitTasks();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});


app.get('/tasks', async (req: Request, res: Response) => {
    try {
        res.json(tasksObjects);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post("/create", async (req: Request, res: Response) => {
    // let validBody;
    // if(req.body.status === "Close")
    //     validBody=closedTaskValidation(req.body);
    // else if(req.body.priority === "High")
    //     validBody=highPriorityTaskValidation(req.body);
    // else
    //     validBody=generalTaskValidation(req.body);
    //
    // if (validBody.error) {
    //     res.status(400).json(validBody.error.details)
    // }
    try {
        let newTask: Task;
        if (req.body.status === "Close") {

            newTask = {
                id: uuidv4(),
                title: req.body.title,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                status: req.body.status,
                priority: req.body.priority,
                review: req.body.review,
                timeSpent: req.body.timeSpent,
                endTime: req.body.endTime ? req.body.endTime : undefined,
            };
        } else if (req.body.priority === "High") {
            newTask = {
                id: uuidv4(),
                title: req.body.title,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                status: req.body.status,
                priority: req.body.priority,
                endTime: req.body.endTime ? req.body.endTime : undefined,
            };

        } else {
            newTask = {
                id: uuidv4(),
                title: req.body.title,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                status: req.body.status,
                priority: req.body.priority,
            };


        }
        tasksObjects.push(newTask);
        res.json(newTask);
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "err in post task", err})
    }
})

app.delete('/delete/:taskId', (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskIndex = tasksObjects.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasksObjects.splice(taskIndex, 1);

    return res.status(200).json({ message: 'Task deleted' });
});


app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});