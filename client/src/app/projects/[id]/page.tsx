'use client'
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView'

type Props = {
    params: { id: string }
}

const Project = (props: Props) => {
    const { id } = props.params
    const [activeTab, setActiveTab] = useState("tasks")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div>
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && (
                <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
        </div>


    )
}

export default Project