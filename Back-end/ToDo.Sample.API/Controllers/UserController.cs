using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ToDo.Sample.DataAccess.AuthenticationService;
using ToDo.Sample.DataAccess.Utility.BaseURI;
using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        private readonly IMapper _mapper;
        private readonly UserManager<ApiUser> _userManager;

        public UserController(IMapper mapper, UserManager<ApiUser> userManager, IAuthManager authManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _authManager = authManager;
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> Register([FromBody] UserDto userRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userToDb = _mapper.Map<ApiUser>(userRequest);
                var userResponse = await _userManager.CreateAsync(userToDb, userRequest.Password);

                if (!userResponse.Succeeded)
                {
                    foreach (var error in userResponse.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                await _userManager.AddToRoleAsync(userToDb, Role.USER_ROLE);

                return Accepted();

            }
            catch (Exception ex)
            {
                return Problem($"Somethong went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> Login([FromBody] LoginUserDto userRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                bool loginUserSucceeded = await _authManager.ValidateUser(userRequest);
                if (!loginUserSucceeded)
                {
                    return BadRequest("Sai mật khẩu");
                }

                return Accepted(new { token = await _authManager.CreateToken() });
            }
            catch (Exception ex)
            {
                return Problem($"Somethong went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }
    }
}
