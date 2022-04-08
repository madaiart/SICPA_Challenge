using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using System;
using System.Threading.Tasks;

namespace SICPA_Challenge.Configuration.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class APIKeyAuthAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            string controllerName = context.RouteData.Values["controller"].ToString();

            if (!context.HttpContext.Request.Headers.TryGetValue("Auth-Token", out StringValues potentialApiKey))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            IConfiguration configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            string apiKey = configuration.GetValue<string>($"Security:{controllerName}");

            if (!apiKey.Equals(potentialApiKey))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            await next();
        }
    }
}
