﻿using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeProjetos
{
    public class CardList
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [StringLength(200)]
        public string Text { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public DateTime? Deadline { get; set; }
        public bool Priority { get; set; }
        public int UserId { get; set; }
        public int? ListId { get; set; }
        public int ListNumber { get; set; }
        public int? IdTag { get; set; }
        public bool CheckList { get; set; }
        public bool haveDeadLine { get; set; }

    }
}
