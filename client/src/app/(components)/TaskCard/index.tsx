import { Task as TaskType } from '@/state/api'
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react'

type Props = {
    task: TaskType;
}

const TaskCard = (props: Props) => {
    return (
        <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
            {props.task.attachments && props.task.attachments.length > 0 && (
                <div>
                    <strong>Attachments:</strong>
                    <div className="flex flex-wrap">
                        {props.task.attachments && props.task.attachments.length > 0 && (
                            <Image
                                src={`/${props.task.attachments[0].fileURL}`}
                                alt={props.task.attachments[0].fileName}
                                width={400}
                                height={200}
                                className="rounded-md"
                            />
                        )}
                    </div>
                </div>
            )}
            <p>
                <strong>ID:</strong> {props.task.id}
            </p>
            <p>
                <strong>Title:</strong> {props.task.title}
            </p>
            <p>
                <strong>Description:</strong>{" "}
                {props.task.description || "No description provided"}
            </p>
            <p>
                <strong>Status:</strong> {props.task.status}
            </p>
            <p>
                <strong>Priority:</strong> {props.task.priority}
            </p>
            <p>
                <strong>Tags:</strong> {props.task.tags || "No tags"}
            </p>
            <p>
                <strong>Start Date:</strong>{" "}
                {props.task.startDate ? format(new Date(props.task.startDate), "P") : "Not set"}
            </p>
            <p>
                <strong>Due Date:</strong>{" "}
                {props.task.dueDate ? format(new Date(props.task.dueDate), "P") : "Not set"}
            </p>
            <p>
                <strong>Author:</strong>{" "}
                {props.task.author ? props.task.author.username : "Unknown"}
            </p>
            <p>
                <strong>Assignee:</strong>{" "}
                {props.task.assignee ? props.task.assignee.username : "Unassigned"}
            </p>
        </div>
    )
}

export default TaskCard