using BookOrder.Models;
using BookOrder.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOrder.Tests.FakeServices
{
    public class FakeBookOrderService : IBookOrderService
    {
        private readonly List<Book> _bookList;
        public FakeBookOrderService()
        {
            _bookList = new List<Book>()
            {
                new Book()
                {
                       Id = 1, Title = "English Grammar", Price = 25000, Level = "Senior One"
                },
                  new Book()
                {
                       Id = 1, Title = "Kiswahili", Price = 25000, Level = "Senior Two"
                },
                    new Book()
                {
                       Id = 1, Title = "Mathematics", Price = 25000, Level = "Teacher Edition"
                },

            };

        }
        public IEnumerable<Book> GetAllBooks()
        {
            return _bookList;
        }

        public Book GetBook(int id)
        {
             return _bookList.Where(b => b.Id == id).FirstOrDefault();
           
        }
        public void Checkout(Order order)
        {
            //todo: Email order to client

        }

    }
}