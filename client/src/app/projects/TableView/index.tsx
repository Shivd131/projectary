import Header from '@/app/(components)/Header';
import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from 'react'
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const PRIORITY_STYLES: Record<string, string> = {
    Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Medium: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const STATUS_STYLES: Record<string, string> = {
    'To Do': "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    'In Progress': "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    'Under Review': "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    'Completed': "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
};

const columns: GridColDef[] = [
    {
        field: "title",
        headerName: "Title",
        width: 200,
        flex: 1
    },
    {
        field: "description",
        headerName: "Description",
        width: 250,
        flex: 1
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[params.value] || STATUS_STYLES['To Do']}`}>
                {params.value}
            </span>
        ),
    },
    {
        field: "priority",
        headerName: "Priority",
        width: 75,
        renderCell: (params) => (
            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${PRIORITY_STYLES[params.value] || PRIORITY_STYLES['Low']}`}>
                {params.value}
            </span>
        ),
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 130,
        renderCell: (params) => (
            <div className="flex gap-1 items-center h-full">
                {params.value?.split(',').map((tag: string) => (
                    <span key={tag} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {tag.trim()}
                    </span>
                ))}
            </div>
        ),
    },
    {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
        renderCell: (params) => (
            <span>
                {params.value.split('T')[0]}
            </span>
        ),
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
        renderCell: (params) => (
            <span>
                {params.value.split('T')[0]}
            </span>
        ),
    },
    {
        field: "author",
        headerName: "Author",
        width: 150,
        renderCell: (params) => params.value?.author || "Unknown",
    },
    {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        renderCell: (params) => params.value?.assignee || "Unassigned",
    },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });
    if (isLoading) return <div className="flex h-96 items-center justify-center">Loading...</div>
    if (error) return <div className="flex h-96 items-center justify-center text-red-500">Error occurred</div>

    return (
        <div className="h-[85vh] w-full px-6 pb-8">
            <div className="pt-5">
                <Header
                    name="Tasks Table"
                    buttonComponent={
                        <button
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                            onClick={() => setIsModalNewTaskOpen(true)}
                        >
                            Add Task
                        </button>
                    }
                    isSmallText
                />
            </div>
            <div className="rounded-lg bg-white shadow-sm dark:text-white">
                <DataGrid
                    rows={tasks || []}
                    columns={columns}
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                />
            </div>
        </div>
    );
}

export default TableView