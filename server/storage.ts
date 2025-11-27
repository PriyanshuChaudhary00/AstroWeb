import { randomUUID } from "crypto";
import type {
  Product, InsertProduct,
  BlogPost, InsertBlogPost,
  Appointment, InsertAppointment,
  Testimonial, InsertTestimonial,
  Order, InsertOrder,
  Video, InsertVideo,
  CartItem,
  User
} from "@shared/schema";
import { supabaseDb, insertToDb, getFromDb } from "./supabase";

// Helper function to convert camelCase to snake_case for Supabase
function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) return obj;
  if (obj === null || typeof obj !== 'object') return obj;
  
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = obj[key];
    }
  }
  return result;
}

// Helper function to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj === null || typeof obj !== 'object') return obj;
  
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = obj[key];
    }
  }
  return result;
}

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Blog
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Appointments
  getAllAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentById(id: string): Promise<Appointment | undefined>;

  // Orders
  getAllOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;

  // Videos
  getAllVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;

  // Users
  createOrUpdateUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private appointments: Map<string, Appointment>;
  private orders: Map<string, Order>;
  private videos: Map<string, Video>;
  private users: Map<string, User>;

  constructor() {
    this.products = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.appointments = new Map();
    this.orders = new Map();
    this.videos = new Map();
    this.users = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed Products
    const productData: InsertProduct[] = [
      {
        name: "Blue Sapphire (Neelam) - 5 Carat",
        category: "Gemstones",
        price: "25000",
        description: "Natural certified Blue Sapphire gemstone known for bringing prosperity, mental clarity, and protection. This premium 5-carat stone is ideal for Saturn remedies.",
        images: [
          "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Enhances mental clarity and focus",
          "Brings financial prosperity and success",
          "Protects against negative energies",
          "Strengthens intuition and wisdom"
        ],
        certified: true,
        inStock: true,
        rating: "4.8",
        reviewCount: 127
      },
      {
        name: "Ruby (Manik) - Premium 3 Carat",
        category: "Gemstones",
        price: "35000",
        description: "Exquisite natural Ruby gemstone representing the Sun. Known for boosting confidence, leadership qualities, and vitality.",
        images: [
          "https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1611630259861-ead5f74c7e70?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Enhances leadership and authority",
          "Improves health and vitality",
          "Strengthens father-son relationships",
          "Brings name, fame, and recognition"
        ],
        certified: true,
        inStock: true,
        rating: "4.9",
        reviewCount: 98
      },
      {
        name: "Crystal Healing Bracelet - 7 Chakra",
        category: "Bracelets",
        price: "1500",
        description: "Handcrafted 7 Chakra healing bracelet made with genuine crystals. Balances all seven chakras and promotes overall well-being.",
        images: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Balances all seven chakras",
          "Promotes emotional healing",
          "Enhances positive energy flow",
          "Reduces stress and anxiety"
        ],
        certified: true,
        inStock: true,
        rating: "4.7",
        reviewCount: 215
      },
      {
        name: "Rudraksha Mala - 108 Beads (5 Mukhi)",
        category: "Rudraksha",
        price: "3500",
        description: "Authentic 5 Mukhi Rudraksha Mala with 108 beads. Blessed and energized by expert priests. Perfect for meditation and spiritual practices.",
        images: [
          "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Enhances meditation and focus",
          "Brings peace and mental clarity",
          "Protects from negative energies",
          "Improves overall health"
        ],
        certified: true,
        inStock: true,
        rating: "4.9",
        reviewCount: 156
      },
      {
        name: "Sri Yantra - Brass (6 inches)",
        category: "Yantras",
        price: "2500",
        description: "Sacred Sri Yantra made in pure brass. Energized with Vedic mantras. Brings prosperity, success, and harmony to your home or office.",
        images: [
          "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Attracts wealth and abundance",
          "Removes obstacles and negativity",
          "Enhances meditation and spiritual growth",
          "Brings harmony and peace"
        ],
        certified: true,
        inStock: true,
        rating: "4.8",
        reviewCount: 89
      },
      {
        name: "Emerald (Panna) Ring - Gold Setting",
        category: "Rings",
        price: "45000",
        description: "Premium Emerald gemstone set in 18K gold ring. Enhances communication, intellect, and business success. Ideal for Mercury remedies.",
        images: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=600&fit=crop"
        ],
        benefits: [
          "Enhances communication skills",
          "Improves business and trade",
          "Strengthens intellect and memory",
          "Brings success in education"
        ],
        certified: true,
        inStock: true,
        rating: "4.9",
        reviewCount: 67
      }
    ];

    productData.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });

    // Seed Blog Posts
    const blogData: InsertBlogPost[] = [
      {
        title: "Understanding the Power of Gemstones in Vedic Astrology",
        slug: "power-of-gemstones-vedic-astrology",
        excerpt: "Discover how gemstones can transform your life according to ancient Vedic wisdom and planetary influences.",
        content: "<p>Gemstones have been revered in Vedic astrology for thousands of years as powerful tools for balancing planetary energies and enhancing positive influences in one's life.</p><p>Each gemstone corresponds to a specific planet and wearing the right stone can help mitigate negative planetary effects while amplifying beneficial ones. The selection process requires careful analysis of your birth chart by an experienced astrologer.</p><p>It's essential to ensure that gemstones are natural, certified, and properly energized before wearing them. The quality, weight, and method of wearing all play crucial roles in their effectiveness.</p>",
        category: "Astrology",
        featuredImage: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&h=600&fit=crop",
        author: "Pandit Rajesh Sharma",
        readTime: 8,
        metaDescription: "Learn about the transformative power of gemstones in Vedic astrology and how they can balance planetary energies in your life.",
        publishedAt: new Date("2024-01-15")
      },
      {
        title: "The Spiritual Significance of Rudraksha Beads",
        slug: "spiritual-significance-rudraksha-beads",
        excerpt: "Explore the divine origins and healing properties of Rudraksha beads, sacred to Lord Shiva.",
        content: "<p>Rudraksha beads are considered sacred in Hindu tradition and are believed to be the tears of Lord Shiva. These powerful beads offer numerous spiritual and health benefits to those who wear them with devotion.</p><p>Different Mukhi (faces) of Rudraksha beads correspond to different deities and offer unique benefits. The 5 Mukhi Rudraksha is the most common and beneficial for general well-being.</p><p>Regular wearing of Rudraksha beads can help in meditation, reduce stress, and protect against negative energies. It's important to obtain genuine beads and maintain them with proper care.</p>",
        category: "Spirituality",
        featuredImage: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop",
        author: "Pandit Rajesh Sharma",
        readTime: 6,
        metaDescription: "Discover the spiritual significance and healing properties of Rudraksha beads in Hindu tradition.",
        publishedAt: new Date("2024-01-10")
      },
      {
        title: "How to Choose Your Lucky Gemstone",
        slug: "choose-lucky-gemstone",
        excerpt: "A comprehensive guide to selecting the perfect gemstone based on your zodiac sign and birth chart.",
        content: "<p>Choosing the right gemstone is a crucial decision that should be based on careful astrological analysis rather than personal preference alone.</p><p>Your birth chart reveals which planets are strong, weak, or malefic in your horoscope. A qualified astrologer can recommend gemstones that will strengthen beneficial planets and balance challenging ones.</p><p>Factors to consider include the quality of the gemstone, its weight (typically measured in carats), the metal setting, and the finger on which it should be worn. Timing of wearing is also important for maximum benefit.</p>",
        category: "Gemstones",
        featuredImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
        author: "Pandit Rajesh Sharma",
        readTime: 10,
        metaDescription: "Learn how to choose the perfect gemstone for your zodiac sign and birth chart with this comprehensive guide.",
        publishedAt: new Date("2024-01-05")
      }
    ];

    blogData.forEach(post => {
      const id = randomUUID();
      this.blogPosts.set(id, { ...post, id });
    });

    // Seed Testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Priya Sharma",
        location: "Mumbai, India",
        rating: 5,
        review: "The Blue Sapphire I purchased has brought remarkable positive changes in my life. My career has flourished and I feel more confident. The authenticity certificate gave me complete peace of mind.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        verified: true
      },
      {
        name: "Rajesh Kumar",
        location: "Delhi, India",
        rating: 5,
        review: "Excellent consultation service! Pandit Ji's guidance was precise and the remedies suggested have been very effective. The Rudraksha Mala quality is outstanding.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        verified: true
      },
      {
        name: "Anita Desai",
        location: "Bangalore, India",
        rating: 5,
        review: "I was skeptical at first, but the 7 Chakra bracelet has genuinely helped with my stress and anxiety. The quality is premium and it looks beautiful too!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        verified: true
      },
      {
        name: "Vikram Singh",
        location: "Jaipur, India",
        rating: 5,
        review: "Outstanding experience from consultation to delivery. The gemstone recommended has brought stability in my business. Highly recommend Divine Astrology!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        verified: true
      }
    ];

    testimonialData.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await getFromDb("products");
      return Array.isArray(products) ? products.map(toCamelCase) : [];
    } catch (error) {
      console.error("Error fetching products from Supabase:", error);
      return Array.from(this.products.values());
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await getFromDb("products");
      const productList = Array.isArray(products) ? products.map(toCamelCase) : [];
      return productList.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error("Error fetching products by category from Supabase:", error);
      return Array.from(this.products.values()).filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const result = await supabaseDb
        .from("products")
        .select()
        .eq("id", id)
        .single();
      return result.data ? toCamelCase(result.data) : undefined;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      return this.products.get(id);
    }
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    try {
      const id = randomUUID();
      const product = {
        id,
        ...insertProduct
      };
      // Convert to snake_case for Supabase
      const snakeCaseProduct = toSnakeCase(product);
      const result = await insertToDb("products", snakeCaseProduct);
      return toCamelCase(result) as Product;
    } catch (error) {
      console.error("Error creating product in Supabase:", error);
      const id = randomUUID();
      const product: Product = { ...insertProduct, id };
      this.products.set(id, product);
      return product;
    }
  }

  // Blog
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const posts = await getFromDb("blog_posts");
      const postList = Array.isArray(posts) ? posts.map(toCamelCase) : [];
      return postList.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error("Error fetching blog posts from Supabase:", error);
      return Array.from(this.blogPosts.values()).sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const result = await supabaseDb
        .from("blog_posts")
        .select()
        .eq("slug", slug)
        .single();
      return result.data ? toCamelCase(result.data) : undefined;
    } catch (error) {
      console.error("Error fetching blog post by slug:", error);
      return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
    }
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    try {
      const id = randomUUID();
      const post = {
        id,
        ...insertPost
      };
      // Convert to snake_case for Supabase
      const snakeCasePost = toSnakeCase(post);
      const result = await insertToDb("blog_posts", snakeCasePost);
      return toCamelCase(result) as BlogPost;
    } catch (error) {
      console.error("Error creating blog post in Supabase:", error);
      const id = randomUUID();
      const post: BlogPost = { ...insertPost, id };
      this.blogPosts.set(id, post);
      return post;
    }
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Appointments
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const data = await getFromDb("appointments");
      const appointments = Array.isArray(data) ? data : [];
      return appointments.map((apt: any) => ({
        ...apt,
        status: apt.status || "pending"
      }));
    } catch (error) {
      console.error("Error fetching appointments from Supabase:", error);
      return Array.from(this.appointments.values());
    }
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    try {
      const id = randomUUID();
      const appointment = {
        id,
        ...insertAppointment,
        created_at: new Date().toISOString()
      };
      const result = await insertToDb("appointments", appointment);
      return result as Appointment;
    } catch (error) {
      console.error("Error creating appointment in Supabase:", error);
      const id = randomUUID();
      const appointment: Appointment = {
        ...insertAppointment,
        id,
        createdAt: new Date()
      };
      this.appointments.set(id, appointment);
      return appointment;
    }
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    try {
      const result = await supabaseDb
        .from("appointments")
        .select()
        .eq("id", id)
        .single();
      const apt = result.data;
      if (!apt) return undefined;
      return {
        ...apt,
        status: apt.status || "pending"
      };
    } catch (error) {
      console.error("Error fetching appointment by id:", error);
      const apt = this.appointments.get(id);
      if (!apt) return undefined;
      return {
        ...apt,
        status: apt.status || "pending"
      };
    }
  }

  // Orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await getFromDb("orders");
      return orders || [];
    } catch (error) {
      console.error("Error fetching orders from Supabase:", error);
      return Array.from(this.orders.values());
    }
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    try {
      const id = randomUUID();
      const order = {
        id,
        ...insertOrder,
        created_at: new Date().toISOString()
      };
      const result = await insertToDb("orders", order);
      return result as Order;
    } catch (error) {
      console.error("Error creating order in Supabase:", error);
      const id = randomUUID();
      const order: Order = {
        ...insertOrder,
        id,
        createdAt: new Date()
      };
      this.orders.set(id, order);
      return order;
    }
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    try {
      const result = await supabaseDb
        .from("orders")
        .select()
        .eq("id", id)
        .single();
      return result.data || undefined;
    } catch (error) {
      console.error("Error fetching order by id:", error);
      return this.orders.get(id);
    }
  }

  // Videos
  async getAllVideos(): Promise<Video[]> {
    try {
      const videos = await getFromDb("videos");
      return Array.isArray(videos) ? videos.map(toCamelCase) : [];
    } catch (error) {
      console.error("Error fetching videos from Supabase:", error);
      return Array.from(this.videos.values());
    }
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    try {
      const id = randomUUID();
      const video = {
        id,
        ...insertVideo
      };
      // Convert to snake_case for Supabase
      const snakeCaseVideo = toSnakeCase(video);
      const result = await insertToDb("videos", snakeCaseVideo);
      return toCamelCase(result) as Video;
    } catch (error) {
      console.error("Error creating video in Supabase:", error);
      const id = randomUUID();
      const video: Video = {
        ...insertVideo,
        id,
        createdAt: new Date()
      };
      this.videos.set(id, video);
      return video;
    }
  }

  // Users
  async createOrUpdateUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }
}

export const storage = new MemStorage();
