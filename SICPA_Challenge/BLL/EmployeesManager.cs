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
    public class EmployeesManager : IEmployeesManager
    {
        public async Task<List<EmployeesDTO>> CreateEmployeeAsync(Employees employee)
        {
            using (var context = new SICPAContext())
            {
                var newEmployee = new Employees()
                {
                    CreatedBy = employee.CreatedBy,
                    CreatedDate = employee.CreatedDate,
                    ModifiedBy = employee.ModifiedBy,
                    ModifiedDate = employee.ModifiedDate,
                    Status = employee.Status,
                    Age = employee.Age,
                    Name = employee.Name,

                };
                context.Entry(newEmployee).State = EntityState.Added;
                context.SaveChanges();
            }
            return await ListEmployeesAsync();
        }

        public async Task<List<EmployeesDTO>> ListEmployeesAsync()
        {
            try
            {
                using (var context = new SICPAContext())
                {
                    var employeesDB = await context.Employees.ToListAsync();
                    var employeesDTO = new List<EmployeesDTO>();
                    employeesDB.ForEach(employee => employeesDTO.Add(EmployeesDTO.toEmployeesDTO(
                        employee)));
                    return employeesDTO;
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<EmployeesDTO>> UpdateEmployeesAsync(Employees employee)
        {
            using (var context = new SICPAContext())
            {
                var entity = await context.Employees.FirstOrDefaultAsync(record => record.Id == employee.Id);
                if (entity == null)
                    return null;
                
                    entity.ModifiedBy = employee.ModifiedBy;
                    entity.ModifiedDate = employee.ModifiedDate;
                    entity.Status = employee.Status;
                    entity.Age = employee.Age;
                    entity.Email = employee.Email;
                    entity.Name = employee.Name;
                    entity.Position = employee.Position;
                    entity.Surname = employee.Surname;

                    context.Entry(entity).State = EntityState.Modified;
                    context.SaveChanges();

                
            }
            return await ListEmployeesAsync();
        }
    }
}
