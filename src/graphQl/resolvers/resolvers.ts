import { tasksObjects } from '../../index';
import Task from '../../types/task';
import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    tasks: () => tasksObjects,
    filterTasks: (_, { filters }) => {
      try {
        const filterByOpenStatus = filters.statusFilter === true;
        const filterByHighPriority = filters.priorityFilter === true;
        const keyword = filters.searchWord.toString();

        let filteredTasks = tasksObjects;

        console.log(keyword);
        if (keyword !== '') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.title.toString().toLowerCase().includes(keyword.toLowerCase());
          });
        }
        if (filterByOpenStatus) {
          filteredTasks = filteredTasks.filter((task) => task.status === 'Open');
        }
        if (filterByHighPriority) {
          filteredTasks = filteredTasks.filter((task) => task.priority === 'High');
        }

        return filteredTasks;
      } catch (error) {
        throw new Error(`Error filtering tasks: ${error.message}`);
      }
    },
  },

  Mutation: {
    createTask: (_, { taskInput }) => {
      try {
        const newTask: Task = {
          id: uuidv4(),
          title: taskInput.title,
          description: taskInput.description,
          estimatedTime: taskInput.estimatedTime,
          status: taskInput.status,
          priority: taskInput.priority,
          review: taskInput.review,
          timeSpent: taskInput.timeSpent,
          endTime: taskInput.endTime,
        };

        tasksObjects.push(newTask);

        return newTask;
      } catch (error) {
        throw new Error(`Error creating task: ${error.message}`);
      }
    },

    deleteTask: (_, { taskId }) => {
      try {
        const taskIndex = tasksObjects.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) {
          throw new Error('Task not found');
        }

        tasksObjects.splice(taskIndex, 1);

        return 'Task deleted';
      } catch (error) {
        throw new Error(`Error deleting task: ${error.message}`);
      }
    },
  },
};

export default resolvers;
