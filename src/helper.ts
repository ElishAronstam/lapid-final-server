import data from "./assets/mock.json"
import Task from "./types/task"
import {v4 as uuidv4} from 'uuid';

export const getInitTasks = () => {
    const data = getTasksFromFile();

    let tasksObjects = Array<Task>();

    data.forEach(task => {
        const newTask: Task = createTaskFromJson(task);
        tasksObjects.push(newTask);
    });

    return tasksObjects;
};

const getTasksFromFile = () => {
    return data.tasks;
};

export const createTaskFromJson = (jsonData: any): Task => {
    const newTask: Task = {
        id: uuidv4(),
        title: jsonData.title,
        description: jsonData.description,
        estimatedTime: jsonData.estimatedTime,
        status: jsonData.status,
        priority: jsonData.priority,
        review: jsonData.review ? jsonData.review : undefined,
        timeSpent: jsonData.timeSpent ? jsonData.timeSpent : undefined,
        endTime: jsonData.endTime ? jsonData.endTime : undefined,
    };


    return newTask;
}
