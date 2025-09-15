use supply_chain;

// Insert
db.shipments.insertMany([
  {
    shipment_id: 1,
    order_id: 101,
    status: "Delivered",
    shipped_date: ISODate("2025-09-12"),
    delivery_date: ISODate("2025-09-20"),
    carrier: "DHL"
  },
  {
    shipment_id: 2,
    order_id: 102,
    status: "In Transit",
    shipped_date: ISODate("2025-09-14"),
    delivery_date: ISODate("2025-09-25"),
    carrier: "FedEx"
  }
]);

// Create index 
db.shipments.createIndex({ order_id: 1 });
