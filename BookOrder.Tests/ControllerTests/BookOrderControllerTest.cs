using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookOrder.Controllers;
using BookOrder.Data;
using BookOrder.Models;
using BookOrder.Tests.FakeServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BookOrder.Tests.ControllerTests
{
    public class BookOrderControllerTest
    {

        private readonly BookOrderController _controller;
        private readonly IBookOrderDb bookOrderService;
        private readonly IConfiguration _config;
        public BookOrderControllerTest(IConfiguration config)
        {
            bookOrderService = new FakeBookOrderService();
            _config = config;
            _controller = new BookOrderController(bookOrderService,_config);
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
