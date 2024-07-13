import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify } from 'hono/jwt';
import { createPostInput,updatePostInput } from '@dednesto/medium-common';

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET: string;
    },
    Variables:{
        userId: string;
    }
}>()

blogRouter.use("/*",async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    try {
        const user=await verify(authHeader,c.env.JWT_SECRET) as { id: string }
    if(user){
        c.set("userId",user.id)
        await next()
    }else{
        c.status(403);
        return c.json({
            msg:"you re not logged IN"
        })
    }
        
    } catch (e) {
        c.status(403);
        return c.json({
            msg:"you re not logged IN"
        })
        
    }
})
blogRouter.post('/blog',async(c)=>{
    const body=await c.req.json();
    const {success}=createPostInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg:"inputs not correct in create post"
		})}
    const authorId=c.get("userId")
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

   
    const post=await prisma.post.create({
        data:{
            title: body.title,
            content :body.content,
            authorId: authorId
        }
    })

    return c.json({
        id:post.id
    })
  })
  
  
blogRouter.put('/:id',async(c)=>{
    const body=await c.req.json();
    const {success}=updatePostInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg:"inputs not correct in updatePost"
		})}
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    
    const post=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title: body.title,
            content :body.content
        }
    })

    return c.json({
        id:post.id
    })
  })

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const post=await prisma.post.findMany();
    return c.json({post})
  })
  
blogRouter.get('/:id',async(c)=>{
    const id= c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
    try {
        const post=await prisma.post.findFirst({
            where:{
                id:id,
            },
        })
        return c.json({
            post
        })
        
    } catch (e) {
        c.status(411);
        return c.json({
            msg:"error while fetching blog post"
        }) 
    }
  })
  
  