--These scripts manage CRUD for the bookOrder Database
USE BookOrders
GO

-----------------------------------uspGetBooks ----------------------------------------------------------------------

if exists (select * from sysobjects where name = 'uspGetBooks')
	drop procedure uspGetBooks
go

create proc uspGetBooks
as select * from Books
return 0
go

-- exec uspGetBooks

-----------------------------------uspInsertOrders ----------------------------------------------------------------------

if exists (select * from sysobjects where name = 'uspInsertOrders')
	drop procedure uspInsertOrders
go

create proc uspInsertOrders(
@FirstName varchar(40),
@LastName varchar(40),
@Email varchar(40),
@PhoneNo varchar(20),
@DeliveryLocation varchar(40),
@OrderTotal money,
@Comments varchar(200),
@OrderItems as dbo.udtOrderItems READONLY
) as 

declare @PlaceHolderOrderId int = 0
declare @OrderId int


begin tran

		insert into Orders(FirstName, LastName, Email, PhoneNo, DeliveryLocation, OrderTotal, Comments)
		values(@FirstName, @LastName, @Email, @PhoneNo, @DeliveryLocation, @OrderTotal, @Comments)

		set @OrderId = (select top 1 ID from Orders order by RecordDateTime desc)

		insert into OrderItems select * from @OrderItems
		update OrderItems set OrderId = @OrderId where OrderId = @PlaceHolderOrderId

	if @@ERROR > 0
		begin
			rollback 
			return 1			   
		end
	
commit tran

return 0
go

alter table orderitems drop constraint fkBookIDOrderItems

/*
Use this section to test the stored procedures
*/
--Declare @orderItems as dbo.udtOrderItems
--INSERT INTO @orderItems VALUES (0,2,3,25000,GETDATE())
--INSERT INTO @orderItems VALUES (0,3,5,20000,GETDATE())
--INSERT INTO @orderItems VALUES (0,4,10,10000,GETDATE())
--INSERT INTO @orderItems VALUES (0,5,6,15000,GETDATE())
--INSERT INTO @orderItems VALUES (0,6,8,40000,GETDATE())
--
--exec uspInsertOrders 'Othman','Kimweri','me@example.com','0772123456','Kisaasi',100000,'Testing', @orderItems