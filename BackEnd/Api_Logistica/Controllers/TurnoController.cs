using Api_Logistica.Data.Repositorios;
using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using Api_Logistica.Services;
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
    //[Authorize]
    public class TurnoController : ControllerBase
    {

        private readonly ITurnoService _service;

        public TurnoController(TurnoRepository service)
        {
            _service = service;
        }

        #region ====
        [Route("GetAllTurnos")]
        [HttpGet]
        public async Task<IActionResult> GetAllTurnos()
        {
            try
            {
                var data = await _service.GetAllTurnos();
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error al obtener. Todos los datos {e.Message}");
            }
        }

        [Route("GetDetailsTurno/{NO_CIA}/{TURNO}")]
        [HttpGet]
        public async Task<IActionResult> GetDetailsTurno(string NO_CIA, string TURNO)
        {
            try
            {
                var data = await _service.GetTurnosById(NO_CIA, TURNO);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }



        //METODO PARA INSERTAR TURNOS
        [HttpPost("crearTurno")]
        public async Task<IActionResult> CrearTurno([FromBody] CrearTurnoModel newTurno)
        {
            try
            {
                await _service.CreateEncabezadoTurno(newTurno);

                //return Ok(new { Message = "Inserción exitosa", newTurno });
                return Ok(newTurno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error interno del servidor", ex });
            }
        }



        [HttpGet("GetAllCompanias")]
        public async Task<IActionResult> GetAllCompanias()
        {
            try
            {
                var data = await _service.GetAllCompanias();

                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }

                return Ok(data);
            }
            catch (Exception e)
            {

                return BadRequest($"Error: {e.Message}");

            }
        }


        [Route("GetAllSedes/{NO_CIA}")]
        [HttpGet]
        public async Task<IActionResult> GetAllSedes(string NO_CIA)
        {
            try
            {
                var data = await _service.GetAllSedes(NO_CIA);

                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }

                return Ok(data);
            }
            catch (Exception e)
            {

                return BadRequest($"Error: {e.Message}");

            }
        }

        [HttpGet("GetTIPO_TURNO")]
        public async Task<IActionResult> GetTIPO_TURNO()
        {
            try
            {
                var data = await _service.GetTIPO_TURNO();
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);

            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }



        [Route("GetAllTransportista/{NO_CIA}")]
        [HttpGet]
        public async Task<IActionResult> GetAllTransportista(string NO_CIA)
        {
            try
            {
                var data = await _service.GetAllTransportista(NO_CIA);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }


        [Route("GetVehiculo/{NO_CIA}/{TRANSPORTISTA}")]
        [HttpGet]
        public async Task<IActionResult> GetVehiculo(string NO_CIA, string TRANSPORTISTA)
        {
            try
            {
                var data = await _service.GetVehiculo(NO_CIA, TRANSPORTISTA);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }

        [Route("GetPiloto/{NO_CIA}/{TRANSPORTISTA}")]
        [HttpGet]
        public async Task<IActionResult> GetPiloto(string NO_CIA, string TRANSPORTISTA)
        {
            try
            {
                var data = await _service.GetPiloto(NO_CIA, TRANSPORTISTA);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }


        [Route("GetTipo/{NO_CIA}")]
        [HttpGet]
        public async Task<IActionResult> GetTipo(string NO_CIA)
        {
            try
            {
                var data = await _service.GetTipo(NO_CIA);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }


        [Route("GETDETAILSTURNO")]
        [HttpGet]
        public async Task<IActionResult> GETDETAILSTURNO()
        {
            try
            {
                var data = await _service.GETDETAILSTURNO();
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }




        [Route("GetCliente/{NO_CIA}")]
        [HttpGet]
        public async Task<IActionResult> GetCliente(string NO_CIA)
        {
            try
            {
                var data = await _service.GetCliente(NO_CIA);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }


        [Route("GetGruposCliente/{NO_CIA}/{GRUPO}")]
        [HttpGet]
        public async Task<IActionResult> GetGruposCliente(string NO_CIA, string GRUPO)
        {
            try
            {
                var data = await _service.GetGruposCliente(NO_CIA, GRUPO);
                if (data == null)
                {
                    return NotFound(new { msg = "Datos incorrectos o no esta registrado en la base de datos" });
                }
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }

        }

        [HttpPost("CreateDetalleTurno")]
        public async Task<IActionResult> CreateDetalleTurno([FromBody] crearDtallesTurno newTurno)
        {
            try
            {
                await _service.CreateDetalleTurno(newTurno);

                //return Ok(new { Message = "Inserción exitosa", newTurno });
                return Ok(newTurno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error interno del servidor", ex });
            }
        }

        [Route("GetNumTurno/{NO_CIA}")]
        [HttpGet]
        public async Task<string> GetNumTurno(string NO_CIA)
        {
            try
            {
                var data = await _service.GetNumTurno(NO_CIA);
                if (data == null)
                {
                    return "No se encontraron datos para NO_CIA: " + NO_CIA;
                }
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el número de turno.", ex);
            }
        }
        #endregion

        [Route("ValidarTurnoUsado/{NO_CIA}/{TURNO}")]
        [HttpGet]
        public async Task<Boolean> ValidarTurnoUsado(string NO_CIA, string TURNO)
        {
            try
            {
                var data = await _service.ValidarTurnoUsado(NO_CIA, TURNO);
                /* if (data == 0)
                 {
                     return "Ok";
                 }
                 return data.ToString();*/

                return data == 1;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el número de turno.", ex);
            }
        }

        [Route("TurnoExiste/{NO_CIA}/{TURNO}")]
        [HttpGet]
        public async Task<IActionResult> TurnoExiste(string NO_CIA, string TURNO)
        {
            try
            {
                var data = await _service.TurnoExiste(NO_CIA, TURNO);

                if (data == 0)
                {
                  
                    var errorResponse = new { message = "Turno origen de traslado no existe" };
                    return BadRequest(errorResponse);
                }

                return Ok(true); 
            }
            catch (Exception ex)
            {
               
                var errorResponse = new { message = "Error al obtener el número de turno.", error = ex.Message };
                return StatusCode(500, errorResponse);
            }
        }







    }
}
