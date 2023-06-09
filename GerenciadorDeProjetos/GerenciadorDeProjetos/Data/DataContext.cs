using Microsoft.EntityFrameworkCore;
using GerenciadorDeProjetos;

namespace GerenciadorDeProjetos.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<List> List { get; set; }
        public DbSet<LoginUser> loginUsers { get; set; }
        public DbSet<CardList> CardList { get; set; }
        public DbSet<CheckList> CheckList { get; set; }
    }
}
