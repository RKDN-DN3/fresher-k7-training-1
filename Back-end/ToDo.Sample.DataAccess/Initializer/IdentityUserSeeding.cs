using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ToDo.Sample.DataAccess.Data;
using ToDo.Sample.DataAccess.Utility.BaseURI;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.DataAccess.Initializer
{
    public class IdentityUserSeeding
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApiUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityUserSeeding(ApplicationDbContext context, UserManager<ApiUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Initialize()
        {
            string[] roles = new string[] { Role.ADMIN_ROLE, Role.USER_ROLE };

            foreach (string role in roles)
            {
                var roleInDb = _context.Roles.FirstOrDefault(c => c.Name == role);

                if (roleInDb == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var user = new ApiUser
            {
                FullName = "Le Ba Quang",
                Email = "admin@gmail.com",
                NormalizedEmail = "ADMIN@GMAIL.COM",
                UserName = "adminuser",
                NormalizedUserName = "adminuser",
                PhoneNumber = "123456987",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };

            var userInDb = _context.Users.FirstOrDefault(c => c.UserName == user.UserName);

            if (userInDb == null)
            {
                await _userManager.CreateAsync(user, "@Abc123");
                await _userManager.AddToRoleAsync(user, Role.ADMIN_ROLE);
            }
        }
    }
}
