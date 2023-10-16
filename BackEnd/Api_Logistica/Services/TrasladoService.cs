using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Models;
using Api_Logistica.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Services
{
    public class TrasladoService
    {
        private readonly ITrasladoService _trasladoRepository;

        public TrasladoService(ITrasladoService traslado)
        {
            _trasladoRepository = traslado;
        }

        public async Task<IEnumerable<TrasladoModel>> GetAllTraslado(string ESTADO)
        {
            try
            {
                return await _trasladoRepository.GetAllTraslado(ESTADO);
            }
            catch (Exception e)
            {

                throw new Exception("Error al cargar en el servicio ", e);
            }
        }

        public async Task<IEnumerable<TrasladoDetalles>> GetDetailsTraslado(string NO_CIA, string NO_DOCU)
        {
            try
            {
                return await _trasladoRepository.GetDetailsTraslado(NO_CIA, NO_DOCU);
            }
            catch (Exception e)
            {

                throw new Exception("Error al cargar en el servicio ", e);
            }
        }

        public async Task<byte[]> GetImages(string NO_CIA, string TICKET, string SERIE, string PARAMETRO)
        {
            try
            {
                return await _trasladoRepository.GetImages(NO_CIA, TICKET, SERIE, PARAMETRO);
            }
            catch (Exception e)
            {

                throw new Exception("Error al cargar en el servicio ", e);
            }
        }

        public async Task<IEnumerable<TrasladoModel>> GetTrasladoEntregadosDias(string ESTADO)
        {
            try
            {
                return await _trasladoRepository.GetTrasladoEntregadosDias(ESTADO);
            }
            catch (Exception e)
            {

                throw new Exception("Error al cargar en el servicio ", e);
            }
        }
    }
}
