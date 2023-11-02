import Task from '../../types/task';
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

      // TODO:make sure it works
      return filterTasksHelper(tasksObjects,filterByOpenStatus,filterByHighPriority,keyword);
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
        const taskToDelete:Task = tasksObjects[taskIndex];
        tasksObjects.splice(taskIndex, 1);

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
      subscribe:() => pubsub.asyncIterator(['TASKS_UPDATED'])

      // withFilter(
      //   () => pubsub.asyncIterator(['TASKS_UPDATED']),
      //   (payload, variables) => {
      //     if (payload.tasksUpdated.actionType === 'delete') {
      //       return variables.currTasks.includes(payload.tasksUpdated.item);
      //     } else if (payload.tasksUpdated.actionType === 'add') {
      //       const filterByOpenStatus = variables.filters.statusFilter === true;
      //       const filterByHighPriority = variables.filters.priorityFilter === true;
      //       const keyword = variables.filters.searchWord.toString();
      //
      //       // TODO:make sure it works
      //       const filtered = filterTasksHelper(tasksObjects, filterByOpenStatus, filterByHighPriority, keyword);
      //
      //       return filtered.includes(payload.tasksUpdated.item);
      //     } else {
      //       return false;
      //     }
      //   }),
    },
  }
};

export default resolvers;
