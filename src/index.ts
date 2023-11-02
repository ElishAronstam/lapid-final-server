import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import typeDefs from './graphQl/schema/schema';
import resolvers from './graphQl/resolvers/resolvers';
import Task from './types/task';
import { getInitTasks } from './helper';

export const tasksObjects: Array<Task> = getInitTasks();

(async function() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    },
  );
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
    console.log(`Subscriptions are ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
})();

// import express, { Application, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { createTaskFromJson } from './helper';
// import {tasksObjects} from './tasksDB/tasksDB';
// import Task from './types/task';
//
// //For env File
// dotenv.config();
//
// const app: Application = express();
// app.use(express.json());
// const port = process.env.PORT || 8000;
// const cors = require('cors');
//
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));
//
// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to Express & TypeScript Server');
// });
//
//
// app.get('/tasks',  (req: Request, res: Response) => {
//   try {
//     res.json(tasksObjects);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
//
// app.post('/create',  (req: Request, res: Response) => {
//
//   try {
//     let newTask: Task = createTaskFromJson(req.body);
//     tasksObjects.push(newTask);
//     res.json(newTask);
//   } catch (err) {
//     res.status(500).json({ msg: 'err in post task', err });
//   }
// });
//
// app.delete('/delete/:taskId', (req: Request, res: Response) => {
//   try {
//
//     const taskId = req.params.taskId;
//     const taskIndex = tasksObjects.findIndex((task) => task.id === taskId);
//
//     if (taskIndex === -1) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//
//     tasksObjects.splice(taskIndex, 1);
//
//     return res.status(200).json({ message: 'Task deleted' });
//   } catch (err) {
//     res.status(500).json({ msg: 'err in deleting task', err });
//   }
// });
//
// app.get('/filter', (req: Request, res: Response) => {
//   try {
//     const filterByOpenStatus: boolean = req.query.param1 === 'true'; // Convert to boolean
//     const filterByHighPriority: boolean = req.query.param2 === 'true'; // Convert to boolean
//     const keyword: string = req.query.param3.toString();
//
//     let filteredTasks = tasksObjects;
//     if (keyword != '') {
//       filteredTasks = filteredTasks.filter((task: Task) => {
//         return task.title.toString().toLowerCase().includes((keyword.toLowerCase()));
//       });
//     }
//     if (filterByOpenStatus) {
//       filteredTasks = filteredTasks.filter((task) => task.status === 'Open');
//     }
//     if (filterByHighPriority) {
//       filteredTasks = filteredTasks.filter((task) => task.priority === 'High');
//     }
//     res.json(filteredTasks);
//   } catch (err) {
//     res.status(500).json({ msg: 'err in filtering tasks', err });
//   }
// });
//
//
// app.listen(port, () => {
//   console.log(`Server is Fire at http://localhost:${port}`);
// });