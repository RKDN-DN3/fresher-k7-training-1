using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Sample.DataAccess.Services.ClaimUserServices
{
    public  interface IClaimUserServices
    {
        string GetCurrentUserId();
        string GetCurrentUserRole();
        string GetCurrentUserName();
    }
}
