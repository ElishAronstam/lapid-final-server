import { tasksObjects } from '../../index';
import Task from '../../types/task';
import { v4 as uuidv4 } from 'uuid';

// TODO: include try and catch
const resolvers = {
  Query: {
    tasks: () => tasksObjects, // works
    filterTasks: (_, { filters }) => { // works
      console.log("in filters")
      const filterByOpenStatus: boolean = filters.statusFilter === true;
      const filterByHighPriority: boolean = filters.priorityFilter === true;
      const keyword: string = filters.searchWord.toString();

      let filteredTasks = tasksObjects;
      console.log(filteredTasks);
      console.log(filterByOpenStatus);
      console.log(filterByHighPriority);
      console.log(keyword);
      if (keyword != '') {
        filteredTasks = filteredTasks.filter((task: Task) => {
          return task.title.toString().toLowerCase().includes((keyword.toLowerCase()));
        });
      }
      if (filterByOpenStatus) {
        filteredTasks = filteredTasks.filter((task: Task) => task.status === 'Open');
      }
      if (filterByHighPriority) {
        filteredTasks = filteredTasks.filter((task: Task) => task.priority === 'High');
      }

      return filteredTasks;
    },
  },


  Mutation: {
    createTask: (_, { taskInput }) => { // works
      const newTask: Task = {
        id: uuidv4(),
        title: taskInput.title,
        description: taskInput.description,
        estimatedTime: taskInput.estimatedTime,
        status: taskInput.status,
        priority: taskInput.priority,
        review: taskInput.review,
        timeSpent: taskInput.timeSpent,
        endTime: taskInput.endTime ,
      };

      tasksObjects.push(newTask);

      return newTask;
    },

  deleteTask: (_, { taskId }) => { // works

    const taskIndex = tasksObjects.findIndex((task: Task) => task.id === taskId);

    if (taskIndex === -1) {
      return 'Task not found';
    }

    tasksObjects.splice(taskIndex, 1);

    return 'Task deleted';
  },
}

};

export default resolvers;