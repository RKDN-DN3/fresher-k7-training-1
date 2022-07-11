using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Sample.DataAccess.Services.TodoServices;
using ToDo.Sample.Models.Dto;

namespace ToDo.Sample.API.Controllers
{
    [Route("api/todos")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ITodoServices _todoServices;

        public TodoController(ITodoServices todoServices)
        {
            _todoServices = todoServices;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoCreateDto todoRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _todoServices.CreateTodo(todoRequest);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpPut("update-todo")]
        public async Task<IActionResult> UpdateTodo([FromBody] TodoDto todoRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _todoServices.UpdateTodo(todoRequest);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpDelete("delete-todo/{idTodo:int}")]
        public async Task<IActionResult> DeleteTodo(int idTodo)
        {
            var result = await _todoServices.DeleteTodo(idTodo);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpGet("get-todos")]
        public async Task<IActionResult> GetTodos()
        {
            var result = await _todoServices.GetTodos();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
