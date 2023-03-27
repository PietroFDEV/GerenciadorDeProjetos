using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeProjetos
{
    public class CardList
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string Text { get; set; } = string.Empty;

        public int ListId { get; set; }
    }
}
