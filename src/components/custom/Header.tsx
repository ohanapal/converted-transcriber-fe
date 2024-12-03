import { MicIcon } from 'lucide-react'

export function Header() {
    return (
        <header className="w-full bg-gray-800 p-4 shadow-md ">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <MicIcon className="h-6 w-6 text-blue-400" />
                    <span className="text-xl font-bold text-white">Argobots Transcriber</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="https://www.argobots.chat/" target="_blank" className="text-gray-300 hover:text-white">Argobots</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

