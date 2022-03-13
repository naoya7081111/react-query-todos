import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux"
import { resetEditedTag } from "../slices/todoSlice";
import { Tag } from "../types/types";

export const useMutateTag = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const createTagMutation = useMutation(
        (tag: Omit<Tag, 'id'>) => 
        axios.post(`${process.env.REACT_APP_REST_URL}/tags/`, tag),
        {
            onSuccess: (res) => {
                const previousTags = queryClient.getQueryData<Tag[]>('tags')
                if(previousTags) {
                    queryClient.setQueryData<Tag[]>('tags', [
                        ...previousTags,
                        res.data,
                    ])
                }
                dispatch(resetEditedTag())
            }
        }
    );

    const updateTagMutaition = useMutation(
        (tag: Tag) =>
        axios.put<Tag>(
            `${process.env.REACT_APP_REST_URL}/tags/${tag.id}/`,
            tag
        ),
        {
            onSuccess: (res, variables) => {
                const previousTags = queryClient.getQueryData<Tag[]>('tags');
                if(previousTags) {
                    queryClient.setQueryData<Tag[]>(
                        'tags',
                        previousTags.map((tag) =>
                        tag.id === variables.id ? res.data : tag)
                    )
                }
                dispatch(resetEditedTag());
            }
        }
    )
    const deleteTagMutation = useMutation(
        (id: number) => 
        axios.delete(`${process.env.REACT_APP_REST_URL}/tags/${id}/`),
        {
            onSuccess: (res, variables) => {
                const previousTags = queryClient.getQueryData<Tag[]>('tags')
                if(previousTags) {
                    queryClient.setQueryData<Tag[]>(
                        'tags',
                        previousTags.filter((tag) => tag.id !== variables)
                    )
                }
                dispatch(resetEditedTag())
            }
        }
    )
    return { deleteTagMutation, createTagMutation, updateTagMutaition };
}