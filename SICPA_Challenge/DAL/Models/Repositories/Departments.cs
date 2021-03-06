using DAL.DTO;
using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Models.Repositories
{
    public partial class Departments
    {
        public Departments()
        {
            DepartmentsEmployees = new HashSet<DepartmentsEmployees>();
        }

        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public int IdEnterprises { get; set; }

        public virtual Enterprises IdEnterprisesNavigation { get; set; }
        public virtual ICollection<DepartmentsEmployees> DepartmentsEmployees { get; set; }

        public static Departments toDepartments(DepartmentsDTO department)
        {
            return new Departments()
            {
                CreatedBy = department.CreatedBy,
                CreatedDate = department.CreatedDate,
                ModifiedBy = department.ModifiedBy,
                ModifiedDate = department.ModifiedDate,
                Status = department.Status,
                Description = department.Description,
                Name = department.Name,
                Phone = department.Phone,
                IdEnterprises = department.IdEnterprises,
            };
        }
    }
}
