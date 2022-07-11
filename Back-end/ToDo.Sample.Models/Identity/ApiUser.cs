using Microsoft.AspNetCore.Identity;

namespace ToDo.Sample.Models.Identity
{
    public class ApiUser : IdentityUser
    {
        public string? FullName { get; set; }
    }
}
