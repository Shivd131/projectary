"use client"

import { useState } from "react"
import { useAppSelector } from "@/app/redux"
import Header from "@/app/(components)/Header"
import ModalNewTask from "@/app/projects/[id]/ModalNewTask"
import TaskCard from "@/app/(components)/TaskCard"
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils"
import { type Priority, type Task, useGetAuthUserQuery, useGetTasksByUserQuery } from "@/state/api"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"

type Props = {
  priority: Priority
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
]

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list")
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetails?.userId ?? null;

  const { data: tasks, isLoading, isError: isTasksError } = useGetTasksByUserQuery(userId || 0, { skip: userId === null })

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  const filteredTasks = tasks?.filter((task: Task) => task.priority === priority)

  if (isTasksError || !tasks) return <div className="text-center text-red-500">Error fetching tasks</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)} />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-6 mt-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            className={`rounded-l-lg border px-4 py-2 text-sm font-medium transition-colors focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${view === "list"
              ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            onClick={() => setView("list")}
          >
            List
          </button>
          <button
            className={`rounded-r-lg border px-4 py-2 text-sm font-medium transition-colors focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${view === "table"
              ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            onClick={() => setView("table")}
          >
            Table
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="h-[600px] w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={`${dataGridClassNames} rounded-lg border-none shadow-md`}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  )
}

export default ReusablePriorityPage

