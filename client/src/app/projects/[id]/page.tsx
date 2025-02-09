'use client'
import React, { useState } from 'react'

type Props = {
    params: { id: string }
}

const Project = (props: Props) => {
    const { id } = props.params
    const [activeTab, setActiveTab] = useState("tasks")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div>Project</div>
    )
}

export default Project