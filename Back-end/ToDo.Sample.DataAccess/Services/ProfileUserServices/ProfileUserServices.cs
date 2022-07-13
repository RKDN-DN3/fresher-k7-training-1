using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.DataAccess.Services.ClaimUserServices;
using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.DataAccess.Services.ProfileUserServices
{
    public class ProfileUserServices : IProfileUserServices
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IClaimUserServices _claimUserServices;

        public ProfileUserServices(UserManager<ApiUser> userManager, IClaimUserServices claimUserServices)
        {
            _userManager = userManager;
            _claimUserServices = claimUserServices;
        }

        public async Task<ResponseDatas<UserForProfileDto>> GetUser()
        {
            var response = new ResponseDatas<UserForProfileDto>();
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                response.Datas = _userManager.Users
                    .Where(c => c.Id == currentUserId)
                    .Select(c => new UserForProfileDto()
                    {
                        FullName = c.FullName,
                        UserName = c.UserName,
                        Email = c.Email,
                        PhoneNumber = c.PhoneNumber,
                        Role = string.Join(",",_userManager.GetRolesAsync(c).Result.ToArray())
                    }).ToList();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }
            await Task.CompletedTask;
            return response;
        }
    }
}
