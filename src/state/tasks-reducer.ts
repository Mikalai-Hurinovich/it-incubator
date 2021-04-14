import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId_1, todoListId_2} from "./todoList-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    newIsDoneValue: boolean
    todoListId: string
}
export type ChangeTitleStatusActionType = {
    type: 'CHANGE-TITLE-TITLE'
    taskId: string
    title: string
    todoListId: string
}

// Все экшены
type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TaskStateType = {
    [todoListId_1]: [
        {id: v1(), title: 'Кинг', isDone: true},
        {id: v1(), title: 'Булгаков', isDone: false},
        {id: v1(), title: 'Ремарк', isDone: true},
        {id: v1(), title: 'Достоевский', isDone: false},
        {id: v1(), title: 'Пушкин', isDone: true},
        {id: v1(), title: 'Фицжеральд', isDone: false},
    ],
    [todoListId_2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Bread', isDone: true},
        {id: v1(), title: 'Cheese', isDone: false},
        {id: v1(), title: 'Egg', isDone: false},
        {id: v1(), title: 'Salad', isDone: false},
        {id: v1(), title: 'Salmon', isDone: false},
    ],
}
export const taskReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.id)
            return copyState;
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState;
            // variant #2
            // let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            // return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId
                        ? {...task, isDone: action.newIsDoneValue}
                        : task)
            }
        }

        case 'CHANGE-TITLE-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId
                        ? {...task, title: action.title}
                        : task)
            }
        }

        case "ADD-TODOLIST":
            let todolistId = action.todoListId;
            return {...state, [todolistId]: []}
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state;
    }
}


// Создаем Action Creator, чтобы была возможность проводить манипуляции с данными action, например вызывать
// console.log, сделать проверку и тд
export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    // можем не писать newFilterValue: newFilterValue, тк названия одинаковы
    return {type: 'REMOVE-TASK', id, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', newIsDoneValue, todoListId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTitleStatusActionType => {
    return {type: 'CHANGE-TITLE-TITLE', title, todoListId, taskId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}