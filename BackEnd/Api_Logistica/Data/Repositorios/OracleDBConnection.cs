using Api_Logistica.Interfaces;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data
{
    public class OracleDBConnection : IOracleDBConnection
    {
        private readonly IConfiguration _configuration;
        public OracleDBConnection(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection GetOpenConnection()
        {
            var connectionString = _configuration.GetConnectionString("OracleConnection");
            var cnn = new OracleConnection(connectionString);

            try
            {
                cnn.Open();
                return cnn;
            }
            catch (Exception e)
            {
                cnn.Dispose();
                throw new Exception("Error al abrir la conexion en la base de datos", e);
            }
        }
    }
}
