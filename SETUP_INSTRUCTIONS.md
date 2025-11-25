# Divine Astrology - Database Setup Instructions

## Quick Setup (One-Time Only)

To enable automatic data storage for products, blogs, and videos, follow these steps:

### Step 1: Go to Your Supabase Dashboard
1. Visit https://supabase.com and log in
2. Select your project "cxanroyrcrsacyvlehxb"

### Step 2: Run the SQL Migration
1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Paste the contents of `/migrations/001_create_tables.sql` from this project
4. Click **"Run"** button

This will create all the necessary tables automatically.

### Step 3: Start Using the App
Once the tables are created:
- ✅ Admin can add products and they'll save to Supabase
- ✅ Admin can add blog posts and they'll save to Supabase
- ✅ Admin can add videos and they'll save to Supabase
- ✅ All users can see the new content immediately
- ✅ Data persists even after server restarts

## What Gets Stored

### Products Table
- Gemstones, Bracelets, Rudraksha, Yantras, Rings, Remedies
- Automatically saved when admin adds them

### Blog Posts Table
- Blog articles with categories
- Automatically saved when admin creates them

### Videos Table
- YouTube videos for the Videos page
- Automatically saved when admin uploads them

### Appointments Table
- User consultation bookings
- Already created (used for consultations)

### Orders Table
- E-commerce orders
- Already created (used for purchases)

## Troubleshooting

If you get an error when running the SQL:
- Make sure you're logged into Supabase
- Check that the SQL is pasted correctly
- Ensure there are no typos in the SQL code
- Try running each CREATE TABLE statement separately if needed

## Future Additions

After initial setup, anything you add through the admin panel will automatically:
1. Save to Supabase database
2. Be visible to all users
3. Persist permanently
