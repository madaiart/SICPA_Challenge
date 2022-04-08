using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Polly;
using SICPA_Challenge.Configuration.OpenApi_Swagger;
using DAL.Models.Contexts;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace SICPA_Challenge.Configuration.Installers
{
    public class MVCInstaller : IInstaller
    {
        readonly string AllowSpecificOrigins = "_SICPAOrigins";

        public void InstallerServices(IServiceCollection services, IConfiguration Configuration)
        {
            // DataBase

            //services.AddDbContextPool<SICPAContext>((serviceProvider, optionsBuilder) =>
            //{
            //    optionsBuilder.UseMySql(
            //        Configuration.GetConnectionString("SICPA_DB"), mySqlOptions => mySqlOptions.ServerVersion("10.7.3-mariadb")
            //        );
            //    optionsBuilder.UseInternalServiceProvider(serviceProvider);
            //}
            //     );

            services.AddDbContext<SICPAContext>();

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins, policy =>
                {
                    policy.WithOrigins("http://localhost", "https://localhost");
                });
            });

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddSwaggerGen(c =>
            {
                c.OperationFilter<CustomHeaderSwaggerAttribute>();
            });
        }
    }
}
