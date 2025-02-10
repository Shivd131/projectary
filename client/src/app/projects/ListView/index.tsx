import Header from '@/app/(components)/Header'
import { Task as TaskType, useGetTasksQuery } from '@/state/api'
import { Plus } from 'lucide-react'
import React from 'react'

const ListView = ({ id, setIsModalNewTaskOpen }: { id: string; setIsModalNewTaskOpen: (isOpen: boolean) => void }) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) })

    if (isLoading) return <div className="flex h-96 items-center justify-center">Loading...</div>
    if (error) return <div className="flex h-96 items-center justify-center text-red-500">Error occurred</div>

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Tasks</h2>
                <button
                    onClick={() => setIsModalNewTaskOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    New Task
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasks?.map((task) => (
                    <div key={task.id} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${PRIORITY_STYLES[task.priority || 'Low']}`}>
                                {task.priority}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {task.status}
                            </span>
                        </div>
                        <h3 className="mt-2 font-medium text-gray-900 dark:text-white">
                            {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {task.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const PRIORITY_STYLES: Record<string, string> = {
    Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Medium: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export default ListView