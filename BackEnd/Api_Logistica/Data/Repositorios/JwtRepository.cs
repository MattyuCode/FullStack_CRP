using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios
{
    public class JwtRepository : IJwtService
    {

        private readonly IConfiguration _config;

        public JwtRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> GetAccessToken(JwtModel userLogin)
        {
            var client = new RestClient("https://apiauthdesarrollo.corpacam.com.gt/");
            var request = new RestRequest("Api/GetToken", Method.Post);
            request.RequestFormat = DataFormat.Json;
            request.AddBody(new JwtModel
            {
                Username = userLogin.Username.ToUpper(),
                Password = userLogin.Password,
                NombreApp = userLogin.NombreApp
            });
            RestResponse response = (RestResponse)await client.ExecuteAsync(request);
            if (!string.IsNullOrEmpty(response.Content))
            {
                var credenciales = JsonConvert.DeserializeObject<AuthModel>(response.Content);

                if (!string.IsNullOrEmpty(credenciales.access_token))
                {
                    var token_generado = GenerateToken(userLogin);
                    credenciales.access_token = token_generado;
                    credenciales.cod_vend = credenciales.cod_vend;
                    credenciales.nombreUser = credenciales.nombreUser;
                    credenciales.usuario = credenciales.usuario;
                    credenciales.gerencia_ventas = credenciales.gerencia_ventas;
                    credenciales.idRol = credenciales.idRol;
                    credenciales.rol = credenciales.rol;
                    credenciales.nombreApp = credenciales.nombreApp;
                    credenciales.no_cia = "10";
                    return JsonConvert.SerializeObject(credenciales);
                }
            }

            return JsonConvert.SerializeObject(new { msg = "USUARIO NO ENCONTRADO" });
        }

        private string GenerateToken(JwtModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Username),
            new Claim(ClaimTypes.GivenName, "ADMINISTRADOR"),
            new Claim(ClaimTypes.PostalCode, "00"),
        };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(4),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
