using BookOrder.Models;

namespace BookOrder.Services
{
    internal interface IBookOrderService
    {
        IEnumerable<Book> GetAllBooks();
        Book Add(Book book);
        Book GetById(int id);
        void Remove(Book book);
    }
}