import React from 'react'
import { CloudUpload } from 'lucide-react'

function Footer() {
  return (
    <div>
       <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-400 py-12 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-xl">
              <CloudUpload className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">BoxDrop</h2>
          </div>

          <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BoxDrop. Built with ❤️ for your memories.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Made for personal use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer