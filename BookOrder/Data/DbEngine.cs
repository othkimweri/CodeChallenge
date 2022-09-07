using BookOrder.Models;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;

namespace BookOrder.Data_Access
{
    public class DbEngine
    {
        private readonly string _connectionString;
        private SqlConnection _sqlConnection;
        public DbEngine(string connectionString)
        {
            _connectionString = connectionString;
        }


        int Delete()
        {
            throw new NotImplementedException();
        }

        //todo: change to datatable to be able to return any type
        public List<Book> Get()
        {
            OpenConnection();
            List<Book> books = new List<Book>();
            string spName = "uspGetBooks";
            using SqlCommand command = new SqlCommand(spName,_sqlConnection)
            {
                CommandType = CommandType.StoredProcedure
            };

            SqlDataReader dataReader =
            command.ExecuteReader(CommandBehavior.CloseConnection);
            while (dataReader.Read())
            {
                books.Add(new Book
                {
                    Id = (int)dataReader["Id"],
                    Title = (string)dataReader["Title"],
                    Price = (decimal)dataReader["Price"],
                    Level = (string)dataReader["Level"],

                }); ;
            }
            dataReader.Close();
            return books;
        }
     

        public bool Save(Order bookOrder)
        {
            OpenConnection();
            string spName = "uspInsertOrders";

using (SqlCommand command = new SqlCommand(spName, _sqlConnection))
            {
                command.Parameters.AddWithValue("@FirstName", bookOrder.FirstName);
                command.Parameters.AddWithValue("@LastName", bookOrder.LastName);
                command.Parameters.AddWithValue("@Email", bookOrder.Email);
                command.Parameters.AddWithValue("@PhoneNo", bookOrder.PhoneNo);
                command.Parameters.AddWithValue("@DeliveryLocation", bookOrder.DeliveryLocation);
                command.Parameters.AddWithValue("@OrderTotal", bookOrder.OrderTotal);
                command.Parameters.AddWithValue("@Comments", bookOrder.Comments);

                DataTable dt = new DataTable();
                
                dt.Columns.Add("OrderId",typeof(int));
                dt.Columns.Add("BookId",typeof(int));
                dt.Columns.Add("Quantity",typeof(int));
                dt.Columns.Add("Amount",typeof(decimal));
                dt.Columns.Add("RecordDateTime",typeof(DateTime));

                int placeHolderOrderId = 0;

                foreach (var orderItem in bookOrder.OrderItems)
                {
                   
                    dt.Rows.Add(placeHolderOrderId,orderItem.BookId, orderItem.Quantity, orderItem.Amount, DateTime.Now);
             

                }
                command.Parameters.AddWithValue("@OrderItems", dt);


                command.CommandType = CommandType.StoredProcedure;
                command.ExecuteNonQuery();
            }
            CloseConnection();
            return true;
        }

        int Update()
        {
            throw new NotImplementedException();
        }

        public void OpenConnection()
        {
            _sqlConnection = new SqlConnection
            {
                ConnectionString = _connectionString
            };
            _sqlConnection.Open();
        }
        private void CloseConnection()
        {
            if (_sqlConnection?.State != ConnectionState.Closed)
            {
                _sqlConnection?.Close();
            }
        }
    }
}
