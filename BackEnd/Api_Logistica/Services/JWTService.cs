using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Services
{
    public class JWTService  

    {
        private readonly IJwtService _IJwt;
        public JWTService(IJwtService jwt)
        {
            _IJwt  = jwt;
        }

        public async Task<string> GetAccessToken(JwtModel jwtModel )
        {
            try
            {
                return await _IJwt.GetAccessToken(jwtModel);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los datos.", ex);
            }
        }
    }
}
