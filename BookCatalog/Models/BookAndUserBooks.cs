namespace BookCatalog.Models
{
    public class BookAndUserBooks
    {
        public BookAndUserBooks()
        {
        }

        public BookAndUserBooks(Book book, UserBook userBook)
        {
            this.Book = book;
            this.UserBook = userBook;
        }

        public Book Book { get; set; }
        public UserBook UserBook { get; set; }
    }
}
