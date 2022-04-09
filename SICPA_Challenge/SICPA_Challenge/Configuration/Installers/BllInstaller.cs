

using BLL;
using BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SICPA_Challenge.Configuration.Installers
{
    public class BllInstaller : IInstaller
    {
        public void InstallerServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddSingleton<IEnterprisesManager, EnterprisesManager>();
            services.AddSingleton<IDepartmentsManager, DepartmentsManager>();
            services.AddSingleton<IEmployeesManager, EmployeesManager>();
        }
    }
}
