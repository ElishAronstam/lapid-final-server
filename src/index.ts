import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import {createTaskFromJson, getInitTasks} from './helper'
import Task from "./types/task";

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

    try {
        let newTask: Task = createTaskFromJson(req.body);
        tasksObjects.push(newTask);
        res.json(newTask);
    } catch (err) {
        res.status(500).json({msg: "err in post task", err})
    }
})

app.delete('/delete/:taskId', (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskIndex = tasksObjects.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'});
    }

    tasksObjects.splice(taskIndex, 1);

    return res.status(200).json({message: 'Task deleted'});
});

app.get('/filter', (req: Request, res: Response) => {
    try {
        const filterByOpenStatus: boolean = req.query.param1 === 'true'; // Convert to boolean
        const filterByHighPriority: boolean = req.query.param2 === 'true'; // Convert to boolean
        const keyword: string = req.query.param3.toString();

        let filteredTasks = tasksObjects;
        if (keyword != "") {
            filteredTasks = filteredTasks.filter((task: Task) => {
                return task.title.toString().toLowerCase().includes((keyword.toLowerCase()));
            });
        }
        if (filterByOpenStatus) {
            filteredTasks = filteredTasks.filter((task) => task.status === "Open");
        }
        if (filterByHighPriority) {
            filteredTasks = filteredTasks.filter((task) => task.priority === "High");
        }
        res.json(filteredTasks);
    } catch (err) {
        res.status(500).json({msg: "err in filtering tasks", err})
    }
});


app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});