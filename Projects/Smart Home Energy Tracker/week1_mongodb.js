create Smarthome;
use SmartHome;

db.sensor_logs.insertMany([
  { device_id: "D1", timestamp: new Date("2025-09-01T08:10:00"), energy_kwh: 0.45 },
  { device_id: "D2", timestamp: new Date("2025-09-01T09:00:00"), energy_kwh: 0.30 },
  { device_id: "D3", timestamp: new Date("2025-09-01T10:30:00"), energy_kwh: 0.60 }
]);

db.sensor_logs.createIndex({ device_id: 1 });
db.sensor_logs.createIndex({ timestamp: 1 });
