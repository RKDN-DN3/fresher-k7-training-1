using AutoMapper;
using ToDo.Sample.DataAccess.Data.Repository.IRepository;
using ToDo.Sample.DataAccess.Services.ClaimUserServices;
using ToDo.Sample.Models.Dto;
using ToDo.Sample.Models.Entities;

namespace ToDo.Sample.DataAccess.Services.TodoServices
{
    public class TodoServices : ITodoServices
    {
        private readonly IMapper _mapper;
        private readonly IClaimUserServices _claimUserServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ResponseDto _responseDto;

        public TodoServices(IMapper mapper,
            IClaimUserServices claimUserServices,
            IUnitOfWork unitOfWork
            )
        {
            _mapper = mapper;
            _claimUserServices = claimUserServices;
            _unitOfWork = unitOfWork;
            _responseDto = new ResponseDto();
        }

        public async Task<ResponseDto> CreateTodo(TodoCreateDto model)
        {
            try
            {
                model.StartDate = model.StartDate.ToLocalTime();
                model.EndDate = model.EndDate.ToLocalTime();
                var currentUserId = _claimUserServices.GetCurrentUserId();
                var todoToDb = _mapper.Map<Todo>(model);

                todoToDb.Status = "Open";
                todoToDb.UpdatedBy = currentUserId;
                todoToDb.CreatedBy = currentUserId;
                todoToDb.CreatedAt = DateTime.Now;
                todoToDb.UpdatedAt = DateTime.Now;
                todoToDb.UserId = currentUserId;
                await _unitOfWork.Todos.Add(todoToDb);
                await _unitOfWork.SaveChangeAsync();
                
                _responseDto.Result = model;
            }
            catch (Exception ex)
            {

                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }
            return _responseDto;
        }

        public async Task<ResponseDto> DeleteTodo(int idTodo)
        {
            try
            {
                var todoInDb = await _unitOfWork.Todos.Get(c => c.Id == idTodo);
                if (todoInDb == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Event not exist in system";
                    return _responseDto;
                }
                todoInDb.IsDeleted = true;
                await _unitOfWork.Todos.Update(todoInDb);
                await _unitOfWork.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }
            return _responseDto;
        }

        public async Task<ResponseDto> GetTodos()
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();

                var todos = await _unitOfWork.Todos.GetAll(c => c.UserId == currentUserId);
                _responseDto.Result = _mapper.Map<IEnumerable<Todo>>(todos).AsEnumerable()
                .Where(c => c.IsDeleted == false)
                .Select(c => new TodoDto()
                 {
                     Id = c.Id,
                     Title = c.Title,
                     Description = c.Description,
                     Status = c.Status,
                     StartDate = (DateTime)c.StartDate,
                     EndDate = (DateTime)c.EndDate
                 }).ToList();
            }
            catch (Exception ex)
            {
                _responseDto.ErrorMessages = ex.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }

        public async Task<ResponseDto> UpdateTodo(TodoDto model)
        {
            try
            {
                var todoInDb = await _unitOfWork.Todos.Get(c => c.Id == model.Id);
                if (todoInDb == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Todo not exist in systems";
                    return _responseDto;
                }
                var currentUserId = _claimUserServices.GetCurrentUserId();
                var todoToDb = _mapper.Map<Todo>(model);

                todoToDb.UpdatedBy = currentUserId;
                todoToDb.CreatedBy = todoInDb.CreatedBy;
                todoToDb.CreatedAt = todoInDb.CreatedAt;
                todoToDb.UpdatedAt = todoInDb.UpdatedAt;
                todoToDb.UserId = todoInDb.UserId;

                await _unitOfWork.Todos.Update(todoToDb);
                await _unitOfWork.SaveChangeAsync();

                _responseDto.Result = model;

            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }
    }
}
