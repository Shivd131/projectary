"use client"
import React from "react"
import { type Priority, type Task, Status, useGetProjectsQuery, useGetTasksQuery } from "@/state/api"
import { useAppSelector } from "../redux"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import Header from "../(components)/Header"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { FormControl, MenuItem, Select, Paper, Typography } from "@mui/material"
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils"

const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
]

const HomePage = () => {
    const [selectedProject, setSelectedProject] = React.useState<string>("")
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery()
    const {
        data: tasks,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useGetTasksQuery({ projectId: Number.parseInt(selectedProject) }, { skip: !selectedProject })

    React.useEffect(() => {
        if (projects && projects.length > 0 && !selectedProject) {
            setSelectedProject(projects[0].id.toString())
        }
    }, [projects, selectedProject])

    if (isProjectsLoading || tasksLoading) return <div>Loading..</div>
    if (tasksError || !tasks || !projects) return <div>Error fetching data</div>

    const priorityCount = tasks.reduce((acc: Record<string, number>, task: Task) => {
        const { priority } = task
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1
        return acc
    }, {})

    const taskDistribution = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }))

    const taskStatusCount = tasks.reduce((acc: Record<string, number>, task: Task) => {
        const status = task.status || Status.ToDo
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {})

    const taskStatusDistribution = Object.keys(taskStatusCount).map((key) => ({
        name:
            key === Status.ToDo
                ? "To Do"
                : key === Status.WorkInProgress
                    ? "In Progress"
                    : key === Status.UnderReview
                        ? "Under Review"
                        : "Completed",
        count: taskStatusCount[key],
        value: taskStatusCount[key],
    }))

    const chartColors = isDarkMode
        ? {
            primary: "#90caf9",
            secondary: "#ce93d8",
            background: "#424242",
            text: "#ffffff",
            grid: "#555555",
            pieColors: ["#90caf9", "#ce93d8", "#4fc3f7", "#81c784"],
        }
        : {
            primary: "#1976d2",
            secondary: "#9c27b0",
            background: "#ffffff",
            text: "#000000",
            grid: "#e0e0e0",
            pieColors: ["#1976d2", "#9c27b0", "#00acc1", "#43a047"],
        }

    return (
        <div className="container h-full w-full p-8">
            <Header name="Project Management Dashboard" />

            <FormControl fullWidth variant="outlined" className="mb-6 dark:text-white">
                <Select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="bg-white dark:bg-dark-secondary dark:text-white"
                >
                    {projects.map((project) => (
                        <MenuItem
                            key={project.id}
                            value={project.id}
                            className="dark:bg-dark-secondary dark:text-gray-400 focus:text-black hover:text-black hover:bg-white"
                        >
                            {project.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 dark:dark:bg mt-4">
                <Paper elevation={3} className="p-4 dark:bg-dark-bg border border-gray-300 dark:border-gray-700 shadow-md">
                    <Typography variant="h6" className="mb-4 dark:text-white">
                        Task Priority Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                            <XAxis dataKey="name" stroke={chartColors.text} />
                            <YAxis stroke={chartColors.text} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: chartColors.background,
                                    color: chartColors.text,
                                    border: "none",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill={chartColors.primary} />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper elevation={3} className="p-4 dark:bg-dark-bg border border-gray-300 dark:border-gray-700 shadow-md">
                    <Typography variant="h6" className="mb-4 dark:text-white">
                        Task Status Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={taskStatusDistribution}
                                label={({ name, value }) => `${name} (${value})`}
                                labelLine={false}
                            >
                                {taskStatusDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={chartColors.pieColors[index % chartColors.pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: chartColors.background,
                                    color: chartColors.text,
                                    border: "none",
                                }}
                                formatter={(value, name) => [`${value} tasks`, name]}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper
                    elevation={3}
                    className="p-4 md:col-span-2 dark:bg-dark-bg border border-gray-300 dark:border-gray-700 shadow-md"
                >
                    <Typography variant="h6" className="mb-4 dark:text-white">
                        Your Tasks
                    </Typography>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={tasks}
                            columns={taskColumns}
                            checkboxSelection
                            loading={tasksLoading}
                            getRowClassName={() => "data-grid-row"}
                            getCellClassName={() => "data-grid-cell"}
                            className={dataGridClassNames}
                            sx={dataGridSxStyles(isDarkMode)}
                        />
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default HomePage

