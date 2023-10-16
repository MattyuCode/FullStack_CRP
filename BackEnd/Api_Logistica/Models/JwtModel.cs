using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Models
{
    public class JwtModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NombreApp { get; set; }
    }
}
