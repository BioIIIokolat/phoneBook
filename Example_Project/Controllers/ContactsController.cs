using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Example_Project.Models;

namespace Example_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly PhoneBookContext _context;

        public ContactsController(PhoneBookContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.Include(t => t.Phones)
                .Include(t => t.Category).ToListAsync();
        }

        [HttpGet("name/{name:alpha}")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactByName(string name)
        {
            return await _context.Contacts.Include(t => t.Phones)
                .Include(t => t.Category).Where(t => t.FirstName == name || t.LastName == name).ToListAsync();
        }
        
        [HttpGet("phone/{phone}")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactByPhone(string phone)
        {
            string numb = string.Concat("+", phone);
            return await _context.Contacts.Include(t => t.Phones)
                .Include(t => t.Category).Where(t => t.Phones.Any(t => t.PhoneNumber == numb))
                .ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id,[FromBody]Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            List<Phone> phones = new List<Phone>();
            Category category = new Category();

            contact.Phones.ForEach((item) =>
                   phones.Add(_context.Phones.FirstOrDefault(t => t.Id == item.Id)));

            category = await _context.Categories.FindAsync(contact.Category.Id);

            contact.Phones = phones;
            contact.Category = category;

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact([FromBody] Contact contact)
        {
            List<Phone> phones = new List<Phone>();
            Category category = new Category();

            contact.Phones.ForEach((item) => phones.Add(_context.Phones.FirstOrDefault(t => t.Id == item.Id)) );
            
            category = await _context.Categories.FindAsync(contact.Category.Id);

            Contact contact_create = new Contact()
            {
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Address = contact.Address,
                EMail = contact.EMail,
                Category = category,
                Phones = phones,
                Birthday = DateTime.Now,
            };
            

            _context.Contacts.Add(contact_create);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
