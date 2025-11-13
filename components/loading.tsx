import { Loader } from "lucide-react"

interface LoadingProps {
  text?: string; // The '?' makes the 'test' prop optional
}

export default function Loading({ text = "Loading, please wait..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin inline-block">
          <Loader className="h-12 w-12 text-primary" />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600">{text}</p>
      </div>
    </div>
  )
}