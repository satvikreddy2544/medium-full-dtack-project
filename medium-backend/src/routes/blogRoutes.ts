import { Hono } from "hono";

import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings } from "hono/types";
import { decode, sign, verify } from "hono/jwt";
import { timing } from "hono/timing";
import { blogEditInput } from "medium_backend_common_new_v2";
import { cors } from "hono/cors";



const blogRoutes = new Hono<{
  Bindings: {
    SECRET_KEY: string;
    DATABASE_URL: string;
  };
  Variables: {
    authorId: number;
  };
}>();

blogRoutes.use(cors())

blogRoutes.use("/*", async (c, next) => {
  const headers = c.req.header("Authorization");
  console.log(headers);
  try {
    if (headers) {
      const headeraData = headers.split(" ");
      const token = headeraData[1];
      console.log("token", token);
      const ver = await verify(token, c.env.SECRET_KEY);
      console.log(ver);
      if (ver.id) {
        c.set("authorId", ver.id);
        await next();
      } else {
        c.status(403);
        return c.json({
          msg: `auth failed plz check token and try again !!`,
        });
      }
    } else {
      c.status(403);
      return c.json({
        msg: "invalid token",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "invalid token",
    });
  }
});

blogRoutes.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content } = await c.req.json();
  console.log(title,content);

  try {
    const res = await prisma.blog.create({
      data: {
        title,
        content,
        authorid: c.get("authorId"),
      },
    });

    console.log(res);
    c.status(200);
    return c.json({
      msg: `blog added succesfully`,
      id: res.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: `error occures while adding blog`,
    });
  }
});

blogRoutes.get("/getBlog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //   const? {title} = await c.req.json();
  const id = c.req.param("id");

  try {
    const res = await prisma.blog.findFirst({
      where: {
        id: parseInt(id),
      },
      select:{
        title:true,
        content:true,
        author:{
          select:{
            username:true
          }
        }
      }
    });

    console.log(res);
    c.status(200);
    if (res) {
      return c.json({
        res,
        params: "params",
      });
    } else {
      c.status(403);
      return c.json({
        msg: `blog not found with title ${id}`,
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: `error occured ${id}`,
    });
  }
});

blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.blog.findMany({
      where:{

      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            username:true
          }
        }

      }
    });
  

    c.status(200);
    return c.json({
      res,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      msg: `error occures while fetching blogs!!`,
    });
  }
});

blogRoutes.put("/edit", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const title = body.title || "";
  const content = body.content || "";
  const id = body.id; 
  
  const ver = blogEditInput.safeParse({
    title,
    content,
    id
  });

  if(!ver.success){

    c.status(411);
    return c.json({
      msg : `plz check the inputs`
    })
  }

  try {
    const res = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: title,
        content: content,
      },
    });

    console.log(res);
    c.status(200);
    return c.json({
      res
    })
  } catch (e) {
    c.status(403);
    return c.json({
      msg: `error occured while updating the blog ${id}`,
    });
  }
});
export default blogRoutes;
