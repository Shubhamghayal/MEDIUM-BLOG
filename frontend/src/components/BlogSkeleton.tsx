export const BlogSkeleton=()=>{
    
    
    return ( <div className="border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col pl-2 space-y-1">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
        <div className="text-slate-400 text-sm font-thin pt-4">
          <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    
)}