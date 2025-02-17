import React from "react"
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/app/redux"
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state"
import { useGetAuthUserQuery } from "@/state/api"
import { signOut } from "aws-amplify/auth"
import Image from "next/image"
const Navbar = () => {
    const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
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
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex items-center gap-6">
                {isSidebarCollapsed && (
                    <button
                        onClick={() => dispatch(setIsSidebarCollapsed(false))}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                )}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        className="h-10 w-64 pl-9 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
                        type="search"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {isDarkMode ? (
                        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-500" />
                    )}
                </button>
                <Link
                    href="/settings"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Link>
                <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
                <div className="hidden items-center justify-between md:flex">
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
                        className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar