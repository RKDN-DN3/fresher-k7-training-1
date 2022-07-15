using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.Models.Entities
{
    public class Todo : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApiUser ApiUser { get; set; }
        public bool IsDeleted { get; set; } 

    }
}
