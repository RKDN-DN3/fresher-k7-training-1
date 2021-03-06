using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Entities;

namespace ToDo.Sample.DataAccess.Services.TodoServices
{
    public interface ITodoServices
    {
        Task<ResponseDto> CreateTodo(TodoCreateDto model);
        Task<ResponseDto> UpdateTodo(TodoDto model);
        Task<ResponseDto> GetTodos();
        Task<ResponseDto> DeleteTodo(int idTodo);
    }
}
