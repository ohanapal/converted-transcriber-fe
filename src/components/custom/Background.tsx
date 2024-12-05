
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Info, Loader2, Moon, Power, Sun } from 'lucide-react'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'sonner'


export function Background() {
    const [status, setStatus] = useState("Idle")
    const [monitors, setMonitors] = useState("")
    const [speakers, setSpeakers] = useState(1)
    const [botId, setBotId] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const SERVER_URL = "https://transcribe-python.ohanapal.bot"

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const handleStart = async () => {
        if (!monitors || speakers < 1 || !botId) {
            toast("Please fill in all fields correctly!", {
                description: "Without filling this you won't get any results",
            })
            return
        }

        setStatus("Starting...")
        setIsProcessing(true)

        try {
            const response = await fetch(`${SERVER_URL}/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedMonitors: monitors,
                    speakers,
                    botId,
                }),
            })

            const result = await response.json()
            if (response.ok) {
                setStatus(result.message)
                setIsRunning(true)
            } else {
                throw new Error(result.error || "Failed to start process")
            }
        } catch (error: any) {
            setStatus(`Error: ${error.message}`)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleStop = async () => {
        setStatus("Stopping...")
        setIsProcessing(true)

        try {
            const response = await fetch(`${SERVER_URL}/stop`, {
                method: "POST",
            })

            const result = await response.json()
            if (response.ok) {
                setStatus(result.message)
                setIsRunning(false)
            } else {
                throw new Error(result.error || "Failed to stop process")
            }
        } catch (error: any) {
            setStatus(`Error: ${error.message}`)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className='relative'>
            <div className="absolute inset-0 z-0 bg-gray-100">
                <BackgroundBeamsWithCollision>
                    <div className="w-full max-w-md z-10">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">

                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    AI Transcriber
                                </h1>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className="text-purple-600 dark:text-purple-400"
                                >
                                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="monitors" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center ">
                                        Monitors
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="ml-2 h-4 w-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Eg. 1, 2, 3 or 'all'
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="monitors"
                                        placeholder="Enter monitor numbers or 'all'"
                                        value={monitors}
                                        onChange={(e) => setMonitors(e.target.value)}
                                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="speakers" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center ">
                                        Number of Speakers
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="ml-2 h-4 w-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        How many speakers are there?
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>

                                    <Input
                                        type="number"
                                        id="speakers"
                                        min="1"
                                        value={speakers}
                                        onChange={(e) => setSpeakers(Number(e.target.value))}
                                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="botId" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center ">
                                        Bot ID
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="ml-2 h-4 w-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Enter Bot ID from Argobots that you want to train
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>

                                    <Input
                                        type="text"
                                        id="botId"
                                        placeholder="Enter Bot ID"
                                        value={botId}
                                        onChange={(e) => setBotId(e.target.value)}
                                        className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={isRunning ? handleStop : handleStart}
                                    className={`w-full ${isRunning
                                        ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                                        : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                        } text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    {isRunning ? 'Stop Transcription' : 'Start Transcription'}
                                </Button>

                                <div className="mt-4 font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center justify-between pe-1">
                                    <div className='flex items-center justify-start gap-2'>
                                        <Power className="h-5 w-5" />
                                        Status:
                                    </div>
                                    <span className="text-purple-600 dark:text-purple-400 animate-pulse">
                                        {status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </BackgroundBeamsWithCollision >
            </div>
        </div>
    )
}

