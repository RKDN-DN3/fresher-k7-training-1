using Cards.API.Data;
using Cards.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cards.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : Controller
    {
        private readonly ApplicationDbContext applicationDbContext;

        public CardsController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        //Get All Cards
        [HttpGet("GetAll")]
        public async Task<IActionResult> GettAll()
        {
            var cards = await applicationDbContext.Cards.ToListAsync();
            return Ok(cards);
        }

        //Get Single Card
        [HttpGet("GetById/{id}")]
        [ActionName("GetById")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var card = await applicationDbContext.Cards.SingleOrDefaultAsync(x => x.Id == id);
            if (card != null)
            {
                return Ok(card);
            }
            return NotFound("Card not found");
        }

        //Add Card
        [HttpPost("AddCard")]
        public async Task<IActionResult> AddCard([FromBody] Card card)
        {
            card.Id = Guid.NewGuid();
            await applicationDbContext.Cards.AddAsync(card);
            await applicationDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById),new { id = card.Id },card);

        }

        //Update Card
        [HttpPut("UpdateCard/{id}")]
        public async Task<IActionResult> UpdateCard([FromRoute] Guid id, [FromBody] Card card)
        {
            var existingcard = await applicationDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if (existingcard != null)
            {
                existingcard.CardholderName = card.CardholderName;
                existingcard.CardNumber = card.CardNumber;
                existingcard.ExpiryMonth = card.ExpiryMonth;
                existingcard.ExpiryYear = card.ExpiryYear;
                existingcard.CVC = card.CVC;
                await applicationDbContext.SaveChangesAsync();
                return Ok(existingcard);
            }
            return NotFound("Card not found");
        }

        //Delete Card
        [HttpDelete("DeleteCard/{id}")]
        public async Task<IActionResult> DeleteCard([FromRoute]Guid id)
        {
            var existingcard = await applicationDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if (existingcard!=null)
            {
                applicationDbContext.Remove(existingcard);
                await applicationDbContext.SaveChangesAsync();
                return Ok(existingcard);
            }
            return NotFound("Card not found");
        }

    }
}
