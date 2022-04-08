using DAL.DTO;
using DAL.Models.Contexts;
using DAL.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    /// <summary>
    /// Manages the list, create, and edit properties
    /// </summary>
    public interface IEmployeesManager
    {
        Task<List<EmployeesDTO>> ListEmployeesAsync();
        Task<List<EmployeesDTO>> CreateEmployeeAsync(Employees epmloyee);

        Task<List<EmployeesDTO>> UpdateEmployeesAsync(Employees employee);
    }
}
