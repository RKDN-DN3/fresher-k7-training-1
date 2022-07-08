using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.API.Authentication;
using ToDo.API.Models;

namespace ToDo.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ToDoItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get All
        [HttpGet("GetAll")]
        public async Task<IActionResult> GettAll()
        {
            var ToDoItems = await _context.ToDoItems.ToListAsync();
            return Ok(ToDoItems);
        }

        //Get Single ToDo
        [HttpGet("GetById/{id}")]
        [ActionName("GetById")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var ToDoItem = await _context.ToDoItems.SingleOrDefaultAsync(x => x.ItemId == id);
            if (ToDoItem != null)
            {
                return Ok(ToDoItem);
            }
            return NotFound("Task not found");
        }

        //Add ToDo
        [HttpPost("AddTDO")]
        public async Task<IActionResult> AddTDO([FromBody] ToDoItemModel toDoItemModel)
        {
            await _context.ToDoItems.AddAsync(toDoItemModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = toDoItemModel.ItemId }, toDoItemModel);

        }

        //Update ToDO
        [HttpPut("UpdateTDO/{id}")]
        public async Task<IActionResult> UpdateTDO([FromRoute] int id, [FromBody] ToDoItemModel toDoItemModel)
        {
            var existingdoto = await _context.ToDoItems.FirstOrDefaultAsync(x => x.ItemId == id);
            if (existingdoto != null)
            {
                existingdoto.ItemName = toDoItemModel.ItemName;
                existingdoto.ItemDescription = toDoItemModel.ItemDescription;
                existingdoto.ItemStatus = toDoItemModel.ItemStatus;
                existingdoto.ItemTime = toDoItemModel.ItemTime;
                await _context.SaveChangesAsync();
                return Ok(existingdoto);
            }
            return NotFound("Task not found");
        }

        //Delete ToDo
        [HttpDelete("DeleteTDO/{id}")]
        public async Task<IActionResult> DeleteTDO([FromRoute] int id)
        {
            var existingdoto = await _context.ToDoItems.FirstOrDefaultAsync(x => x.ItemId == id);
            if (existingdoto != null)
            {
                _context.Remove(existingdoto);
                await _context.SaveChangesAsync();
                return Ok(existingdoto);
            }
            return NotFound("Task not found");
        }

    }
}
