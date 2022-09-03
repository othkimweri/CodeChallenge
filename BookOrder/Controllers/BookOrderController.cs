using BookOrder.Services;
using Microsoft.AspNetCore.Mvc;
using BookOrder.Models;

namespace BookOrder.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookOrderController : ControllerBase
{
    private readonly IBookOrderService _bookOrderService;
    private readonly List<Book> _bookList;

    public BookOrderController(IBookOrderService bookOrderService)
	{
		_bookOrderService = bookOrderService;
        _bookList = new List<Book>()
            {
                new Book()
                {
                       Id = 1, Title = "English Grammar", Price = 25000, Level = "Senior One"
                },
                  new Book()
                {
                       Id = 5, Title = "English Grammar Teacher's Edition", Price = 20000, Level = "Senior One"
                },
                  new Book()
                {
                       Id = 2, Title = "Kiswahili", Price = 25000, Level = "Senior Two"
                },
                    new Book()
                {
                       Id = 3, Title = "Mathematics", Price = 25000, Level = "Teacher Edition"
                },

            };
    }
	[HttpGet]
	public IActionResult Get()
	{
		//var books = _bookOrderService.GetAllBooks();
		return Ok(_bookList);
	}

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        //var books = _bookOrderService.GetAllBooks();
        var book = _bookList.Where(b => b.Id == id).FirstOrDefault();
        return Ok(book);
    }

    [HttpPost]
    public IActionResult Checkout([FromBody] Order bookOrder)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //TODO:Email the order asynchronously
        string confirmationMessage = "An email with your order has been sent to your email";
        return Ok(confirmationMessage);
    }
}
