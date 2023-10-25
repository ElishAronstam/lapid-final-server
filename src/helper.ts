import data from "./assets/mock.json"
import Task from "./Types/task"
import { v4 as uuidv4 } from 'uuid';

export const getInitTasks = () => {
    const data = getTasksFromFile();

    let tasksObjects=Array<Task>();

    data.forEach(task => {
        if (task.status === "Close") {

            const newTask :Task={
                id: uuidv4(),
                title: task.title,
                description: task.description,
                estimatedTime: task.estimatedTime,
                status: task.status,
                priority: task.priority,
                review: task.review,
                timeSpent: task.timeSpent,
                endTime: task.endTime ? task.endTime : undefined,
            };

            tasksObjects.push(newTask);
        } else if (task.priority === "High") {
            const newTask:Task={
                id: uuidv4(),
                title: task.title,
                description: task.description,
                estimatedTime: task.estimatedTime,
                status: task.status,
                priority: task.priority,
                endTime: task.endTime ? task.endTime : undefined,
            };

            tasksObjects.push(newTask);
        } else {
            const newTask: Task={
                id: uuidv4(),
                title: task.title,
                description: task.description,
                estimatedTime: task.estimatedTime,
                status: task.status,
                priority: task.priority,
            };

            tasksObjects.push(newTask);
        }

    });

    return tasksObjects;
};

const getTasksFromFile = () => {
    return data.tasks;
};
