using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Sample.DataAccess.Services.ProfileUserServices;
using ToDo.Sample.Models.Dto;

namespace ToDo.Sample.API.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class ProfileUserController : ControllerBase
    {
        private readonly IProfileUserServices _profileUserServices;

        public ProfileUserController(IProfileUserServices profileUserServices)
        {
            _profileUserServices = profileUserServices;
        }

        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser()
        {
            var result = await _profileUserServices.GetUser();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _profileUserServices.UpdateUser(user);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
