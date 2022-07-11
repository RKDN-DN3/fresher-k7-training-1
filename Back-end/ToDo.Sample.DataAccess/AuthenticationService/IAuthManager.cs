using ToDo.Sample.Models.Dto;

namespace ToDo.Sample.DataAccess.AuthenticationService
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginUserDto userRequest);
        Task<string> CreateToken();
    }
}
