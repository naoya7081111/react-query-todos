import { VFC } from "react"
import { useQueryTasks } from "../hooks/useQueryTasks"
import { TaskItem } from "./TaskItem";

export const TaskList: VFC = () => {
  const { status, data } = useQueryTasks();
  console.log('rendered taskList');

  if(status === "loading") return <div>{"Loading..."}</div>;
  if(status === "error") return <div>{"Error"}</div>;

  return (
    <div>
      {data?.map((task) => (
        <div key={task.id}>
          <ul>
            <TaskItem task={task} />
          </ul>
        </div>
      ))}
    </div>
  )
}
