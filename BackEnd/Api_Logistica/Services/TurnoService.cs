using Api_Logistica.Data.Repositorios;
using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Interfaces;
using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Services
{
    public class TurnoService
    {
        #region

        private readonly ITurnoService _iTurno;


        public TurnoService(ITurnoService iTurno )
        {
            _iTurno = iTurno;
        }

        public async Task<IEnumerable<TurnoModel>> GetAllTurnos()

        {
            try
            {
                return await _iTurno.GetAllTurnos();
            }
            catch (Exception e)
            {

                throw new Exception("Error al obtener los datos", e);
            }

        }

        public async Task<IEnumerable<DetallesTurno>> GetTurnosById(string NO_CIA, string TURNO)
        {
            try
            {
                return await _iTurno.GetTurnosById(NO_CIA, TURNO);
            }
            catch (Exception e)
            {

                throw new Exception($"Error al obtener datos por el ID{NO_CIA} ", e);
            }
        }

        public async Task CreateEncabezadoTurno(CrearTurnoModel nuevoTurno)
        {
            try
            {
                await _iTurno.CreateEncabezadoTurno(nuevoTurno);
            }
            catch (Exception e)
            {

                throw new Exception("Error al agregar los tados", e);
            }
        }

        public async Task DeleteTurno(int id)
        {
            try
            {
                await _iTurno.DeleteTurno(id);
            }
            catch (Exception e)
            {

                throw new Exception($"Error al ELiminar el turno {id}", e);

            }
        }

        public async Task UpdateTurno(TurnoModel actualizar)
        {
            try
            {
                await _iTurno.UpdateTurno(actualizar);
            }
            catch (Exception e)
            {
                throw new Exception($"Error al actualizar los datos con ID {actualizar}.", e);
            }
        }


        public async Task<IEnumerable<CompaniaModel>> GetAllCompanias()
        {
            try
            {
                var res = await _iTurno.GetAllCompanias();
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<SedeModel>> GetAllSedes(string NO_CIA)
        {
            try
            {
                var res = await _iTurno.GetAllSedes(NO_CIA);
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<TIPOTURNOMODEL>> GetTIPO_TURNO()
        {
            try
            {
                var res = await _iTurno.GetTIPO_TURNO();
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<TransportistaModel>> GetAllTransportista(string NO_CIA)
        {
            try
            {
                var result = await _iTurno.GetAllTransportista(NO_CIA);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<VehiculoModel>> GetVehiculo(string NO_CIA, string TRANSPORTISTA)
        {
            try
            {
                var result = await _iTurno.GetVehiculo(NO_CIA, TRANSPORTISTA);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<pilotoModel>> GetPiloto(string NO_CIA, string TRANSPORTISTA)
        {
            try
            {
                var result = await _iTurno.GetPiloto(NO_CIA, TRANSPORTISTA);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<IEnumerable<tipoModel>> GetTipo(string NO_CIA)
        {
            try
            {
                var result = await _iTurno.GetTipo(NO_CIA);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<DETALLES_TURNO_MODEL>> GETDETAILSTURNO()
        {
            try
            {
                var result = await _iTurno.GETDETAILSTURNO();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }



        public async Task<IEnumerable<GRUPOSCLIENTE>> GetGruposCliente(string NO_CIA, string GRUPO)
        {
            try
            {
                var result = await _iTurno.GetGruposCliente(NO_CIA, GRUPO);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<IEnumerable<CLIETE>> GetCliente(string NO_CIA)
        {
            try
            {
                var result = await _iTurno.GetCliente(NO_CIA);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<int> TurnoExiste(string NO_CIA, string TURNO)
        {
            try
            {
                var result = await _iTurno.TurnoExiste(NO_CIA, TURNO);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion




    }
}
