using DAL.Models.Repositories;
using System;

namespace DAL.DTO
{
    public class EmployeesDTO
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public string Email { get; set; }
        public int? Age { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Surname { get; set; }

        public static EmployeesDTO toEmployeesDTO(Employees employees)
        {
            return new EmployeesDTO()
            {
                Id = employees.Id,  
                CreatedBy = employees.CreatedBy,
                CreatedDate = employees.CreatedDate,
                ModifiedBy = employees.ModifiedBy,
                ModifiedDate = employees.ModifiedDate,
                Status = employees.Status,
                Email = employees.Email,
                Age = employees.Age,
                Name = employees.Name,
                Position = employees.Position,
                Surname = employees.Surname,
            };
        }

    }
}
