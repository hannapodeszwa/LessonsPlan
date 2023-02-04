using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookCatalog.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BookCatalog.Data
{
    public class BookCatalogContext : IdentityDbContext<UserAccount>
    {
        public BookCatalogContext (DbContextOptions<BookCatalogContext> options)
            : base(options)
        {
        }

        public DbSet<BookCatalog.Models.Book> Book { get; set; } = default!;
        public DbSet<BookCatalog.Models.UserAccount> Account { get; set; } = default!;

        public DbSet<BookCatalog.Models.UserBook> UserBook { get; set; } = default!;

        public DbSet<BookCatalog.Models.Comment> Comment { get; set; }
    }
}
