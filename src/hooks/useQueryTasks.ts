import axios from "axios"
import { useQuery } from "react-query";
import { Task } from "../types/types"

export const useQueryTasks = () => {
    const getTasks = async () => {
        const { data } = await axios.get<Task[]>(
            `${process.env.REACT_APP_REST_API}/tasks/`
        );
        return data;
    }
    return useQuery<Task[]>({
        queryKey: 'tasks',
        queryFn: getTasks,
        staleTime: 0,
    })
}