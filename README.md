# CodeChallenge

# SUMMARY
The book order application is a .NET 6 WebAPI Project. It requires .NET 6 to be installed on the developer machine.

Note: For visual studio users only version 2022 is compatible. Older versions will not work as they cannot target .NET 6.

To run the project, open in Visual Studio 2022 and run or open in VS Code and type dotnet run in a terminal

#### Before You Run The Project ###########33 
Creating The Database
Run the scripts in the database scripts folder against an instance of SQL Server in the following order
	1. Create Database
	2. Create Tables
	3. CRUD Scripts
	4. Seed Database
NB: All the scripts should run without errors.

# SETTING UP GLOBAL VARIABLES
Open the project with either Visual Studio 2022 or VS Code
Open the appsettings.json file and replace the following place holders in the ConnectionStrings,  SmtpServer, SmtpUsers, Secrets as follows

<YOUR-CONNECTION-STRING> - Connection string to your database e.g "Integrated Security=SSPI;Initial Catalog=BookOrders;Data Source=.;"

NB: The Catalog must be BookOrders (name of the database)

<YOUR-SMTP SERVER> - IP Address or hostname of your smtp server (required for application to send emails.

<YOUR-SMTP USER> - User name on your smtp server (required for application to send emails e.g postmaster@bookorders.com

<YOUR-SECRET> - Password of the smtp user