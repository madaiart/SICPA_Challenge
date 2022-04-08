using DAL.DTO;
using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Models.Repositories
{
    public partial class Employees
    {
        public Employees()
        {
            DepartmentsEmployees = new HashSet<DepartmentsEmployees>();
        }

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

        public virtual ICollection<DepartmentsEmployees> DepartmentsEmployees { get; set; }

        public static Employees toEmployees(EmployeesDTO employee)
        {
            return new Employees()
            {
                CreatedBy = employee.CreatedBy,
                CreatedDate = employee.CreatedDate,
                ModifiedBy = employee.ModifiedBy,
                ModifiedDate = employee.ModifiedDate,
                Status = employee.Status,
                Email = employee.Email,
                Age = employee.Age,
                Position= employee.Position,
                Surname= employee.Surname,
            };
        }
    }
}
