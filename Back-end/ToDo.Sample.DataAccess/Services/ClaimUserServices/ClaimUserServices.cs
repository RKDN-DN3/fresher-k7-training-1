using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.DataAccess.Utility.BaseURI;

namespace ToDo.Sample.DataAccess.Services.ClaimUserServices
{
    public class ClaimUserServices : IClaimUserServices
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClaimUserServices(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetCurrentUserName()
        {
            return _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypes.Name)?.Value;
        }

        public string GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypeUser.TYPE_USERID)?.Value;
        }

        public string GetCurrentUserRole()
        {
            return _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypes.Role)?.Value;
        }
    }
}
