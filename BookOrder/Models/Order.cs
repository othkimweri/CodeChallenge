using System.ComponentModel.DataAnnotations;

namespace BookOrder.Models
{
    public class Order
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string DeliveryLocation { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public decimal OrderTotal { get; set; }
        public string Comments { get; set; }

    }
}
