using Microsoft.Extensions.DependencyInjection.Extensions;
using ToDo.Sample.DataAccess.AuthenticationService;
using ToDo.Sample.DataAccess.Data.Repository;
using ToDo.Sample.DataAccess.Data.Repository.IRepository;
using ToDo.Sample.DataAccess.Initializer;
using ToDo.Sample.DataAccess.Services.ClaimUserServices;
using ToDo.Sample.DataAccess.Services.ProfileUserServices;
using ToDo.Sample.DataAccess.Services.TodoServices;

namespace ToDo.Sample.API.ConfigureServicesExtension
{
    public static class AppModule
    {
        public static void ConfigureServiceLifeTime(this IServiceCollection services)
        {
            services.AddTransient<IdentityUserSeeding>();
            services.TryAddEnumerable(new[]
            {
                ServiceDescriptor.Transient<IUnitOfWork, UnitOfWork>(),
                ServiceDescriptor.Singleton<IHttpContextAccessor, HttpContextAccessor>(),
                ServiceDescriptor.Scoped<IAuthManager, AuthManager>(),
                ServiceDescriptor.Scoped<ITodoServices, TodoServices>(),
                ServiceDescriptor.Scoped<IProfileUserServices, ProfileUserServices>(),
                ServiceDescriptor.Scoped<IClaimUserServices, ClaimUserServices>(),
            });
        }
    }
}
