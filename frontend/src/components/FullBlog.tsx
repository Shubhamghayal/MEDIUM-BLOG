import {Blog} from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"



export const FullBlog=({blog}:{blog:Blog})=>{

    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8 ">
                    <div className="text-4xl font-extrabold">
                    {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 12 Nov

                    </div>
                    <div className="pt-4 text-lg overflow-auto max-h-screen">
                    {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className=" flex w-full">
                        <div className="pr-4 flex flex-col justify-center pt-2">
                            <Avatar name={blog.author?.name || "Anonymous"}/>

                        </div>
                        <div className=" font-bold text-lg pt-1">
                        {blog.author?.name || "Anonymous"}
                        </div>
                        
                    </div>
                    <div className="text-slate-400 pt-2">
                        Random Catch phase will be added next version in backend soon
                        </div>


            </div>
            
            
            </div>
        </div>
    </div>


}