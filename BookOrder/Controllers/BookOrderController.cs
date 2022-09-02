using BookOrder.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookOrder.Controllers;

[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookOrderService _bookOrderService;

	public BookController(IBookOrderService bookOrderService)
	{
		_bookOrderService = bookOrderService;
	}
	[HttpGet]
	public IActionResult Get()
	{
		var books = _bookOrderService.GetAllBooks();
		return Ok(books);
	}

    [HttpPost]
    public IActionResult Get(BookOrder bookOrder)
    {
        var book = _bookOrderService.GetById(id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }
}
