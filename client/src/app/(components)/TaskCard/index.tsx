import type { Task as TaskType } from "@/state/api"

// type TaskType = {
//     tags: string[];
//     // other properties
// }
import { format } from "date-fns"
import Image from "next/image"
import { Badge, Card, CardContent, Typography, Chip } from "@mui/material"
import { CalendarIcon, UserIcon } from "lucide-react"

type Props = {
    task: TaskType
}

const TaskCard = ({ task }: Props) => {
    return (
        <Card className="dark:bg-gray-500">
            <CardContent className="space-y-4">
                <Typography gutterBottom variant="h5" component="div">
                    {task.title}
                </Typography>
                {task.attachments && task.attachments.length > 0 && (
                    <Image
                        src={`/${task.attachments[0].fileURL}`}
                        alt={task.attachments[0].fileName}
                        width={400}
                        height={200}
                        className="rounded-md w-full h-40 object-cover"
                    />
                )}
                <p className="text-sm text-muted-foreground">{task.description || "No description provided"}</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant={task.status === "Completed" ? "standard" : "dot"}>{task.status}</Badge>
                    <Badge variant="standard">{task.priority}</Badge>
                </div>
                {task.tags && (
                    <div className="flex flex-wrap gap-2">
                        {task.tags.split(',').map((tag, index) => (
                            <Chip key={index} label={tag} variant="outlined" />
                        ))}
                    </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                        {task.startDate ? format(new Date(task.startDate), "PP") : "Not set"}
                        {" - "}
                        {task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"}
                    </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{task.assignee ? task.assignee.username : "Unassigned"}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard
