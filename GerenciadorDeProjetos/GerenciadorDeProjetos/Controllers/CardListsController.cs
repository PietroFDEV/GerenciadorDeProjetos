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
    public class CardListsController : ControllerBase
    {
        private readonly DataContext _context;

        public CardListsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CardLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardList>>> GetCardList()
        {
          if (_context.CardList == null)
          {
              return NotFound();
          }
            return await _context.CardList.ToListAsync();
        }

        // GET: api/CardLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardList>> GetCardList(int id)
        {
          if (_context.CardList == null)
          {
              return NotFound();
          }
            var cardList = await _context.CardList.FindAsync(id);

            if (cardList == null)
            {
                return NotFound();
            }

            return cardList;
        }

        // PUT: api/CardLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardList(int id, CardList cardList)
        {
            if (id != cardList.Id)
            {
                return BadRequest();
            }

            _context.Entry(cardList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardListExists(id))
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

        // POST: api/CardLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CardList>> PostCardList(CardList cardList)
        {
          if (_context.CardList == null)
          {
              return Problem("Entity set 'DataContext.CardList'  is null.");
          }
            _context.CardList.Add(cardList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCardList", new { id = cardList.Id }, cardList);
        }

        // DELETE: api/CardLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardList(int id)
        {
            if (_context.CardList == null)
            {
                return NotFound();
            }
            var cardList = await _context.CardList.FindAsync(id);
            if (cardList == null)
            {
                return NotFound();
            }

            _context.CardList.Remove(cardList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardListExists(int id)
        {
            return (_context.CardList?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("GetCardListByUserId/{UserId}/{ListId}")]
        public async Task<ActionResult<IEnumerable<CardList>>> GetCardListByUserId(int UserId, int ListId)
        {
            return await _context.CardList.Where(d => d.UserId == UserId && d.ListId == ListId).ToListAsync();
        }
    }
}
