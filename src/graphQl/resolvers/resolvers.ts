import Task from '../../types/Task/task';
import { v4 as uuidv4 } from 'uuid';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { tasksObjects } from '../../index';
import { filterTasksHelper } from '../../helper';

const pubsub = new PubSub();

const resolvers = {
  Query: {
    tasks: () => tasksObjects,

    filterTasks: (_, { filters }) => {
      const filterByOpenStatus = filters.statusFilter === true;
      const filterByHighPriority = filters.priorityFilter === true;
      const keyword = filters.searchWord.toString();

      return filterTasksHelper(tasksObjects, filterByOpenStatus, filterByHighPriority, keyword);
    },
  },

  Mutation: {
    createTask: (_, { taskInput }) => {

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
      console.log('Task added to db');
      pubsub.publish('TASKS_UPDATED', {
        tasksUpdated: {
          item: newTask,
          actionType: 'add',
        },
      });

      return newTask;
    },

    deleteTask: (_, { taskId }) => {
      const taskIndex = tasksObjects.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        console.log('Task not found');
      } else {
        const taskToDelete: Task = tasksObjects[taskIndex];
        tasksObjects.splice(taskIndex, 1);
        console.log('Task deleted from db');
        pubsub.publish('TASKS_UPDATED', {
          tasksUpdated: {
            item: taskToDelete,
            actionType: 'delete',
          },
        });

        return 'Task deleted';
      }

    },
  },

  Subscription: {
    tasksUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['TASKS_UPDATED']),
        (payload, variables) => {
          if (payload.tasksUpdated.actionType === 'delete') {
            return true;
          } else if (payload.tasksUpdated.actionType === 'add') {
            const filterByOpenStatus = variables.filters.statusFilter === true;
            const filterByHighPriority = variables.filters.priorityFilter === true;
            const keyword = variables.filters.searchWord.toString();

            const filtered = filterTasksHelper(tasksObjects, filterByOpenStatus, filterByHighPriority, keyword);

            return filtered.includes(payload.tasksUpdated.item);
          } else {
            return false;
          }
        }),
    },
  },
};

export default resolvers;
