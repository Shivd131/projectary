'use client'
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'

type Props = {
    params: { id: string }
}

const Project = (props: Props) => {
    const { id } = props.params
    const [activeTab, setActiveTab] = useState("tasks")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    )
}

export default Project