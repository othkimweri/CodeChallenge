/*
Create database
*/

USE master
GO

IF EXISTS (SELECT name FROM sysdatabases WHERE name = 'BookOrders')
	DROP DATABASE BookOrders
GO

CREATE DATABASE BookOrders 
GO