using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Interfaces
{
   public interface IOracleDBConnection
    {
        IDbConnection GetOpenConnection();
    }
}
