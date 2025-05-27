import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin inline-block">
          <Loader className="h-12 w-12 text-primary" />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  )
}