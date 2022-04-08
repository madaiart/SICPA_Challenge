using DAL.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DTO
{
    public class DepartmentsDTO
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public int IdEnterprises { get; set; }

        public static DepartmentsDTO toDepartmentsDTO(Departments departments)
        {
            return new DepartmentsDTO()
            {
                CreatedDate = departments.CreatedDate,
                ModifiedDate = departments.ModifiedDate,
                Status = departments.Status,
                Description = departments.Description,
                Name = departments.Name,
                Phone = departments.Phone,
                IdEnterprises = departments.IdEnterprises,

            };
        }
    }
    
}
