using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Sample.Models.Dto
{
    public class ResponseDto
    {
        public bool IsSuccess { get; set; } = true;
        public object Result { get; set; }
        public string ErrorMessages { get; set; } = "";
    }

    public class ResponseDatas<T> where T : class
    {
        public bool IsSuccess { get; set; } = true;
        public List<T> Datas { get; set; }
        public string ErrorMessages { get; set; } = "";
    }
}
