'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { useGetAuthUserQuery, useGetProjectsQuery } from '@/state/api'
import { signOut } from 'aws-amplify/auth'

const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true)
    const [showPriority, setShowPriority] = useState(true)
    const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const { data: projects } = useGetProjectsQuery()

    const sidebarClassNames = `${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'} bg-white dark:bg-gray-900 flex flex-col h-full shadow-lg transition-all duration-300 ease-in-out border-r border-gray-100 dark:border-gray-800`
    const { data: currentUser } = useGetAuthUserQuery({});

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out", error);
        }
    }
    if (!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;
    return (
        <div className={sidebarClassNames}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
                        PROJECTORY
                    </span>
                    {!isSidebarCollapsed && (
                        <button
                            onClick={() => dispatch(setIsSidebarCollapsed(true))}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    )}
                </div>

                <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Image
                                src="/logo.png"
                                alt="Team Logo"
                                width={36}
                                height={36}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                SHIV'S TEAM
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <LockIcon className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-400">Private</span>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="space-y-1">
                        <SidebarLink icon={Home} label="Home" href="/" />
                        <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
                        <SidebarLink icon={Search} label="Search" href="/search" />
                        <SidebarLink icon={Settings} label="Settings" href="/settings" />
                        <SidebarLink icon={User} label="Users" href="/users" />
                        <SidebarLink icon={Users} label="Teams" href="/teams" />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setShowProjects(prev => !prev)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                            <span>Projects</span>
                            {showProjects ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                        {showProjects && projects?.map((project) => (
                            <SidebarLink
                                key={project.id}
                                icon={Briefcase}
                                label={project.name}
                                href={`/projects/${project.id}`}
                            />
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setShowPriority(prev => !prev)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                            <span>Priority</span>
                            {showPriority ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                        {showPriority && (
                            <div className="mt-1 space-y-1">
                                <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" />
                                <SidebarLink icon={ShieldAlert} label="High" href="/priority/high" />
                                <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium" />
                                <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
                                <SidebarLink icon={Layers3} label="Backlog" href="/priority/backlog" />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
                <div className="flex w-full items-center">
                    <div className="align-center flex h-9 w-9 justify-center">
                        {!!currentUserDetails?.profilePictureUrl ? (
                            <Image
                                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                                alt={currentUserDetails?.username || "User Profile Picture"}
                                width={100}
                                height={50}
                                className="h-full rounded-full object-cover"
                            />
                        ) : (
                            <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
                        )}
                    </div>
                    <span className="mx-3 text-gray-800 dark:text-white">
                        {currentUserDetails?.username}
                    </span>
                    <button
                        className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    )
}

interface SidebarLinkProps {
    href: string
    icon: LucideIcon
    label: string
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard")

    return (
        <Link href={href}>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}>
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                <span className="text-sm font-medium">{label}</span>
            </div>
        </Link>
    )
}

export default Sidebar