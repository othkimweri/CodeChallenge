using BookOrder.Data_Access;
using BookOrder.Models;

namespace BookOrder.Data
{
    public class BookOrderDb:IBookOrderDb
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private readonly DbEngine _dbe;

        public BookOrderDb(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetSection("ConnectionStrings").GetValue<string>("Development");
            _dbe = new DbEngine(_connectionString);

        }
        public void Save(Order bookOrder)
        {
             _dbe.Save(bookOrder);
        }

        public Book GetBook(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Book> GetAllBooks()
        {
            try
            {
               
                return _dbe.Get();
            }


            catch (Exception)
            {

                throw;

            }


        }
    }
}
