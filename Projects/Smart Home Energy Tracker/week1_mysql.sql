CREATE TABLE rooms (
    room_id VARCHAR(50) PRIMARY KEY,
    room_name VARCHAR(100)
);

CREATE TABLE devices (
    device_id VARCHAR(50) PRIMARY KEY,
    device_name VARCHAR(100),
    room_id VARCHAR(50),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

CREATE TABLE energy_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(50),
    timestamp DATETIME,
    energy_kwh FLOAT,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

select * from devices;
select * from devices WHERE device_id = 3;

CREATE PROCEDURE total_energy_per_room(IN date_val DATE)
BEGIN
    SELECT r.room_name, SUM(e.energy_kwh) AS total_energy
    FROM energy_logs e
    JOIN devices d ON e.device_id = d.device_id
    JOIN rooms r ON d.room_id = r.room_id
    WHERE DATE(e.timestamp) = date_val
    GROUP BY r.room_name;
END //

