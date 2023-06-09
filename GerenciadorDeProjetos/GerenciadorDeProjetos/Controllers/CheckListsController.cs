using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeProjetos;
using GerenciadorDeProjetos.Data;

namespace GerenciadorDeProjetos.Controllers
{
    public class CheckListsController : Controller
    {
        private readonly DataContext _context;

        public CheckListsController(DataContext context)
        {
            _context = context;
        }

        // GET: CheckLists
        public async Task<IActionResult> Index()
        {
              return _context.CheckList != null ? 
                          View(await _context.CheckList.ToListAsync()) :
                          Problem("Entity set 'DataContext.CheckList'  is null.");
        }

        // GET: CheckLists/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.CheckList == null)
            {
                return NotFound();
            }

            var checkList = await _context.CheckList
                .FirstOrDefaultAsync(m => m.Id == id);
            if (checkList == null)
            {
                return NotFound();
            }

            return View(checkList);
        }

        // GET: CheckLists/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CheckLists/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdCard,Check,Text")] CheckList checkList)
        {
            if (ModelState.IsValid)
            {
                _context.Add(checkList);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(checkList);
        }

        // GET: CheckLists/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.CheckList == null)
            {
                return NotFound();
            }

            var checkList = await _context.CheckList.FindAsync(id);
            if (checkList == null)
            {
                return NotFound();
            }
            return View(checkList);
        }

        // POST: CheckLists/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdCard,Check,Text")] CheckList checkList)
        {
            if (id != checkList.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(checkList);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CheckListExists(checkList.Id))
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
            return View(checkList);
        }

        // GET: CheckLists/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.CheckList == null)
            {
                return NotFound();
            }

            var checkList = await _context.CheckList
                .FirstOrDefaultAsync(m => m.Id == id);
            if (checkList == null)
            {
                return NotFound();
            }

            return View(checkList);
        }

        // POST: CheckLists/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.CheckList == null)
            {
                return Problem("Entity set 'DataContext.CheckList'  is null.");
            }
            var checkList = await _context.CheckList.FindAsync(id);
            if (checkList != null)
            {
                _context.CheckList.Remove(checkList);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CheckListExists(int id)
        {
          return (_context.CheckList?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
