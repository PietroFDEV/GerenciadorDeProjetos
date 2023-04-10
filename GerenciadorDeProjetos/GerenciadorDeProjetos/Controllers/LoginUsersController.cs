using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeProjetos;
using GerenciadorDeProjetos.Data;
using NuGet.Protocol.Plugins;

namespace GerenciadorDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginUsersController : ControllerBase
    {
        private readonly DataContext _context;

        public LoginUsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/LoginUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginUser>>> GetloginUsers()
        {
          if (_context.loginUsers == null)
          {
              return NotFound();
          }
            return await _context.loginUsers.ToListAsync();
        }

        // GET: api/LoginUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginUser>> GetLoginUser(int id)
        {
          if (_context.loginUsers == null)
          {
              return NotFound();
          }
            var loginUser = await _context.loginUsers.FindAsync(id);

            if (loginUser == null)
            {
                return NotFound();
            }

            return loginUser;
        }

        [HttpGet("{login}/{pass}")]
        public bool ExistsUser(string login, string pass)
        {
            return (_context.loginUsers?.Any(e => e.UserLogin == login && e.UserPass == pass)).GetValueOrDefault();
        }

        // PUT: api/LoginUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginUser(int id, LoginUser loginUser)
        {
            if (id != loginUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(loginUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginUserExists(id))
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

        // POST: api/LoginUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoginUser>> PostLoginUser(LoginUser loginUser)
        {
          if (_context.loginUsers == null)
          {
              return Problem("Entity set 'DataContext.loginUsers'  is null.");
          }
            _context.loginUsers.Add(loginUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoginUser", new { id = loginUser.Id }, loginUser);
        }

        // DELETE: api/LoginUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoginUser(int id)
        {
            if (_context.loginUsers == null)
            {
                return NotFound();
            }
            var loginUser = await _context.loginUsers.FindAsync(id);
            if (loginUser == null)
            {
                return NotFound();
            }

            _context.loginUsers.Remove(loginUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginUserExists(int id)
        {
            return (_context.loginUsers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
