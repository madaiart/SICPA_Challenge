using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Models.Repositories
{
    public partial class DepartmentsEmployees
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public int IdDepartments { get; set; }
        public int IdEmployees { get; set; }

        public virtual Departments IdDepartmentsNavigation { get; set; }
        public virtual Employees IdEmployeesNavigation { get; set; }
    }
}
