import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, TodoListID: string) => void
    addTasks: (taskTitle: string, TodoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, TodoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, TodoListID: string) => void
    changeTodoListTitle: (newTitle: string, TodoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, TodoListID: string) => void

}


const TodoList = React.memo((props: TodoListPropsType) => {
    const addTask = useCallback((title: string) => props.addTasks(title, props.todoListID), [props])
    const all = () => props.changeTodoListFilter('all', props.todoListID)
    const active = () => props.changeTodoListFilter('active', props.todoListID)
    const completed = () => props.changeTodoListFilter('completed', props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID),
        [props.changeTodoListTitle, props.todoListID])

    let allTodoListTasks = props.tasks;
    let tasksForTodoList = allTodoListTasks;
    if (props.filter === 'active') tasksForTodoList = allTodoListTasks.filter(el => !el.isDone)
    if (props.filter === 'completed') tasksForTodoList = allTodoListTasks.filter(el => el.isDone)

    const tasks = tasksForTodoList.map(task => {

        return (
            <Task key={task.id}
                  task={task}
                  todoListId={props.todoListID}
                  changeTaskStatus={props.changeTaskStatus}
                  removeTask={props.removeTask}
                  changeTaskTitle={props.changeTaskTitle}
            />
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size={'medium'} color="inherit">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'all' ? 'selected' : ''}
                    onClick={all}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'active' ? 'selected' : ''}
                    onClick={active}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    className={props.filter === 'completed' ? 'selected' : ''}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
})


export default TodoList;