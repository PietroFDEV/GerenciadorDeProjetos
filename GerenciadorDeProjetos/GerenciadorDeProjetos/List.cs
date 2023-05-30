using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeProjetos
{
    public class List
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string ListName { get; set; } = string.Empty;
        public bool PriorityList { get; set; }
        public bool Active { get; set; } 
        public int IdUser { get; set; }
        public IEnumerable<CardList>? CardList { get; set; }
    }
}
