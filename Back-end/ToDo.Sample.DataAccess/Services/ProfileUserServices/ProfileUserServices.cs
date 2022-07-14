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
        private readonly ResponseDto _responseDto;

        public ProfileUserServices(UserManager<ApiUser> userManager, IClaimUserServices claimUserServices)
        {
            _userManager = userManager;
            _claimUserServices = claimUserServices;
            _responseDto = new ResponseDto();
        }

        public async Task<ResponseDto> GetUser()
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                _responseDto.Result = _userManager.Users
                    .Where(c => c.Id == currentUserId)
                    .Select(c => new UserForProfileDto()
                    {
                        FullName = c.FullName,
                        UserName = c.UserName,
                        Email = c.Email,
                        PhoneNumber = c.PhoneNumber,
                        Role = string.Join(",", _userManager.GetRolesAsync(c).Result.ToArray())
                    }).ToList();
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }
            await Task.CompletedTask;
            return _responseDto;
        }

        public async Task<ResponseDto> UpdateUser(UpdateUserDto user)
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                if (currentUserId == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "User not exist in system";
                }
                var userInDn = await _userManager.FindByIdAsync(currentUserId);
                userInDn.FullName = user.FullName;
                userInDn.PhoneNumber = user.PhoneNumber;
                await _userManager.UpdateAsync(userInDn);
                _responseDto.Result = user;
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }
            return _responseDto;
        }
    }
}
