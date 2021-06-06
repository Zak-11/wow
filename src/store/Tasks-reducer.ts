import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./Todolist-reducer";



export type RemoveTasksActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}

export type addTaskAC = {
    type: "ADD_TASK"
    title: string
    todolistId: string

}

export type ChangeTaskAC = {
    type: "CHANGE_TASK"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTitleTaskAC = {
    type: "CHANGE_TILT_TASK"
    taskId: string
    title: string
    todolistId: string
}
export type ActionUnionType = RemoveTasksActionType
    | addTaskAC
    | ChangeTaskAC
    | ChangeTitleTaskAC
    | AddTodoListAT
    | RemoveTodoListAT


export const tasksReducer = (state: TasksStateType, action: ActionUnionType) => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)
            }

        case "ADD_TASK":
            let task: TaskType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]],
            }

        case "CHANGE_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else
                        return task

                })
            }

        case "CHANGE_TILT_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else
                        return task

                })
            }
        case "ADD-TODOLIST":
        return {
            ...state,
            [action.todolistID]: []
        }


    case "REMOVE-TODOLIST":
        let copyState = {...state}
        delete copyState[action.todoListID]
    return copyState


default:
    throw new Error("I dont understand this type")
}
}

export const removeTasksAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskAC => {
    return {type: "ADD_TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskAC => {
    return {type: "CHANGE_TASK", taskId, isDone, todolistId}
}

export const changeTitleTaskStatusAC = (taskId: string, title: string, todolistId: string): ChangeTitleTaskAC => {
    return {type: "CHANGE_TILT_TASK", taskId, title, todolistId}
}