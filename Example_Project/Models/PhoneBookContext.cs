using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Example_Project.Models
{
    public class PhoneBookContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Category> Categories { get; set; }

        public PhoneBookContext(DbContextOptions<PhoneBookContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
