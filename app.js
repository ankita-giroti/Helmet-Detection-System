document.addEventListener("DOMContentLoaded", function () {
    const vehicleForm = document.getElementById("vehicle-form");
    const vehicleList = document.getElementById("vehicle-list");

    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mysql$650',
        database: 'traffic'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err);
        } else {
            console.log('Connected to MySQL database');
        }
    });


    // Fetch and display vehicles
    function fetchVehicles() {
        fetch("http://localhost:3306/vehicles")
            .then(response => response.json())
            .then(data => {
                vehicleList.innerHTML = "";
                data.forEach((vehicle, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${vehicle.license_plate}</td>
                        <td>${vehicle.owner}</td>
                        <td>${vehicle.vehicle_type}</td>
                        <td>${new Date(vehicle.mobile_number).toLocaleString()}</td>
                        <td>
                            <button onclick="deleteVehicle(${vehicle.id})">🗑 Delete</button>
                        </td>
                    `;
                    vehicleList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching vehicles:", error));
    }

    // Add a new vehicle (Triggered when "Add Vehicle" button is pressed)
    vehicleForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const newVehicle = {
            license_plate: document.getElementById("license_plate").value,
            owner: document.getElementById("owner").value,
            vehicle_type: document.getElementById("vehicle_type").value,
            entry_time: document.getElementById("entry_time").value,
        };

        fetch("http://localhost:3306/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVehicle),
        })
        .then(response => response.json())
        .then(() => {
            alert("Vehicle added successfully!");
            vehicleForm.reset();
            fetchVehicles(); // Refresh the vehicle list
        })
        .catch(error => console.error("Error adding vehicle:", error));
    });

    // Delete a vehicle
    window.deleteVehicle = function (id) {
        fetch(`http://localhost:3306/vehicles/${id}`, { method: "DELETE" })
            .then(() => fetchVehicles())
            .catch(error => console.error("Error deleting vehicle:", error));
    };

    // Load vehicles on page load
    fetchVehicles();
});
