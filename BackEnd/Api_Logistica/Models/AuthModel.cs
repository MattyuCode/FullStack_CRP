using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Models
{
    public class AuthModel
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string cod_vend { get; set; }
        public string nombreUser { get; set; }
        public string usuario { get; set; }

        public string gerencia_ventas { get; set; }

        public string idRol { get; set; }

        public string rol { get; set; }

        public string nombreApp { get; set; }

        public string no_cia { get; set; }
    }
}
