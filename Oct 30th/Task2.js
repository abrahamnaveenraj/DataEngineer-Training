use retail_tracker_mongo;

db.feedback.drop();
db.createCollection("feedback");

// Insert sample feedback documents
db.feedback.insertMany([
  {
    _id: ObjectId(),
    product_id: "P001",
    customer_id: "C123",
    rating: 4,
    comment: "Good quality but color slightly different than picture.",
    created_at: new Date("2025-09-15")
  },
  {
    _id: ObjectId(),
    product_id: "P002",
    customer_id: "C456",
    rating: 2,
    comment: "Late delivery, packaging damaged.",
    created_at: new Date("2025-10-02")
  },
  {
    _id: ObjectId(),
    product_id: "P001",
    customer_id: "C789",
    rating: 5,
    comment: "Loved it. Perfect fit!",
    created_at: new Date()
  }
]);

// Create index for fast searches by product_id
db.feedback.createIndex({ product_id: 1 });
