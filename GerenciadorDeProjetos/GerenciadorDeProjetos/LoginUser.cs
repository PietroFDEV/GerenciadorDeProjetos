using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeProjetos
{
    public class LoginUser
    {
        public int Id { get; set; }
        public string UserLogin { get; set; } = string.Empty;
        public string UserPass { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
