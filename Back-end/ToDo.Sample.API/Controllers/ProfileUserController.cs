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

        [HttpGet("getuser")]
        public async Task<IActionResult> GetUser()
        {
            var result = await _profileUserServices.GetUser();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
