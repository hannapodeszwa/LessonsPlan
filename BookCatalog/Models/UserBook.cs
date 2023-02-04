namespace BookCatalog.Models
{
    public class UserBook
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }

        public BookStates State { get; set; }
        public UserBook()
        {
        }

        public UserBook(string userId, int bookId)
        {
            UserId = userId;
            BookId = bookId;
        }
    }

    public enum BookStates
    {
        Read,
        InProgress,
        ToRead,
        Unfinished
    }
}
