using BookOrder.Models;

namespace BookOrder.Services
{
    public interface IBookOrderService
    {
        public IEnumerable<Book> GetAllBooks();
        public Book GetBook(int id);
        public void Checkout(Order bookOrder);
    }
}