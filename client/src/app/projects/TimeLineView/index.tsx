import { useAppSelector } from '@/app/redux'
import { useGetTasksQuery } from '@/state/api'
import React, { useMemo, useState } from 'react'
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css";
import { Plus } from 'lucide-react'

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-US",
    });

    const ganttTasks = useMemo(() => {
        return (
            tasks?.map((task) => ({
                start: new Date(task.startDate as string),
                end: new Date(task.dueDate as string),
                name: task.title,
                id: `Task-${task.id}`,
                type: "task" as TaskTypeItems,
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisabled: false,
            })) || []
        );
    }, [tasks]);

    const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        }));
    };

    if (isLoading) return <div className="flex h-96 items-center justify-center">Loading...</div>;
    if (error || !tasks) return <div className="flex h-96 items-center justify-center text-red-500">Error occurred</div>;

    return (
        <div className="p-6 w-[85vw]">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Project Tasks Timeline
                </h2>
                <div className="flex items-center gap-4">
                    <select
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm 
                        text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        value={displayOptions.viewMode}
                        onChange={handleViewModeChange}
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                    </select>
                    <button
                        onClick={() => setIsModalNewTaskOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
                        text-sm font-medium text-white hover:bg-blue-600"
                    >
                        <Plus className="h-4 w-4" />
                        New Task
                    </button>
                </div>
            </div>

            <div className="rounded-lg bg-white shadow-sm text-gray-500 dark:bg-[#111926]">
                <div className="max-w-full overflow-x-auto">
                    <div style={{
                        minWidth: displayOptions.viewMode === ViewMode.Month ? '768px' : '600px',
                        maxWidth: '100%'
                    }}>
                        <Gantt
                            
                            tasks={ganttTasks}
                            {...displayOptions}
                            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                            listCellWidth="100px"
                            barBackgroundColor={isDarkMode ? "#111926" : "#aeb8c2"}
                            barBackgroundSelectedColor={isDarkMode ? "#111926" : "#9ba1a6"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;