import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return<div>
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

  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-2">
        <div>
          
          {blogs.map(blog => (
            <BlogCard 
              id={blog.id}
              authorName={blog.author?.name || "Anonymous"}
              publishDate={"12Nov"}
              title={blog.title}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
