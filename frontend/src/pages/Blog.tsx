import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";


export const Blog=()=>{
    const{id}=useParams()
    const {loading,blog}=useBlog({
        id:id||""
    });

    if (loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-screen-md space-y-4">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
      </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}