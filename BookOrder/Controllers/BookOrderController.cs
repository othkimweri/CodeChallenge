using Microsoft.AspNetCore.Mvc;
using BookOrder.Models;
using System.Net.Mail;
using System.Text;
using BookOrder.Data;
using BookOrder.Utilities;
using System.Diagnostics.Metrics;
using System.Security.Cryptography;
using System.Xml.Linq;
using BookOrder.Data_Access;
using System.Net;

namespace BookOrder.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookOrderController : ControllerBase
{
    private readonly IBookOrderDb _bookOrderDb;
    
    private IConfiguration _config;

    public BookOrderController(IBookOrderDb bookOrderDb, IConfiguration config)
    {
        _config = config;
        _bookOrderDb = bookOrderDb;
    
    }
    [HttpGet]
    public IActionResult Get()
    {
        var books = _bookOrderDb.GetAllBooks();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var books = _bookOrderDb.GetAllBooks();
        var book = books.Where(b => b.Id == id).FirstOrDefault();
        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> CheckoutAsync([FromBody] Order bookOrder)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var books = _bookOrderDb.GetAllBooks();
            
            //Start building the email
            StringBuilder sb = new StringBuilder();
            string firstName = bookOrder.FirstName;
            string separator = new string('*', 5);
            sb.AppendLine($"Dear {firstName},");
            sb.AppendLine("");
            sb.AppendLine("Your order with the following items has been confirmed");
            sb.AppendLine("");
            sb.AppendLine($"Book ***** Price *** Qty *** Amount");

            foreach (OrderItem orderItem in bookOrder.OrderItems)
            {
                var book = books.Where(b => b.Id == orderItem.BookId).FirstOrDefault();

                sb.AppendLine($"{book.Title} | {book.Price} | {orderItem.Quantity} |{orderItem.Amount}");

            }

            //save the order to the database
            _bookOrderDb.Save(bookOrder);

            //send the email
            string email = bookOrder.Email;
            string emailSubject = "confirmation";
            string emailBody = sb.ToString();
            string confirmationMessage = "An email with your order has been sent to your email";


        Email emailService = new Email(_config);
        await emailService.SendEmail(email, emailSubject, emailBody);
            return Ok(confirmationMessage);
        }
        catch (Exception e)
        {
            //todo: Create a more useful message for the end user
            return BadRequest(e.Message);
        }
       

    }

}




