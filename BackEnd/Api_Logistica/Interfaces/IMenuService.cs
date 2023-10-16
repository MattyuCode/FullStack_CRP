using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios.IRepositorios
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuModel>> GetMenu(string noCia, string userName, string nombreApp);
    }
}
