using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Services
{
    public class MenuService
    {
        private readonly IMenuService _menuService;
        public MenuService(IMenuService menuService)
        {
            _menuService = menuService;
        }


        public async Task<IEnumerable<MenuModel>> GetMenu(string noCia, string userName, string nombreApp)
        {
            try
            {
                return await _menuService.GetMenu(noCia, userName, nombreApp);
            }
            catch (Exception e)
            {

                throw new Exception("Error al cargar en el servicio ", e);
            }
        }
    }
}
