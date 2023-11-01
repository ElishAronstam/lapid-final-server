import { gql } from 'apollo-server-express';

 const typeDefs = gql`
input TaskInput {
    id:String
    title:String!
    description:String!
    estimatedTime:String!
    status:String!
    priority:String!
    review:String
    timeSpent:String
    endTime:String
}

input TasksFiltersInput {
     statusFilter:Boolean
     priorityFilter:Boolean
     searchWord:String
}

type Task {
    id:String!
    title:String!
    description:String!
    estimatedTime:String!
    status:String!
    priority:String!
    review:String
    timeSpent:String
    endTime:String
}

type Query {
    tasks:[Task!]!
    filterTasks(filters:TasksFiltersInput):[Task!]!
}

type Mutation {
    createTask(taskInput:TaskInput):Task
    deleteTask(taskId:String):String
}

`;

 export default typeDefs;