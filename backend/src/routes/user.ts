
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput ,signupInput} from "@dednesto/medium-common";

export const userRouter=new Hono<{
      Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string
      }

}>()


userRouter.post('signup', async (c) => {
	const body = await c.req.json();
	console.log(body)
	const {success}=signupInput.safeParse(body);
	if(!success){
		c.status(400);
		return c.json({
			msg:"inputs not correct in signup"
		})
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})



userRouter.post('signin',async(c)=>{
	const body= await c.req.json();
	const {success}=signinInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg:"inputs not correct in signin"
		})
	}

  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  
  const user=await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })

  if (!user){
    c.status(400);
    return c.json({error:"errorn in sign in"})
  }

  const jwt=await sign({id:user.id},c.env.JWT_SECRET)
  return c.json({jwt})
})
