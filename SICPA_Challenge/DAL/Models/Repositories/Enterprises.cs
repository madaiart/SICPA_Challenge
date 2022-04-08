using System;
using System.Collections.Generic;
using DAL.DTO;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Models.Repositories
{
    public partial class Enterprises
    {
        public Enterprises()
        {
            Departments = new HashSet<Departments>();
        }

        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Departments> Departments { get; set; }

        public static Enterprises toEnterprises(EnterprisesDTO enterprise)
        {
            return new Enterprises()
            {
                CreatedBy = enterprise.CreatedBy,
                CreatedDate = enterprise.CreatedDate,
                ModifiedBy = enterprise.ModifiedBy,
                ModifiedDate = enterprise.ModifiedDate,
                Status = enterprise.Status,
                Address = enterprise.Address,
                Name = enterprise.Name,
                Phone = enterprise.Phone,
            };
        }
    }
}
