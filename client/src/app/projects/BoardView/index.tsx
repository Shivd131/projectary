import { Task as TaskType, useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import { EllipsisVertical, Plus } from 'lucide-react';
import React from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { format } from 'date-fns'
import Image from 'next/image';
type BoardProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}
const taskStatus = ['To Do', 'In Progress', 'Under Review', 'Completed']

const BoardView = (props: BoardProps) => {
    const {
        data: tasks,
        isLoading,
        error,
    } = useGetTasksQuery({ projectId: Number(props.id) });
    const [updateTaskStatus] = useUpdateTaskStatusMutation();
    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({ taskId, status: toStatus });
    }
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {JSON.stringify(error)}</div>
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4'>
                {taskStatus.map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks || []}
                        moveTask={moveTask}
                        setIsModalNewTaskOpen={props.setIsModalNewTaskOpen}
                    />
                ))}
            </div>
        </DndProvider>
    )
}

type TaskColumnProps = {
    key: string;
    status: string;
    tasks: TaskType[];
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = (props: TaskColumnProps) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: { id: number }) => props.moveTask(item.id, props.status),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const tasksCount = props.tasks.filter((task) => task.status === props.status).length;
    const statusColor: any = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#D97706",
        Completed: "#000000",
    };
    return (
        <div
            ref={(instance) => {
                drop(instance);
            }}
            className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
        >
            <div className="mb-3 flex w-full">
                <div
                    className={`w-2 !bg-[${statusColor[props.status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[props.status] }}
                />
                <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className="flex items-center text-lg font-semibold dark:text-white">
                        {props.status}{" "}
                        <span
                            className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                            {tasksCount}
                        </span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                            <EllipsisVertical size={26} />
                        </button>
                        <button
                            className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
                            onClick={() => props.setIsModalNewTaskOpen(true)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {props.tasks
                .filter((task) => task.status === props.status)
                .map((task) => (
                    <Task key={task.id} task={task} />
                ))}
        </div>
    );
}

const PRIORITY_STYLES: Record<string, string> = {
    Urgent: "bg-red-200 text-red-700",
    High: "bg-yellow-200 text-yellow-700",
    Medium: "bg-green-200 text-green-700",
    Low: "bg-blue-200 text-blue-700",
};

type PriorityTagProps = {
    priority: TaskType["priority"];
};

const PriorityTag = (props: PriorityTagProps) => {
    const priorityClass = PRIORITY_STYLES[props.priority!] || "bg-gray-200 text-gray-700";
    return (
        <div className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityClass}`}>
            {props.priority}
        </div>
    );
}

type TaskProps = {
    task: TaskType;
}
const Task = (props: TaskProps) => {
    // DRAG FUNC
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: props.task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const taskTagsSplit = props.task.tags ? props.task.tags.split(",") : [];

    // FORMAT DATE
    const formattedStartDate = props.task.startDate
        ? format(new Date(props.task.startDate), "P")
        : "";
    const formattedDueDate = props.task.dueDate
        ? format(new Date(props.task.dueDate), "P")
        : "";

    const numberOfComments = (props.task.comments && props.task.comments.length) || 0;


    return (
        <div
            ref={instance => {
                drag(instance);
            }}
            className={`flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"
                }`}
        >
            {props.task.attachments && props.task.attachments.length > 0 && (
                <Image
                    src={`/${props.task.attachments[0].fileName}`}
                    alt={props.task.attachments[0].fileName}
                    width={400}
                    height={200}
                    className="h-auto w-full rounded-t-md"
                />
            )}
            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        {props.task.priority && <PriorityTag priority={props.task.priority} />}
                        <div className="flex gap-2">
                            {taskTagsSplit.map((tag) => (
                                <div
                                    key={tag}
                                    className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                                >
                                    {" "}
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
                        <EllipsisVertical size={26} />
                    </button>
                </div>
                <div className="my-3 flex justify-between">
                    <h4 className="text-md font-bold dark:text-white">{props.task.title}</h4>
                    {typeof props.task.points === "number" && (
                        <div className="text-xs font-semibold dark:text-white">
                            {props.task.points} pts
                        </div>
                    )}
                </div>
                <div className="text-xs text-gray-500 dark:text-neutral-500">
                    {formattedStartDate && <span>{formattedStartDate} - </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-500">
                    {props.task.description}
                </p>
                <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-[6px] overflow-hidden">
                        {props.task.assignee && (
                            <Image
                                key={props.task.assignee.userId}
                                src={`/${props.task.author?.profilePictureUrl}`}
                                alt={props.task.assignee.username}
                                width={30}
                                height={30}
                                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BoardView