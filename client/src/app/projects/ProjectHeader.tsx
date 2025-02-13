import React, { useState } from 'react'
import { Clock, Filter, Grid3x3, List, PlusSquare, Search, Share2, Table } from 'lucide-react'
import ModalNewProject from './ModalNewProject';

const ProjectHeader = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      >

      </ModalNewProject>
      <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product Design Development
            </h1>
          </div>
          <button
            onClick={() => setIsModalNewProjectOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <PlusSquare className="h-4 w-4" />
            New Board
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex space-x-4">
            <TabButton name="Board" icon={Grid3x3} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="List" icon={List} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="Timeline" icon={Clock} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="Table" icon={Table} activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Filter className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Share2 className="h-5 w-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search tasks..."
                className="w-full rounded-lg border-gray-200 bg-gray-50 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ name, icon: Icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab === name

  return (
    <button
      onClick={() => setActiveTab(name)}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
        }`}
    >
      <Icon className="h-4 w-4" />
      {name}
    </button>
  )
}

interface TabButtonProps {
  name: string
  icon: React.ElementType
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default ProjectHeader