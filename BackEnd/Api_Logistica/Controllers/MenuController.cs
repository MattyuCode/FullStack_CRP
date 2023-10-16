using Api_Logistica.Data.Repositorios.IRepositorios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class MenuController : ControllerBase
    {
        private readonly IMenuService _service;
        public MenuController(IMenuService service)
        {
            _service = service;
        }

        [Route("GetAllMenus/{NO_CIA}/{USERNAME}/{NOMBRE_APP}")]
        [HttpGet]
        public async Task<IActionResult> GetAllMenus(string NO_CIA, string USERNAME, string NOMBRE_APP)
        {
            try
            {
                var data = await _service.GetMenu(NO_CIA, USERNAME, NOMBRE_APP);

                if (data == null || !data.Any())

                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }

                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {e.Message}");
            }

        }


    }
}
