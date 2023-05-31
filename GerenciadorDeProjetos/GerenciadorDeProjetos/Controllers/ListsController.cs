using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeProjetos;
using GerenciadorDeProjetos.Data;
using NuGet.Protocol;

namespace GerenciadorDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly DataContext _context;

        public ListsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Lists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<List>>> GetList()
        {
          if (_context.List == null)
          {
              return NotFound();
          }
            return await _context.List.ToListAsync();
        }

        //GET: api/Lists/user/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<List>>> GetListUserId(int id)
        {
            if (_context.List == null)
            {
                return NotFound();
            }
            var lslists = await _context.List.Where(l => l.IdUser == id).ToListAsync();

            lslists.ForEach(d =>
            {
                var cards = _context.CardList.Where(c => c.ListId == d.Id).ToList();
                if (cards != null)
                {
                    cards.ForEach(m =>
                    {
                        d.CardList.Append(m);
                    });
                }
            });

            return lslists;
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List>> GetList(int id)
        {
            if (_context.List == null)
            {
                return NotFound();
            }
            var list = await _context.List.FindAsync(id);

            if (list == null)
            {
                return NotFound();
            }

            return list;
        }

        // PUT: api/Lists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutList(int id, List list)
        {
            if (id != list.Id)
            {
                return BadRequest();
            }

            _context.Entry(list).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List>> PostList(List list)
        {
          if (_context.List == null)
          {
              return Problem("Entity set 'DataContext.List'  is null.");
          }
            _context.List.Add(list);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetList", new { id = list.Id }, list);
        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList(int id)
        {
            if (_context.List == null)
            {
                return NotFound();
            }
            var list = await _context.List.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }

            _context.List.Remove(list);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Lists/DeleteLists/5/1
        [HttpDelete("DeleteLists/{listNumber}/{userId}")]
        public async Task<IActionResult> DeleteListByUser(int listNumber, int userId)
        {
            if (_context.List == null)
            {
                return NotFound();
            }
            var list = _context.List.Where(d => d.ListNumber == listNumber && d.IdUser == userId).ToList();
            if (list == null)
            {
                return NotFound();
            }
            list.ForEach(d => _context.List.Remove(d));
            await _context.SaveChangesAsync();

            var listUpdate = _context.List.Where(d => d.IdUser == userId).ToList();
            listUpdate.ForEach(l => {
                if (l.ListNumber > listNumber)
                {
                    l.ListNumber = (l.ListNumber - 1);
                }
            });
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListExists(int id)
        {
            return (_context.List?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
