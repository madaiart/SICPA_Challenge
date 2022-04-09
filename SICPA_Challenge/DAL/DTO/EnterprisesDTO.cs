using DAL.Models.Repositories;
using System;

namespace DAL.DTO
{
    public class EnterprisesDTO
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public sbyte? Status { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

        public static EnterprisesDTO toEnterprisesDTO(Enterprises enterprises)
        {
            return new EnterprisesDTO()
            {
                Id = enterprises.Id,
                CreatedBy = enterprises.CreatedBy,
                CreatedDate = enterprises.CreatedDate,
                ModifiedBy = enterprises.ModifiedBy,
                ModifiedDate = enterprises.ModifiedDate,
                Status = enterprises.Status,
                Address = enterprises.Address,
                Name = enterprises.Name,
                Phone = enterprises.Phone,
            };
        }
    }
}
