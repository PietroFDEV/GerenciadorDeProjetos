using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeProjetos;
using GerenciadorDeProjetos.Data;

namespace GerenciadorDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckListsController : ControllerBase
    {
        private readonly DataContext _context;

        public CheckListsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CheckLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CheckList>>> GetCheckList()
        {
          if (_context.CheckList == null)
          {
              return NotFound();
          }
            return await _context.CheckList.ToListAsync();
        }

        // GET: api/CheckLists/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<CheckList>> GetCheckList(int id)
        {
          if (_context.CheckList == null)
          {
              return NotFound();
          }

            return _context.CheckList.Where(c => c.IdCard == id).ToList();
        }

        // PUT: api/CheckLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCheckList(int id, CheckList checkList)
        {
            if (id != checkList.Id)
            {
                return BadRequest();
            }

            _context.Entry(checkList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CheckListExists(id))
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

        // POST: api/CheckLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CheckList>> PostCheckList(CheckList checkList)
        {
          if (_context.CheckList == null)
          {
              return Problem("Entity set 'DataContext.CheckList'  is null.");
          }
            _context.CheckList.Add(checkList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCheckList", new { id = checkList.Id }, checkList);
        }

        // DELETE: api/CheckLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckList(int id)
        {
            if (_context.CheckList == null)
            {
                return NotFound();
            }
            var checkList = await _context.CheckList.FindAsync(id);
            if (checkList == null)
            {
                return NotFound();
            }

            _context.CheckList.Remove(checkList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CheckListExists(int id)
        {
            return (_context.CheckList?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
