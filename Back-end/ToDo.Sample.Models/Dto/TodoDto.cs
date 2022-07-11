using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Sample.Models.Dto
{
    public class TodoCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }

    public class TodoDto : TodoCreateDto
    {
        public int Id { get; set; }

    }
}
