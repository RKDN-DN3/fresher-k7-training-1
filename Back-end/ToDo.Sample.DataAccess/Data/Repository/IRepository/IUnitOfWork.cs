using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.Models.Entities;

namespace ToDo.Sample.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Todo> Todos { get; }
        Task<bool> SaveChangeAsync();
    }
}
