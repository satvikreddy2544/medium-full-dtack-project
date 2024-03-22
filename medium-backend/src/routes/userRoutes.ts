import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings } from "hono/types";
import { decode, sign, verify } from "hono/jwt";
import { signinInput } from "medium_backend_common_new_v2";
import {singupInput} from 'medium_backend_common_new_v2'
const userRoutes = new Hono<{

    Bindings: {
      SECRET_KEY: string;
      DATABASE_URL: string;
    };
  }>();

userRoutes.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const { username, password, name } = await c.req.json();
    console.log(username, password, name);
    const body =await c.req.json();
    console.log('body is',body);
    const res = singupInput.safeParse(body);
    console.log(`res is `,res)
    if(!res.success){

      c.status(411);
      return c.json({
        msg : `incorrect inputs`
      })
    }
  
    try {
      const res = await prisma.user.create({
        data: {
          username: username,
          password: password,
          name: name,
        },
      });
  
      console.log(res);
  
      const token = await sign({ id:res.id }, c.env.SECRET_KEY);
      c.status(200);
      return c.json({
        msg: "acc created succesfiully !!",
        token,
      });
    } catch (e) {
      c.status(411);
      return c.json({
        msg: `error occured during sign up ${e}`,
      });
    }
  });
  
  userRoutes.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const { username, password } = await c.req.json();
    const {success} = signinInput.safeParse({
      username,
      password
    });
    if(!success){

      c.status(411);
      return c.json({
        msg : `incorrect inputs`
      })
    }
    console.log(username)
    try{
  
      const res = await prisma.user.findUnique({
        where:{
          username:username
        }
      })
      if(res){
      
      const token = await sign({id : res.id},c.env.SECRET_KEY)
      console.log("res",res);
      c.status(200);
      return  c.json({
          msg : `login success`,
          token
      })
    }else{
      c.status(411);
      return c.json({
        msg : `user not found`
      })
    }
  
    }
    catch(e){
        c.status(411);
        c.json({
          msg : `error occured during login ${e}`
        })
    }
  });
  
  userRoutes.get("/getAll",async (c) =>{
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const allrec = await prisma.user.findMany();
    return c.json({
      allrec,
    })
  });
  
  

export default userRoutes;