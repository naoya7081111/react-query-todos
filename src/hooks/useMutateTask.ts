import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux"
import { resetEditedTask } from "../slices/todoSlice";
import { EditTask, Task } from "../types/types";

export const useMutateTask = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const createTaskMutation = useMutation(
        (task: Omit<EditTask, 'id'>) => 
        axios.post(`${process.env.REACT_APP_REST_URL}/tasks/`),
        {
            onSuccess: (res) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks')
                if(previousTodos) {
                    queryClient.setQueryData<Task[]>('tasks', [
                        ...previousTodos,
                        res.data,
                    ])
                }
                dispatch(resetEditedTask())
            }
        }
    );

    const updateTaskMutaition = useMutation(
        (task: EditTask) =>
        axios.put<Task>(
            `${process.env.REACT_APP_REST_URL}/tasks/${task.id}/`,
            task
        ),
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks');
                if(previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        previousTodos.map((task) =>
                        task.id === variables.id ? res.data : task)
                    )
                }
                dispatch(resetEditedTask())
            }
        }
    )
    const deleteTaskMutation = useMutation(
        (id: number) => 
        axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}/`),
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks')
                if(previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        previousTodos.filter((task) => task.id !== variables)
                    )
                }
                dispatch(resetEditedTask())
            }
        }
    )
    return { deleteTaskMutation, createTaskMutation, updateTaskMutaition };
}