import Link from "next/link"

import { navigation } from "@/utils"

const Navbar = () => {
  return (
    <header>
        <nav className="flex flex-col sm:flex-row sm:items-center bg-white">
            <h2 className="p-4 bg-blue-400 text-white sm:w-fit rounded-sm">Front-End</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center py-2 px-2 sm:px-4 gap-2 sm:gap-4">
                {navigation.map((nav, idx) => (
                    <Link href={nav.link} key={idx} className="text-lg hover:border-b-2 hover:text-gray-400">
                        {nav.name}
                    </Link>
                ))}
            </div>
        </nav>
    </header>
  )
}

export default Navbar