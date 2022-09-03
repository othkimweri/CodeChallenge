using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookOrder.Controllers;
using BookOrder.Models;
using BookOrder.Services;
using BookOrder.Tests.FakeServices;
using Microsoft.AspNetCore.Mvc;

namespace BookOrder.Tests.ControllerTests
{
    public class BookOrderControllerTest
    {

        private readonly BookOrderController _controller;
        private readonly IBookOrderService bookOrderService;

        public BookOrderControllerTest()
        {
            bookOrderService = new FakeBookOrderService();
            _controller = new BookOrderController(bookOrderService);
        }

        [Fact]
        public void Get_All_Books_Returns_A_List_Of_All_Books()
        {
            //Act
            var okResult = _controller.Get() as OkObjectResult;
            var items = Assert.IsType<List<Book>>(okResult.Value);
            Assert.Equal(3, items.Count);

        }
    }
}
