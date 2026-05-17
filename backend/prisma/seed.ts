import { PrismaService } from "../prisma/prisma.service";
import "dotenv/config";

const prisma = new PrismaService();

async function main() {
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: [
      {
        category_name: "Dairy",
        description: "Milk, yogurt, and other dairy products",
      },
      {
        category_name: "Frozen",
        description: "Frozen goods and ice cream",
      },
      {
        category_name: "Bakery",
        description: "Bread, pastries, and baked items",
      },
      {
        category_name: "Beverages",
        description: "Drinks and ready-to-serve beverages",
      },
      {
        category_name: "Snacks",
        description: "Chips, candies, and quick bites",
      },
      {
        category_name: "Household",
        description: "Cleaning and household essentials",
      },
    ],
  });

  const createdCategories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });

  const categoryIdByName = new Map(
    createdCategories.map((category) => [category.category_name, category.id]),
  );

  console.log("Created categories with IDs:", categoryIdByName);

  await prisma.item.createMany({
    data: [
      {
        item_name: "Susu UHT Full Cream 1L",
        categoryId: categoryIdByName.get("Dairy") || 0,
        stock_amount: 120,
        minimum_stock: 15,
        selling_price: 25000,
        purchase_price: 16000,
        weight_size: "1L",
        unit: "botol",
        save_location: "Chiller A",
        description: "Susu UHT full cream",
      },
      {
        item_name: "Yogurt Tawar Cup",
        categoryId: categoryIdByName.get("Dairy") || 0,
        stock_amount: 80,
        minimum_stock: 10,
        selling_price: 17500,
        purchase_price: 10500,
        weight_size: "150g",
        unit: "cup",
        save_location: "Chiller A",
        description: "Yogurt tanpa rasa",
      },
      {
        item_name: "Keju Cheddar Blok",
        categoryId: categoryIdByName.get("Dairy") || 0,
        stock_amount: 60,
        minimum_stock: 8,
        selling_price: 42000,
        purchase_price: 29000,
        weight_size: "200g",
        unit: "pack",
        save_location: "Chiller B",
        description: "Keju cheddar",
      },
      {
        item_name: "Es Krim Vanilla",
        categoryId: categoryIdByName.get("Frozen") || 0,
        stock_amount: 45,
        minimum_stock: 6,
        selling_price: 55000,
        purchase_price: 36000,
        weight_size: "1L",
        unit: "tub",
        save_location: "Freezer 1",
        description: "Rasa vanilla klasik",
      },
      {
        item_name: "Kentang Goreng Beku",
        categoryId: categoryIdByName.get("Frozen") || 0,
        stock_amount: 70,
        minimum_stock: 12,
        selling_price: 31000,
        purchase_price: 20000,
        weight_size: "1kg",
        unit: "bag",
        save_location: "Freezer 2",
        description: "Kentang potong lurus",
      },
      {
        item_name: "Nugget Ayam",
        categoryId: categoryIdByName.get("Frozen") || 0,
        stock_amount: 55,
        minimum_stock: 10,
        selling_price: 48000,
        purchase_price: 31000,
        weight_size: "500g",
        unit: "bag",
        save_location: "Freezer 2",
        description: "Nugget ayam berlapis tepung",
      },
      {
        item_name: "Roti Sourdough",
        categoryId: categoryIdByName.get("Bakery") || 0,
        stock_amount: 40,
        minimum_stock: 6,
        selling_price: 36000,
        purchase_price: 22000,
        weight_size: "700g",
        unit: "loaf",
        save_location: "Rak Bakery",
        description: "Roti sourdough artisan",
      },
      {
        item_name: "Croissant Butter",
        categoryId: categoryIdByName.get("Bakery") || 0,
        stock_amount: 90,
        minimum_stock: 12,
        selling_price: 14000,
        purchase_price: 8000,
        weight_size: "70g",
        unit: "pcs",
        save_location: "Rak Bakery",
        description: "Croissant butter renyah",
      },
      {
        item_name: "Muffin Cokelat",
        categoryId: categoryIdByName.get("Bakery") || 0,
        stock_amount: 65,
        minimum_stock: 10,
        selling_price: 19000,
        purchase_price: 11000,
        weight_size: "90g",
        unit: "pcs",
        save_location: "Rak Bakery",
        description: "Muffin cokelat",
      },
      {
        item_name: "Air Mineral",
        categoryId: categoryIdByName.get("Beverages") || 0,
        stock_amount: 200,
        minimum_stock: 30,
        selling_price: 9000,
        purchase_price: 4500,
        weight_size: "600ml",
        unit: "botol",
        save_location: "Rak Minuman",
        description: "Air mineral",
      },
      {
        item_name: "Minuman Soda Cola",
        categoryId: categoryIdByName.get("Beverages") || 0,
        stock_amount: 140,
        minimum_stock: 20,
        selling_price: 12000,
        purchase_price: 7000,
        weight_size: "330ml",
        unit: "kaleng",
        save_location: "Rak Minuman",
        description: "Rasa cola klasik",
      },
      {
        item_name: "Jus Jeruk",
        categoryId: categoryIdByName.get("Beverages") || 0,
        stock_amount: 75,
        minimum_stock: 12,
        selling_price: 27000,
        purchase_price: 18000,
        weight_size: "1L",
        unit: "karton",
        save_location: "Chiller B",
        description: "Tanpa gula tambahan",
      },
      {
        item_name: "Keripik Kentang",
        categoryId: categoryIdByName.get("Snacks") || 0,
        stock_amount: 110,
        minimum_stock: 18,
        selling_price: 16000,
        purchase_price: 9500,
        weight_size: "120g",
        unit: "bag",
        save_location: "Lorong 4",
        description: "Keripik kentang asin",
      },
      {
        item_name: "Cokelat Batang",
        categoryId: categoryIdByName.get("Snacks") || 0,
        stock_amount: 160,
        minimum_stock: 25,
        selling_price: 11000,
        purchase_price: 6000,
        weight_size: "45g",
        unit: "bar",
        save_location: "Lorong 4",
        description: "Cokelat susu",
      },
      {
        item_name: "Campuran Kacang",
        categoryId: categoryIdByName.get("Snacks") || 0,
        stock_amount: 50,
        minimum_stock: 8,
        selling_price: 32000,
        purchase_price: 21000,
        weight_size: "250g",
        unit: "bag",
        save_location: "Lorong 4",
        description: "Kacang dan buah kering",
      },
      {
        item_name: "Deterjen Cair",
        categoryId: categoryIdByName.get("Household") || 0,
        stock_amount: 45,
        minimum_stock: 7,
        selling_price: 68000,
        purchase_price: 45000,
        weight_size: "1.5L",
        unit: "botol",
        save_location: "Lorong 8",
        description: "Deterjen cair",
      },
      {
        item_name: "Sabun Cuci Piring",
        categoryId: categoryIdByName.get("Household") || 0,
        stock_amount: 85,
        minimum_stock: 12,
        selling_price: 23000,
        purchase_price: 13000,
        weight_size: "750ml",
        unit: "botol",
        save_location: "Lorong 8",
        description: "Aroma lemon",
      },
      {
        item_name: "Tisu Dapur",
        categoryId: categoryIdByName.get("Household") || 0,
        stock_amount: 95,
        minimum_stock: 15,
        selling_price: 39000,
        purchase_price: 24000,
        weight_size: "6 rolls",
        unit: "pack",
        save_location: "Lorong 8",
        description: "Tisu dapur penyerap",
      },
      {
        item_name: "Es Krim Stroberi",
        categoryId: categoryIdByName.get("Frozen") || 0,
        stock_amount: 35,
        minimum_stock: 5,
        selling_price: 57000,
        purchase_price: 37000,
        weight_size: "1L",
        unit: "tub",
        save_location: "Freezer 1",
        description: "Rasa stroberi",
      },
      {
        item_name: "Air Soda",
        categoryId: categoryIdByName.get("Beverages") || 0,
        stock_amount: 130,
        minimum_stock: 20,
        selling_price: 10000,
        purchase_price: 5500,
        weight_size: "500ml",
        unit: "botol",
        save_location: "Rak Minuman",
        description: "Rasa jeruk nipis",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });