using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Xml;
using BookCatalog.Data;
using BookCatalog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;


namespace Lab5.Controllers
{
    public class BooksController : Controller
    {
        private readonly BookCatalogContext _context;

        public BooksController(BookCatalogContext context)
        {
            _context = context;
        }

        // GET: Books
        public async Task<IActionResult> Index(string searchString)
        {
            var books = from b in _context.Book
                         select b;

            if (!String.IsNullOrEmpty(searchString))
            {
                books = books.Where(s => s.Title!.ToLower().Contains(searchString.ToLower()));
            }

            return View(await books.ToListAsync());
        }

        public async Task<IActionResult> AddToMyBooks(int? id)
        {
         
                List<string> ListItems = new List<string>();
            ListItems.Add("Read");
            ListItems.Add("InProgress");
            ListItems.Add("ToRead");
            ListItems.Add("Unfinished");
         
            SelectList States = new SelectList(ListItems);
                    ViewData["StatesList"] = States;

            if (id == null || _context.Book == null)
            {
                return NotFound();
            }

            var book = await _context.Book
                .FirstOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            UserBook userBook = new UserBook(currentUserId, id.Value);
            var tuple = new BookAndUserBooks(book, userBook);
            return View(tuple);
        }

        // POST: Books/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddToMyBooks([Bind("Book, UserBook")] BookAndUserBooks ubb)
        {
            var bookId = ubb.UserBook.BookId;
            var State = ubb.UserBook.State;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserBook? myBook = (from ub in _context.UserBook
                                where ub.UserId.Equals(userId)
                                && ub.BookId.Equals(bookId)
                                select ub).FirstOrDefault();


            if (myBook != null)
            {
                 myBook.State= ubb.UserBook.State;
                _context.Update(myBook);
                _context.SaveChanges();
                return RedirectToAction(nameof(MyBooks));
            }
            else
            {
                UserBook userBook = new UserBook(userId, bookId);
              
                    _context.Add(ubb.UserBook);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(MyBooks));
               
            }
        }

        // GET: Books/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Book == null)
            {
                return NotFound();
            }

            var book = await _context.Book
                .FirstOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        public async Task<IActionResult> DeleteFromMyBooks(int? id)
        {
            var itemToRemove = await _context.UserBook
                .FirstOrDefaultAsync(m => m.Id == id);
  

            if (itemToRemove != null)
            {
                _context.UserBook.Remove(itemToRemove);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(MyBooks));
        }

        public async Task<IActionResult> DeleteComment(int? id)
        {
            var itemToRemove = await _context.Comment
                .FirstOrDefaultAsync(m => m.Id == id);


            if (itemToRemove != null)
            {
                _context.Comment.Remove(itemToRemove);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }


        // GET: Books
        public async Task<IActionResult> MyBooks(string searchString)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

  var dataSet = (from b in _context.Book
                              join ub in _context.UserBook on b.Id equals ub.BookId
                              where ub.UserId.Equals(currentUserId)
                              select new Tuple<Book, UserBook> ( b, ub )).ToList();

            var a=dataSet.First().Item1.Title;
           
            if (!String.IsNullOrEmpty(searchString))
            {
                dataSet = dataSet.Where(s => s.Item1.Title!.ToLower().Contains(searchString.ToLower())).ToList();
            }
            return View( dataSet);
        }

        public async Task<IActionResult> Comments(int? bookId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var dataSet = from c in _context.Comment
                          where c.BookId.Equals(bookId)
                          select c;


            ViewBag.id = bookId;
            ViewBag.user = currentUserId;
            return View(await dataSet.ToListAsync());
        }


        // GET: Books/Create
        public IActionResult Create()
        {
            return View();
        }

        public IActionResult CreateComment(int? bookId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return View(new Comment(currentUserId,bookId.Value));
        }

        // POST: Books/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Author, Year")] Book book)
        {
            if (ModelState.IsValid)
            {
                _context.Add(book);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(book);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateComment([Bind("Id,UserId,BookId, Text")] Comment comment)
        {
            if (ModelState.IsValid)
            {
                _context.Add(comment);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(comment);
        }



        // GET: Books/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Book == null)
            {
                return NotFound();
            }

            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return View(book);
        }

        // POST: Books/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Author,Year")] Book book)
        {
            if (id != book.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(book);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookExists(book.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(book);
        }

        // GET: Books/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Book == null)
            {
                return NotFound();
            }

            var book = await _context.Book
                .FirstOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        // POST: Books/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Book == null)
            {
                return Problem("Entity set 'Lab5Context2.Book'  is null.");
            }

            //delete comments
            var commentsToRemove = from c in _context.Comment
                                   where c.BookId.Equals(id)
                        select c;

            await commentsToRemove.ForEachAsync(c => _context.Comment.Remove(c));

            //delete from my books
            var userBooksToRemove = from ub in _context.UserBook
                                   where ub.BookId.Equals(id)
                                   select ub;

            await userBooksToRemove.ForEachAsync(ub => _context.UserBook.Remove(ub));


            var book = await _context.Book.FindAsync(id);
            if (book != null)
            {
                _context.Book.Remove(book);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BookExists(int id)
        {
          return _context.Book.Any(e => e.Id == id);
        }
    }
}
