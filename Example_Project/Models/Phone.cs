using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Example_Project.Models
{
    public class Phone
    {
        [Key]
        [JsonProperty("id")]
        public int Id { get; set; }

        [Required]
        [Phone]
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("contacts")]
        public List<Contact> Contacts { get; set; } = new List<Contact>();
    }
}
