import axios from "axios"
import { useQuery } from "react-query";
import { Tag } from "../types/types"

export const useQueryTags = () => {
    const getTags = async () => {
        const { data } = await axios.get<Tag[]>(
            `${process.env.REACT_APP_REST_API}/tags/`
        );
        return data;
    }
    return useQuery<Tag[]>({
        queryKey: 'tags',
        queryFn: getTags,
        staleTime: 600000,
    })
}