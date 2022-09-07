namespace BookOrder.Models
{
    public class OrderItem
    {
        public int BookId { get; set; }
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
