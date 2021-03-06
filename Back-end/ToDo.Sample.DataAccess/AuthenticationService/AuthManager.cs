using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.DataAccess.Utility.BaseURI;
using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.DataAccess.AuthenticationService
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IConfiguration _configuration;
        private ApiUser _user;

        public AuthManager(UserManager<ApiUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> CreateToken()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var token = GenerateTokenOptions(claims, signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken GenerateTokenOptions(List<Claim> claims, SigningCredentials signingCredentials)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var expiration = DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("lifetime").Value));


            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("Issuer").Value,
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
                );

            return token;
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypeUser.TYPE_NAME, _user.UserName),
                new Claim(ClaimTypeUser.TYPE_USERID, _user.Id),
            };

            var roles = await _userManager.GetRolesAsync(_user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypeUser.TYPE_ROLE, role));
            }

            return claims;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = _configuration.GetSection("Secret").GetSection("Key").Value;
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha512Signature);

            return signingCredentials;
        }

        public async Task<bool> ValidateUser(LoginUserDto userRequest)
        {
            _user = await _userManager.FindByEmailAsync(userRequest.EmailOrUserName);
            if (_user == null)
            {
                _user = await _userManager.FindByNameAsync(userRequest.EmailOrUserName);
            }

            bool checkUserSuccess = await _userManager.CheckPasswordAsync(_user, userRequest.Password);

            if (_user != null && checkUserSuccess)
            {
                return true;
            }
            return false;
        }
    }
}
