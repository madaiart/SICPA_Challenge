using BLL.Interfaces;
using DAL.DTO;
using DAL.Models.Contexts;
using DAL.Models.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SICPA_Challenge.Controllers
{
    [ApiController]
    //[APIAPIKeyAuth]
    [Route("api/[controller]")]
    public class SICPAController : ControllerBase
    {
        private readonly SICPAContext _context;
        private readonly IEnterprisesManager _enterprisesManager;
        private readonly IDepartmentsManager _departmentsManager;
        private readonly IEmployeesManager _employeesManager;
        private readonly ILogger<SICPAController> _logger;

        public SICPAController(
            ILogger<SICPAController> logger, 
            SICPAContext context,
            IEnterprisesManager enterprisesManager, 
            IDepartmentsManager departmentsManager, 
            IEmployeesManager employeesManager)
        {
            _logger = logger;
            _context = context;
            _enterprisesManager = enterprisesManager;
            _departmentsManager = departmentsManager;
            _employeesManager = employeesManager;
        }

        #region Enteprises CRUD

        [HttpGet("enterprises")]
        public async Task<IActionResult> GetEnterpisesAsync()
        {
            var result = await _enterprisesManager.ListEnterprisesAsync();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("enterprise")]
        public async Task<IActionResult> CreateEnterprisesAsync([FromBody] EnterprisesDTO enterprise)
        {

            var result = await _enterprisesManager.CreateEnterpriseAsync(Enterprises.toEnterprises(enterprise));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPatch("enterprise")]
        public async Task<IActionResult> UpdateEnterprisesAsync([FromBody] EnterprisesDTO enterprise)
        {
            var result = await _enterprisesManager.UpdateEnterpriseAsync(Enterprises.toEnterprises(enterprise));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        #endregion

        #region Departments  CRUD
        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartmentsAsync()
        {
            var enterprices = await _departmentsManager.ListDepartmentsAsync();
            if (enterprices == null)
            {
                return NotFound();
            }
            return Ok(enterprices);
        }

        [HttpPost("department")]
        public async Task<IActionResult> CreateDepartmentAsync([FromBody] DepartmentsDTO department)
        {
            var result = await _departmentsManager.CreateDepartmentsAsync(Departments.toDepartments(department));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPatch("department")]
        public async Task<IActionResult> UpdateDepartmentAsync([FromBody] DepartmentsDTO department)
        {
            var result = await _departmentsManager.CreateDepartmentsAsync(Departments.toDepartments(department));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        #endregion

        #region Employees  CRUD
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployeesAsync()
        {
            var employees = await _employeesManager.ListEmployeesAsync();
            if (employees == null)
            {
                return NotFound();
            }
            return Ok(employees);
        }

        [HttpPost("employee")]
        public async Task<IActionResult> CreateEmployeeAsync([FromBody] EmployeesDTO employee)
        {
            var result = await _employeesManager.CreateEmployeeAsync(Employees.toEmployees(employee));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPatch("employee")]
        public async Task<IActionResult> UpdateEmployeeAsync([FromBody] EmployeesDTO employee)
        {
            var result = await _employeesManager.UpdateEmployeesAsync(Employees.toEmployees(employee));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        #endregion
    }
}
