use foodDeliveryDB
// Customers
db.customers.insertMany([
{ _id: 1, name: "Rahul Sharma", email: "rahul@example.com", city: "Bangalore" },
{ _id: 2, name: "Priya Singh", email: "priya@example.com", city: "Delhi" },
{ _id: 3, name: "Aman Kumar", email: "aman@example.com", city: "Hyderabad" }
]);
// Restaurants
db.restaurants.insertMany([
{ _id: 101, name: "Spicy Treats", city: "Bangalore", rating: 4.5 },
{ _id: 102, name: "Delhi Biryani House", city: "Delhi", rating: 4.2 },
{ _id: 103, name: "Hyderabad Grill", city: "Hyderabad", rating: 4.7 }
]);
// Menu Items (each linked to restaurant)
db.menu.insertMany([
{ _id: 201, restaurant_id: 101, name: "Paneer Tikka", price: 250 },
{ _id: 202, restaurant_id: 101, name: "Veg Biryani", price: 180 },
{ _id: 203, restaurant_id: 102, name: "Chicken Biryani", price: 300 },
{ _id: 204, restaurant_id: 103, name: "Mutton Biryani", price: 400 },
{ _id: 205, restaurant_id: 103, name: "Butter Naan", price: 50 }
]);
// Orders (linked to customer + menu items array)
db.orders.insertMany([
{
_id: 301,
customer_id: 1,
items: [ { menu_id: 201, qty: 2 }, { menu_id: 202, qty: 1 } ],
order_date: ISODate("2025-01-05"),
status: "Delivered"
},
{
_id: 302,
customer_id: 2,
items: [ { menu_id: 203, qty: 1 } ],
order_date: ISODate("2025-01-06"),
status: "Delivered"

},
{
_id: 303,
customer_id: 3,
items: [ { menu_id: 204, qty: 1 }, { menu_id: 205, qty: 3 } ],
order_date: ISODate("2025-01-07"),
status: "Pending"
}
]);

db.customers.insertOne({ _id: 4, name: "Neha Patel", email: "neha@example.com", city: "Mumbai" });
db.restaurants.find({ city: "Hyderabad" });
db.restaurants.updateOne({ name: "Spicy Treats" }, { $set: { rating: 4.8 } });
db.menu.deleteOne({ name: "Butter Naan" });

db.customers.createIndex({ email: 1 }, { unique: true });
db.restaurants.createIndex({ city: 1, rating: -1 });
db.customers.getIndexes();
db.restaurants.getIndexes();
db.restaurants.find({ city: "Delhi" }).sort({ rating: -1 });
db.restaurants.find({ rating: { $gte: 4.0 } }).hint({ $natural: 1 });

db.orders.aggregate([{ $group: { _id: "$customer_id", totalOrders: { $sum: 1 } } }]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "restaurants", localField: "menu.restaurant_id", foreignField: "_id", as: "restaurant" } },
  { $unwind: "$restaurant" },
  { $group: { _id: "$restaurant._id", restaurant: { $first: "$restaurant.name" }, revenue: { $sum: { $multiply: [ "$items.qty", "$menu.price" ] } } } }
]);
db.menu.find().sort({ price: -1 }).limit(2);
db.menu.aggregate([{ $group: { _id: "$restaurant_id", avgPrice: { $avg: "$price" } } }]);
db.orders.aggregate([
  { $match: { status: "Pending" } },
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "cust" } },
  { $unwind: "$cust" },
  { $group: { _id: "$cust.city", pendingCount: { $sum: 1 } } }
]);
db.restaurants.aggregate([{ $group: { _id: "$city", top: { $max: "$rating" } } }]);

db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "cust" } },
  { $unwind: "$cust" },
  { $project: { order_id: "$_id", customer: "$cust.name", city: "$cust.city", items: 1, status: 1 } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "restaurants", localField: "menu.restaurant_id", foreignField: "_id", as: "restaurant" } },
  { $unwind: "$restaurant" },
  { $project: { order_id: "$_id", dish: "$menu.name", qty: "$items.qty", restaurant: "$restaurant.name" } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "cust" } },
  { $unwind: "$cust" },
  { $project: { customer: "$cust.name", dish: "$menu.name", qty: "$items.qty" } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "restaurants", localField: "menu.restaurant_id", foreignField: "_id", as: "rest" } },
  { $unwind: "$rest" },
  { $match: { "rest.name": "Hyderabad Grill" } },
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "cust" } },
  { $unwind: "$cust" },
  { $project: { customer: "$cust.name", dish: "$menu.name" } }
]);
db.orders.aggregate([
  { $match: { _id: 301 } },
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $project: { dish: "$menu.name", qty: "$items.qty", price: "$menu.price", total: { $multiply: [ "$items.qty", "$menu.price" ] } } }
]);

db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $group: { _id: "$customer_id", spent: { $sum: { $multiply: [ "$items.qty", "$menu.price" ] } } } },
  { $match: { spent: { $gt: 500 } } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "cust" } },
  { $unwind: "$cust" },
  { $match: { "cust.city": "Bangalore" } },
  { $group: { _id: "$customer_id", spent: { $sum: { $multiply: [ "$items.qty", "$menu.price" ] } } } },
  { $sort: { spent: -1 } },
  { $limit: 1 }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $lookup: { from: "restaurants", localField: "menu.restaurant_id", foreignField: "_id", as: "rest" } },
  { $unwind: "$rest" },
  { $group: { _id: "$rest._id", revenue: { $sum: { $multiply: [ "$items.qty", "$menu.price" ] } } } },
  { $match: { revenue: { $gt: 500 } } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "menu", localField: "items.menu_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $group: { _id: "$order_date", dailyRevenue: { $sum: { $multiply: [ "$items.qty", "$menu.price" ] } } } }
]);
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.menu_id", totalQty: { $sum: "$items.qty" } } },
  { $lookup: { from: "menu", localField: "_id", foreignField: "_id", as: "menu" } },
  { $unwind: "$menu" },
  { $sort: { totalQty: -1 } },
  { $limit: 1 },
  { $project: { dish: "$menu.name", totalQty: 1 } }
]);
