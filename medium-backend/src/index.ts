import { Hono } from "hono";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import { cors } from "hono/cors";


const app = new Hono<{
  Bindings: {
    SECRET_KEY: string;
    DATABASE_URL: string;
  };
}>();

app.route('/api/v1/user',userRoutes);
app.route('/api/v1/blog',blogRoutes);
app.use(cors())

app.get("/", (c) => {
  return c.text("Hello Hono!");
});



export default app;
