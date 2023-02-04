﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookCatalog.Data;
using BookCatalog.Models;

namespace BookCatalog.Views
{
    public class UserBooksController : Controller
    {
        private readonly BookCatalogContext _context;

        public UserBooksController(BookCatalogContext context)
        {
            _context = context;
        }

        // GET: UserBooks
        public async Task<IActionResult> Index()
        {
              return View(await _context.UserBook.ToListAsync());
        }

        // GET: UserBooks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserBook == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBook
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userBook == null)
            {
                return NotFound();
            }

            return View(userBook);
        }

        // GET: UserBooks/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserBooks/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,BookId,State")] UserBook userBook)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userBook);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userBook);
        }

        // GET: UserBooks/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserBook == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBook.FindAsync(id);
            if (userBook == null)
            {
                return NotFound();
            }
            return View(userBook);
        }

        // POST: UserBooks/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,BookId,State")] UserBook userBook)
        {
            if (id != userBook.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userBook);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserBookExists(userBook.Id))
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
            return View(userBook);
        }

        // GET: UserBooks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserBook == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBook
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userBook == null)
            {
                return NotFound();
            }

            return View(userBook);
        }

        // POST: UserBooks/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserBook == null)
            {
                return Problem("Entity set 'BookCatalogContext.UserBook'  is null.");
            }
            var userBook = await _context.UserBook.FindAsync(id);
            if (userBook != null)
            {
                _context.UserBook.Remove(userBook);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserBookExists(int id)
        {
          return _context.UserBook.Any(e => e.Id == id);
        }
    }
}
