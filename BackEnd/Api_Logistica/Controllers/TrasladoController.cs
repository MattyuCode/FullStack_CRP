using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Services.Interface;
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

    public class TrasladoController : ControllerBase
    {

        //// private readonly ITrasladoRepository _trasladoRepository;

        // public TrasladoController(ITrasladoRepository traslado)
        // {
        //     _trasladoRepository = traslado;
        // }

        private readonly ITrasladoService _trasladoService;

        public TrasladoController(ITrasladoService trasladoService)
        {
            _trasladoService = trasladoService;
        }


        [Route("GetAllTraslado/{ESTADO}")]
        [HttpGet]
        public async Task<IActionResult> GetAllTraslado(string ESTADO)
        {
            try
            {
                var data = await _trasladoService.GetAllTraslado(ESTADO);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error al obtener. Todos los datos {e.Message}");
            }
        }


        [Route("GetTrasladoEntregadosDias/{ESTADO}")]
        [HttpGet]
        public async Task<IActionResult> GetTrasladoEntregadosDias(string ESTADO)
        {
            try
            {
                var data = await _trasladoService.GetTrasladoEntregadosDias(ESTADO);
                    return Ok(data);
                //if (data != null && data.Any())
                //{
                //}

                //var message = "No se encontraron datos en la base de datos";
                //return NotFound(new { message });
                //return Ok(0);

            }
            catch (Exception e)
            {
                return BadRequest($"Error al obtener. Todos los datos {e.Message}");
            }
        }


        [Route("GetDetailsTraslado/{NO_CIA}/{NO_DOCU}")]
        [HttpGet]
        public async Task<IActionResult> GetDetailsTraslado(string NO_CIA, string NO_DOCU)
        {
            try
            {
                var data = await _trasladoService.GetDetailsTraslado(NO_CIA, NO_DOCU);
                return Ok( data );
            }
            catch (Exception e)
            {
                var errorMessage = $"Error al obtener. Todos los datos {e.Message}";
                var errorResponse = new { message = errorMessage };
                return BadRequest(errorResponse);
            }
        }

        [Route("ObtenerImagen/{NO_CIA}/{TICKET}/{SERIE}/{PARAMETRO}")]
        [HttpGet]

        public async Task<IActionResult> ObtenerImagen(string NO_CIA, string TICKET, string SERIE, string PARAMETRO)
        {
            try
            {
                byte[] imageBytes = await _trasladoService.GetImages(NO_CIA, TICKET, SERIE, PARAMETRO);

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    return File(imageBytes, "image/jpeg");
                }
                else
                {
                    return NotFound(new { error = "Image not found" });
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
