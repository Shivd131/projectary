'use client'
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView'
import ListView from '../ListView'
import TimeLineView from '../TimeLineView'

type Props = {
    params: { id: string }
}

const Project = ({ params: { id } }: Props) => {
    const [activeTab, setActiveTab] = useState("Board")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            </div>
        </div>
    )
}

export default Project