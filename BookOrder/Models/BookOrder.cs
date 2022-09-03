using System.ComponentModel.DataAnnotations;

namespace BookOrder.Models
{
    public class Order
    {
        [Required]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string DeliveryLocation { get; set; }
        public List<Book> Books { get; set; }
        public int Quantity { get; set; }
        public decimal OrderTotal { get; set; }
        
    }
}
