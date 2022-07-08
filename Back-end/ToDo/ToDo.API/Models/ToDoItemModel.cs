using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDo.API.Models
{
    public class ToDoItemModel
    {
        [Key]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "ItemName is required")]
        [Column(TypeName = "nvarchar(100)")]
        public string? ItemName { get; set; }

        [Required(ErrorMessage = "ItemDescription is required")]
        [Column(TypeName = "nvarchar(200)")]
        public string? ItemDescription { get; set; }

        [Required(ErrorMessage = "ItemStatus is required")]
        [Column(TypeName = "bit")]
        public bool ItemStatus { get; set; }

        [Column(TypeName = "date")]
        public DateTime ItemTime { get; set; }
    }
}
