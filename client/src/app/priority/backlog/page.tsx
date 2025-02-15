'use client'
import React from 'react'
import ReusablePriorityPage from '../resuablePriorityPage'
import { Priority } from '@/state/api'

type Props = {}

const Backlog = (props: Props) => {
    return (
        <ReusablePriorityPage priority={Priority.Backlog} />
    )
}

export default Backlog