
import { Header } from '@/components/custom/Header'
import { Background } from './components/custom/Background'
import { Toaster } from 'sonner'

export default function AITranscriberForm() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <div className="flex-grow relative ">
        <Background />
      </div>
    </div>
  )
}

