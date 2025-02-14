"use client"

import Header from "../(components)/Header"
import ProjectCard from "../(components)/ProjectCard"
import TaskCard from "../(components)/TaskCard"
import UserCard from "../(components)/UserCard"
import { useSearchQuery } from "@/state/api"
import { debounce } from "lodash"
import type React from "react"
import { useEffect, useState } from "react"

import { SearchIcon } from "lucide-react"
import { Input } from "@mui/material"
import { useAppSelector } from "../redux"

const Search = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const [searchTerm, setSearchTerm] = useState("")
    const {
        data: searchResults,
        isLoading,
        isError,
    } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3,
    })

    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }, 500)

    useEffect(() => {
        return handleSearch.cancel
    }, [handleSearch])

    return (
        <div className="p-4 md:p-8 space-y-6 ">
            <Header name="Search" />
            <div className="relative dark:text-white">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search for tasks, projects, or users..."
                    className={`pl-10 w-full md:w-2/3 lg:w-1/2 dark:text-white`}
                    onChange={handleSearch}
                />
            </div>
            <div className="space-y-6">
                {isLoading && <p className="text-muted-foreground">Loading...</p>}
                {isError && <p className="text-destructive">Error occurred while fetching search results.</p>}
                {!isLoading && !isError && searchResults && (
                    <div className="space-y-8 dark:text-white">
                        {searchResults.tasks && searchResults.tasks.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {searchResults.tasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchResults.projects && searchResults.projects.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {searchResults.projects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchResults.users && searchResults.users.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Users</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {searchResults.users.map((user) => (
                                        <UserCard key={user.userId} user={user} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search

