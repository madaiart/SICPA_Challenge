using BLL.Interfaces;
using DAL.DTO;
using DAL.Models.Contexts;
using DAL.Models.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class EnterprisesManager : IEnterprisesManager
    {
        public async Task<List<EnterprisesDTO>> CreateEnterpriseAsync(Enterprises enterprises)
        {
            using (var context = new SICPAContext())
            {
                var newEnterprise = new Enterprises()
                {
                    CreatedBy = enterprises.CreatedBy,
                    CreatedDate = enterprises.CreatedDate,
                    ModifiedBy = enterprises.ModifiedBy,
                    ModifiedDate = enterprises.ModifiedDate,
                    Status = enterprises.Status,
                    Address = enterprises.Address,
                    Name = enterprises.Name,
                    Phone = enterprises.Phone,
                    

                };
                context.Entry(newEnterprise).State = EntityState.Added;
                context.SaveChanges();
                return await ListEnterprisesAsync();
            }
        }

        public async Task<List<EnterprisesDTO>> ListEnterprisesAsync()
        {
            try
            {
                using (var context = new SICPAContext())
                {
                    var enterpricesDB = await context.Enterprises.ToListAsync();
                    var enterpricesDTO = new List<EnterprisesDTO>();
                    enterpricesDB.ForEach(enterprice => enterpricesDTO.Add(EnterprisesDTO.toEnterprisesDTO(
                        enterprice)));
                    return enterpricesDTO;
                }                
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<EnterprisesDTO>> UpdateEnterpriseAsync(Enterprises enterprise)
        {
            using (var context = new SICPAContext())
            {
                var entity = await context.Enterprises.FirstOrDefaultAsync(record => record.Id == enterprise.Id);
                if (entity == null)
                {
                    entity.ModifiedBy = enterprise.ModifiedBy;
                    entity.ModifiedDate = DateTime.Now;
                    entity.Status = enterprise.Status;
                    entity.Address = enterprise.Address;
                    entity.Name = enterprise.Name;
                    entity.Phone = enterprise.Phone;

                    context.Entry(entity).State = EntityState.Modified;
                    context.SaveChanges();
                }

            }
            return await ListEnterprisesAsync();
        }
    }
}
