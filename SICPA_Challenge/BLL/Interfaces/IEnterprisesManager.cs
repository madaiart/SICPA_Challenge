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
    /// Manages the list, create and edit properties
    /// </summary>
    public interface IEnterprisesManager
    {        
        Task<List<EnterprisesDTO>> ListEnterprisesAsync();
        Task<List<EnterprisesDTO>> CreateEnterpriseAsync(Enterprises enterprise);
        Task<List<EnterprisesDTO>> UpdateEnterpriseAsync(Enterprises enterprise);
    }
}
