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
        public int? Age { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Surname { get; set; }

        public virtual ICollection<DepartmentsEmployees> DepartmentsEmployees { get; set; }
    }
}
