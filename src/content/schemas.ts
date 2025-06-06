import { z, defineCollection } from "astro:content";

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    bannerImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
    externalUrl: z.string().url().optional(),
});

const personalSchema = z.object({
    name: z.string(),
    bio: z.string(),
    role: z.string(),
    url: z.string().url(),
    github: z.string().url(),
    linkedin: z.string().url(),
    email: z.string().email(),
    summary: z.string(),
    phone: z.string().optional(),
});

const experienceSchema = z.object({
    date: z.string(),
    title: z.string(),
    order: z.number(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type PersonalSchema = z.infer<typeof personalSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const personalCollection = defineCollection({ schema: personalSchema });
const experienceCollection = defineCollection({ schema: experienceSchema });

export const collections = {
    'blog': blogCollection,
    'personal': personalCollection,
    'experience': experienceCollection,
}
