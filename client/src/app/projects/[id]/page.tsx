'use client'
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView'
import ListView from '../ListView'
import TimeLineView from '../TimeLineView'
import TableView from '../TableView'
import ModalNewTask from './ModalNewTask'

type Props = {
    params: { id: string }
}

const Project = ({ params: { id } }: Props) => {
    const [activeTab, setActiveTab] = useState("Board")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ModalNewTask
                isOpen={isModalNewTaskOpen}
                onClose={() => setIsModalNewTaskOpen(false)}
                id={id}
            />
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mx-auto max-w-screen-2xl">
                {activeTab === "Board" && (
                    <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
                {activeTab === "List" && (
                    <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
                {activeTab === "Timeline" && (
                    <TimeLineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
                {activeTab === "Table" && (
                    <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
            </div>
        </div>
    )
}

export default Project