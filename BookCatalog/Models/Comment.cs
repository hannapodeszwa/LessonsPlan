namespace BookCatalog.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }

        public string Text { get; set; }
        public Comment()
        {
        }

        public Comment(int id, string userId, int bookId, string text)
        {
            Id = id;
            UserId = userId;
            BookId = bookId;
            Text = text;
        }

        public Comment(string userId, int bookId)
        {
            UserId = userId;
            BookId = bookId;
        }
    }
}
