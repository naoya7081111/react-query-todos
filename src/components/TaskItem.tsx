import React, { VFC } from 'react';
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Task } from '../types/types';
import { useDispatch } from 'react-redux';
import { useMutateTask } from '../hooks/useMutateTask';
import { setEditedTask } from '../slices/todoSlice';

interface Props {
    task: Task;
}

export const TaskItem: VFC<Props> = ({ task }) => {

    const dispatch = useDispatch();
    const { deleteTaskMutation } = useMutateTask();
    console.log('deleted task item');

    if(deleteTaskMutation.isLoading) {
        return <p>Deleting...</p>
    }
    return (
        <li className='my-3'>
            <span>{task.title}</span>
            <span>
                {" : "}
                {task.tag_name}
            </span>
            <div className='flex float-right ml-20'>
                <PencilAltIcon 
                    className='h-5 mx-1 text-blue-500 cursor-pointer'
                    onClick={() => {
                        dispatch(
                            setEditedTask({
                                id: task.id,
                                title: task.title,
                                tag: task.tag
                            })
                        )
                    }}
                />
                <TrashIcon 
                    className='h-5 w-5 text-blue-500 cursor-pointer'
                    onClick={() => {
                        deleteTaskMutation.mutate(task.id);
                    }}
                />
            </div>
        </li>
    )
}
