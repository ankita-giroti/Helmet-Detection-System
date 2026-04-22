show databases;
create database traffic;

use traffic;

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    license_plate VARCHAR(20) NOT NULL,
    owner VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    mobile_no bigint(10)
);

drop table vehicles;
select * from vehicles;