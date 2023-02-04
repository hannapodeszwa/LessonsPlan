using System;
using System.ComponentModel.DataAnnotations;

namespace BookCatalog.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Author { get; set; }

        public string? Year { get; set; }

        //[DataType(DataType.Date)]
        //public DateTime ReleaseDate { get; set; }
        //public string Genre { get; set; }
        //public decimal Price { get; set; }
    }
}
