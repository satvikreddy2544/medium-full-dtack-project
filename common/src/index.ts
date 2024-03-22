import z from 'zod';

export const singupInput = z.object({

    username : z.string().min(3),
    password : z.string().min(3),
    name : z.string().optional()
});

export const signinInput = z.object({
    username : z.string().min(3),
    password : z.string().min(3)
});

export const blogInput = z.object({

    title : z.string(),
    content : z.string()
});

export const blogEditInput = z.object({

    title : z.string(),
    content : z.string(),
    id : z.number()
})

export type SignUpInput = z.infer<typeof singupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type BlogInput  = z.infer<typeof blogInput>;
export type BlogEditInput = z.infer<typeof blogEditInput>;




