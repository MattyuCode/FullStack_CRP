using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios.IRepositorios
{
    public interface IJwtService
    {
        Task<string> GetAccessToken(JwtModel userLogin);
    }
}
 