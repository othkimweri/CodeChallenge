--seed the database
USE BookOrders
GO

insert into Books (Title, [Level], Price)
values
('English Language & Literature in English','Senior One',25000),
('Biology','Senior One',25000),
('Physics','Senior One',25000),
('Chemistry','Senior One',25000),
('Geography','Senior One',25000),
('History and Political Education','Senior One',25000),
('Technology and Design','Senior One',22000),
('Performing Arts','Senior One',22000),
('Nutrition and Food Technology','Senior One',22000),
('Art and Design','Senior One',22000),
('English Language & Literature in English','Senior One',25000),
('Biology','Senior One',25000),
('Physics','Senior One',25000),
('Chemistry','Senior One',25000),
('Geography','Senior One',25000),
('History and Political Education','Senior One',25000),
('Technology and Design','Senior One',22000),
('Performing Arts','Senior One',22000),
('Nutrition and Food Technology','Senior One',22000),
('Art and Design','Senior One',22000),
('Agriculture','Senior One',22000)

--select * from books