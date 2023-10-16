using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Interfaces;
using Api_Logistica.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios
{
    public class MenuRepository : IMenuService
    {
        private readonly IOracleDBConnection _oracleDBConnection;

        public MenuRepository(IOracleDBConnection oracleDBConnection)
        {
            _oracleDBConnection = oracleDBConnection;
        }


        public async Task<IEnumerable<MenuModel>> GetMenu(string noCia, string userName, string nombreApp)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $"Select descrip_menu, nombre_menu, descrip_submenu, nombre_submenu FROM VW_USUARIOS_ROL WHERE NO_CIA = '{noCia}' AND idusuario = '{userName}' AND nombre_app = '{nombreApp}' order by orden asc";

                return await cnn.QueryAsync<MenuModel>(query);
            }
        }
    }
}
