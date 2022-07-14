using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.Models.Dto;

namespace ToDo.Sample.DataAccess.Services.ProfileUserServices
{
    public interface IProfileUserServices
    {
        Task<ResponseDto> GetUser();
        Task<ResponseDto> UpdateUser(UpdateUserDto user);
    }
}
