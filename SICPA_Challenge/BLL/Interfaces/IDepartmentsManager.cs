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
    public interface IDepartmentsManager
    {
        Task<List<DepartmentsDTO>> ListDepartmentsAsync();
        Task<List<DepartmentsDTO>> CreateDepartmentsAsync(Departments  department);
        Task<List<DepartmentsDTO>> UpdateDepartmentsAsync(Departments department);
    }
}
