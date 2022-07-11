using AutoMapper;
using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Entities;
using ToDo.Sample.Models.Identity;

namespace ToDo.Sample.API.MapperConfig
{
    public class MapperInitilizer : Profile
    {
        public MapperInitilizer()
        {
            CreateMap<ApiUser, UserDto>().ReverseMap();
            CreateMap<Todo, TodoDto>().ReverseMap();
            CreateMap<Todo, TodoCreateDto>().ReverseMap();
        }
    }
}
