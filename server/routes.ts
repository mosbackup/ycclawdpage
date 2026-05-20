import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAllPosts, getPost } from "./blog";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/posts", async (_req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
  });

  app.get("/api/posts/:slug", async (req, res) => {
    const { slug } = req.params;
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ message: "Invalid slug" });
    }
    const post = await getPost(slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  return httpServer;
}
