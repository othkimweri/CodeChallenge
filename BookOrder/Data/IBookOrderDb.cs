using BookOrder.Models;

namespace BookOrder.Data
{
    public interface IBookOrderDb
    {
        public IEnumerable<Book> GetAllBooks();
        public Book GetBook(int id);
        public void Save(Order bookOrder);

    }
}