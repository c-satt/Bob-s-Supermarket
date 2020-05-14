
CREATE TABLE `customers` (
  `customerId` int(11) AUTO_INCREMENT NOT NULL,
  `firstName` char(20) NOT NULL,
  `lastName` char(25) NOT NULL,
  `phoneNumber` int(10) NOT NULL,
  `zipcode` varchar(5) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `memberDate` date NOT NULL,
  `lastTransaction` date NOT NULL,
  `saleId` int(11),
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `idx_customerId` (`customerId`),
  KEY `saleId` (`saleId`)
) ENGINE=InnoDB;


CREATE TABLE `distributors` (
      `distributorsId` int(11) AUTO_INCREMENT NOT NULL,
      `name` char(25) NOT NULL,
      `phoneNumber` int(10) NOT NULL,
      `address` varchar(20) NOT NULL,
      `zipcode` varchar(5) NOT NULL,
      `itemId` int(20),
      PRIMARY KEY (`distributorsId`),
      UNIQUE KEY `idx_distributorsId` (`distributorsId`)
      )ENGINE=InnoDB DEFAULT CHARSET=utf8;



  CREATE TABLE `sales` (
    `saleId` int(11) AUTO_INCREMENT NOT NULL,
    `customerId` int(11),
    `itemId` int(20),
    `saleDate` date NOT NULL,
    `subtotal` float NOT NULL,
    `tax` float NOT NULL,
    `location` ENUM ('store', 'online') NOT NULL,
    PRIMARY KEY (`saleId`),
    UNIQUE KEY `idx_saleId` (`saleId`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;



  CREATE TABLE `items` (
    `itemId` int(20) AUTO_INCREMENT NOT NULL,
    `departmentCode` int(11) NOT NULL,
    `aisleNumber` int(15) NOT NULL,
    `itemType` varchar(255) NOT NULL,
    `brand` char(50) NOT NULL,
    `description` char(255) NOT NULL,
    `price` float NOT NULL,
    `taxable` ENUM('yes','no') NOT NULL,
    `qty` int(20) NOT NULL,
    `distributorsId` int(11),
    `saleId` int(11),
    PRIMARY KEY (`itemId`),
    UNIQUE KEY `idx_itemId` (`itemId`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



ALTER TABLE `customers` ADD CONSTRAINT `salesId` FOREIGN KEY (`saleId`) REFERENCES `sales`(`saleId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `distributors` ADD CONSTRAINT `itemId` FOREIGN KEY (`itemId`) REFERENCES `items`(`itemId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `items` ADD CONSTRAINT `distributorId` FOREIGN KEY (`distributorsId`) REFERENCES `distributors`(`distributorsId`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `items` ADD CONSTRAINT `saleId` FOREIGN KEY (`saleId`) REFERENCES `sales`(`saleId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `sales` ADD CONSTRAINT `customId` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `sales` ADD CONSTRAINT `fk_itemid` FOREIGN KEY (`itemId`) REFERENCES `items`(`itemId`) ON DELETE SET NULL ON UPDATE CASCADE;

LOCK TABLES `customers` WRITE;
INSERT INTO `customers` VALUES (1, 'John', 'Smith', 5559021, 56434, 'jsmith@yahoo.com', "2012-12-07", "2020-03-03", NULL),
  (2, 'Jane', 'Jones', 5557345, 45789, 'jjones@gmail.com', "2019-10-03", "2020-01-13", NULL),
  (3, 'Sally', 'Ruiz', 5554321, 54654, 'sallyr@hotmail.com', "2018-02-15", "2019-03-17", NULL),
  (4, 'Jessie', 'Huges', 5553124, 56748, 'jhuges@gmail.com', "2014-03-16", "2020-04-20", NULL);
  UNLOCK TABLES;

LOCK TABLES `distributors` WRITE;
INSERT INTO `distributors` VALUES (200, 'A1 Produce', 5556794, '233 Produce Lane', 56748, NULL),
(201, 'Franz Bakery', 5554857, '123 Bakery Lane', 57483, NULL),
(202, 'Johnys', 4658783, '758 Produce Lane', 78789, NULL);
UNLOCK TABLES;

LOCK TABLES `sales` WRITE;
INSERT INTO `sales` VALUES (300, NULL, NULL, "2019-02-15", 56.98, 10.11, 'online'),
(301, NULL, NULL, "2018-06-18", 6.97, 2.14, 'store'),
(302, NULL, NULL, "2020-12-07", 12.98, 4.11, 'store');
UNLOCK TABLES;



LOCK TABLES `items` WRITE;
INSERT INTO `items` VALUES (400, 600, 1, "Produce", "Dole", "Banana", .49, 1, 1, NULL, NULL),
(401, 601, 6, "Meat", "Foster Farms", "Raw Chicken Breast", 1.89, 1, 1, NULL, NULL),
(402, 602, 7, "Apparel", "Nike", "Running Shoes", 55.99, 0, 1, NULL, NULL),
(403, 603, 2, "Snack", "Lay's", "Potato Chips", 3.99, 1, 1, NULL, NULL);
UNLOCK TABLES;
