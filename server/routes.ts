import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertOrderSchema, contactFormSchema, insertVideoSchema, type User } from "@shared/schema";
import { z } from "zod";
import { verifyAuth, requireAdmin, type AuthRequest } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      
      if (category && typeof category === "string") {
        // "featured" returns all products
        if (category.toLowerCase() === "featured") {
          const products = await storage.getAllProducts();
          res.json(products);
        } else {
          const products = await storage.getProductsByCategory(category);
          res.json(products);
        }
      } else {
        const products = await storage.getAllProducts();
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Appointments API
  app.get("/api/appointments", verifyAuth, requireAdmin, async (req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      
      // In a real app, this would integrate with Razorpay
      // For now, we'll just create the appointment
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await storage.getAppointmentById(id);
      
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  });

  // Orders API
  app.get("/api/orders", verifyAuth, requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      
      // In a real app, this would integrate with Razorpay
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrderById(id);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real app, this would send an email or save to database
      console.log("Contact form submission:", validatedData);
      
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Newsletter Subscription API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Valid email required" });
      }
      
      // In a real app, this would save to database and send welcome email
      console.log("Newsletter subscription:", email);
      
      res.status(200).json({ message: "Subscribed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // Product creation endpoint - Admin only
  app.post("/api/products", verifyAuth, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const productData = req.body;
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Product creation error:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Admin APIs
  app.get("/api/orders", async (req, res) => {
    try {
      const orders: any[] = [];
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await Promise.all(
        Array.from(new Map(storage["appointments"]).values() || [])
      );
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  // Videos API
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", verifyAuth, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.status(201).json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  // Blog API - Admin only for creation
  app.post("/api/blog", verifyAuth, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const blogData = req.body;
      const post = await storage.createBlogPost(blogData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Blog creation error:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  // Razorpay Integration (Placeholder - keys and actual payment processing are placeholders)
  app.post("/api/payment/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      
      // Placeholder: Mock Razorpay order response
      const mockOrder = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: Math.round(amount * 100), // Razorpay uses paise
        currency,
        status: "created"
      };
      
      res.json(mockOrder);
    } catch (error) {
      console.error("Payment order error:", error);
      res.status(500).json({ error: "Failed to create payment order" });
    }
  });

  app.post("/api/payment/verify-appointment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentData } = req.body;
      
      // Placeholder: Mock verification - in production, verify with Razorpay
      // For now, all payments are simulated as successful
      const validatedData = insertAppointmentSchema.parse({
        ...appointmentData,
        paymentStatus: "completed",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
      });

      const appointment = await storage.createAppointment(validatedData);
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });

  // Users API
  app.post("/api/users", async (req, res) => {
    try {
      const { id, email, isAdmin, accountType, fullName } = req.body;

      if (!id || !email) {
        return res.status(400).json({ error: "Missing required fields: id and email" });
      }

      const user: User = {
        id,
        email,
        isAdmin: isAdmin || false,
        accountType: accountType || "customer",
        fullName: fullName || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const savedUser = await storage.createOrUpdateUser(user);
      res.json(savedUser);
    } catch (error) {
      console.error("User save error:", error);
      res.status(500).json({ error: "Failed to save user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
