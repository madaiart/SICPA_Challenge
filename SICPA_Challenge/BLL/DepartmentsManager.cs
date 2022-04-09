using BLL.Interfaces;
using DAL.DTO;
using DAL.Models.Contexts;
using DAL.Models.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class DepartmentsManager : IDepartmentsManager
    {
        public async Task<List<DepartmentsDTO>> CreateDepartmentsAsync(Departments department)
        {
            using (var context = new SICPAContext())
            {
                var newDepartment = new Departments()
                {
                    CreatedBy = department.CreatedBy,
                    CreatedDate = department.CreatedDate,
                    ModifiedBy = department.ModifiedBy,
                    ModifiedDate = department.ModifiedDate,
                    Status = department.Status,
                    Description = department.Description,
                    Name = department.Name,
                    Phone = department.Phone,
                    Id = department.Id,
                };
                context.Entry(newDepartment).State = EntityState.Added;
                context.SaveChanges();
            }
            return await ListDepartmentsAsync();
        }

        public async Task<List<DepartmentsDTO>> ListDepartmentsAsync()
        {
            try
            {
                using (var context = new SICPAContext())
                {
                    var departmentsDB = await context.Departments.ToListAsync();
                    var departmentsDTO = new List<DepartmentsDTO>();
                    departmentsDB.ForEach(department => departmentsDTO.Add(DepartmentsDTO.toDepartmentsDTO(
                        department)));
                    return departmentsDTO;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<DepartmentsDTO>> UpdateDepartmentsAsync(Departments department)
        {
            using (var context = new SICPAContext())
            {
                var entity = await context.Departments.FirstOrDefaultAsync(record => record.Id == department.Id);
                if (entity == null) return null;

                entity.ModifiedBy = department.ModifiedBy;
                entity.ModifiedDate = department.ModifiedDate;
                entity.Status = department.Status;
                entity.Description = department.Description;
                entity.Name = department.Name;
                entity.Phone = department.Phone;
                entity.IdEnterprises = department.IdEnterprises;


                context.Entry(entity).State = EntityState.Modified;
                context.SaveChanges();
            }
            return await ListDepartmentsAsync();
        }
    }
}
