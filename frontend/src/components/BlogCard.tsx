import { Link } from "react-router-dom";

interface BlogCardProps{
    id:number;
    authorName:string;
    publishDate:string;
    title:string;
    content:string;
    


}

export const BlogCard=({id,authorName,publishDate,title,content}:BlogCardProps)=>{
    
    return <Link  to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar name={authorName}/>
            
            <div className="flex justify-center flex-col font-extralight pl-2 text-sm">{authorName}</div>
            <div className="flex justify-center flex-col pl-2 text-sm">{publishDate}</div>
            </div>
        <div  className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
        {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minutes(s) read`}
        </div>

    </div></Link>
}


export function Avatar({name}:{name:string}){
    return(
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
    
   

}
