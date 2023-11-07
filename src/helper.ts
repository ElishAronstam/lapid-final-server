import data from './assets/mock.json';
import Task from './types/Task/task';
import { v4 as uuidv4 } from 'uuid';
import status from './types/Enums/status';
import priority from './types/Enums/priority';


export const getInitTasks = () => {
  console.log("Initializing tasks");
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
    review: jsonData.review,
    timeSpent: jsonData.timeSpent,
    endTime: jsonData.endTime,
  };

  return newTask;
};

export const filterTasksHelper = (tasks: Array<Task>, filterByOpenStatus: Boolean, filterByHighPriority: Boolean, keyword: String) => {
  let filteredTasks = tasks;

  if (!!keyword) {
    filteredTasks = filteredTasks.filter((task) => {
      return task.title.toString().toLowerCase().includes(keyword.toLowerCase());
    });
  }

  if (filterByOpenStatus) {
    filteredTasks = filteredTasks.filter((task) => task.status === status.OPEN);
  }

  if (filterByHighPriority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority.HIGH);
  }

  return filteredTasks;
};
