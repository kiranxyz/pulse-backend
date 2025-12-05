import { connectDB } from "./db/db.ts";
import { Category } from "./models/Category.ts";
connectDB();
const categories = [
  "Technology",
  "Education",
  "Sports",
  "Music",
  "Food",
  "Health",
  "Business",
  "Environment",
  "Community",
  "Art",
];

export async function seedCategories() {
  try {
    // Clear old categories (optional)
    await Category.deleteMany({});
    console.log("Old categories cleared");

    // Insert new categories
    const inserted = await Category.insertMany(
      categories.map((name: string) => ({ name }))
    );

    console.log("Categories seeded:", inserted.length);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

// Run automatically when executing the file
seedCategories();

// # To run: npx ts-node src/seed.ts
