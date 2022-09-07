/*
Create tables
*/

USE BookOrders
GO

--Drop Tables in reverse order of creation
if exists (select * from sysobjects where name = 'OrderItems')
	drop table OrderItems
go

if exists (select * from sysobjects where name = 'Orders')
	drop table Orders
go

if exists (select * from sysobjects where name = 'Books')
	drop table Books
go

-- Create Tables
create table Books
(ID int not null constraint pkIDBooks primary key IDENTITY(1,1),
Title varchar (50) not null,
[Level] varchar (50) not null,
Price money,
RecordDateTime smalldatetime constraint dfRecordDateTimeBooks default getdate()
)
go


create table Orders
(ID int not null constraint pkIDOrders primary key IDENTITY(1,1),
FirstName varchar (50) not null,
LastName varchar (50) not null,
Email varchar(50) not null,
PhoneNo varchar(50) not null,
DeliveryLocation varchar (50) not null,
OrderTotal money,
Comments varchar (200),
RecordDateTime smalldatetime constraint dfRecordDateTimeOrders default getdate()
)
go

create table OrderItems
(ID int not null constraint pkIDOrderItems primary key IDENTITY(1,1),
OrderId int not null,
BookID int not null constraint fkBookIDOrderItems references Books,
Quantity varchar (50) not null,
Amount varchar(50) not null,
RecordDateTime smalldatetime constraint dfRecordDateOrderItems default getdate()
)
go


--Create user defined type for order items
if exists (select * from sys.types where is_table_type = 1 AND name = 'udtOrderItems')
	drop type udtOrderItems
go

CREATE TYPE udtOrderItems AS TABLE 
(	
OrderID int,
BookID varchar(60),
Quantity int,
Amount money,
RecordDateTime smalldatetime
)