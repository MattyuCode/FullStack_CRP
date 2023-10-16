using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using Api_Logistica.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IJwtService _service;
        public LoginController(IJwtService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("Jwt_Login")]
        public async Task<IActionResult> Jwt_Login(JwtModel userLogin)
        {
            var accessToken = await _service.GetAccessToken(userLogin);

            if (!string.IsNullOrEmpty(accessToken))
            {
                return Ok(accessToken);
            }

            return NotFound(new { msg = "USUARIO NO ENCONTRADO" });
        }
    }
}


/*
 
{
  "Username": "ADMINISTRADOR",
  "Password": "202CB962AC59075B964B07152D234B70",
  "NombreApp": "LOG"
}
 
 
 */