-- Opprettelse av tabeller
CREATE TABLE Route (
    RouteId INT PRIMARY KEY,
    StartPointId INT,
    EndPointId INT,
    DepartureTime DATETIME
);

CREATE TABLE User (
    UserId INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255)
);

CREATE TABLE Ticket (
    Id INT PRIMARY KEY,
    UserId INT,
    RouteId INT,
    PurchaseDate DATETIME,
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (RouteId) REFERENCES Route(Id)
);

CREATE TABLE TransportVehicle (
    Id INT PRIMARY KEY,
    Type VARCHAR(255),
    CurrentLocation VARCHAR(255),
    Status VARCHAR(255)
);

CREATE TABLE Station (
    Id INT PRIMARY KEY,
    Location VARCHAR(255),
    Name VARCHAR(255)
);

-- Opprettelse av relasjoner
-- TransportVehicle bruker Route
ALTER TABLE Route
ADD CONSTRAINT FK_Route_TransportVehicle FOREIGN KEY (Id) REFERENCES TransportVehicle(Id);

-- TransportVehicle oppdaterer Station
ALTER TABLE TransportVehicle
ADD CONSTRAINT FK_TransportVehicle_Station FOREIGN KEY (Id) REFERENCES Station(Id);
