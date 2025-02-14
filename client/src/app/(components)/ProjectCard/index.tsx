import type { Project } from "@/state/api"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { CalendarIcon } from "lucide-react"

type Props = {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
    return (
        <Card className="dark:bg-gray-500">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                </Typography>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : "N/A"}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectCard

