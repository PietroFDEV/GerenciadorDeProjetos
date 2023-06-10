using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeProjetos
{
    public class CheckList
    {
        public int Id { get; set; }
        public int IdCard { get; set; }
        public bool Check { get; set; }
        [StringLength(20)]
        public string Text { get; set; } = string.Empty;

    }
}
