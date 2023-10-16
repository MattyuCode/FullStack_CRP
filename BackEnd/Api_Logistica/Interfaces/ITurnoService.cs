using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios.IRepositorios
{
    public interface ITurnoService
    {
        Task<IEnumerable<TurnoModel>> GetAllTurnos();


        //Task<TurnoModel> GetTurnosById(string NO_CIA, string TURNO);
        Task<IEnumerable<DetallesTurno>> GetTurnosById(string NO_CIA, string TURNO);

        Task CreateEncabezadoTurno(CrearTurnoModel addTurno);
        Task CreateDetalleTurno(crearDtallesTurno newTurno);
        Task DeleteTurno(int idTurnos);
        Task UpdateTurno(TurnoModel updateTurno);

        //OTRAS INTERFACES
        Task<IEnumerable<CompaniaModel>> GetAllCompanias();
        Task<IEnumerable<SedeModel>> GetAllSedes(string NO_CIA);
        Task<IEnumerable<TransportistaModel>> GetAllTransportista(string NO_CIA);
        Task<IEnumerable<TIPOTURNOMODEL>> GetTIPO_TURNO();
        Task<IEnumerable<VehiculoModel>> GetVehiculo(string NO_CIA, string TRANSPORTISTA);
        Task<IEnumerable<pilotoModel>> GetPiloto(string NO_CIA, string TRANSPORTISTA);
        Task<IEnumerable<tipoModel>> GetTipo(string NO_CIA);
        Task<IEnumerable<DETALLES_TURNO_MODEL>> GETDETAILSTURNO(string TURNO_GENERADO);
        Task<string> GetNumTurno(string NO_CIA);


        //------------------------------OTROS DE PARTE DE DETALLES--------------------------------

        Task<IEnumerable<CLIETE>> GetCliente(string NO_CIA);
        Task<IEnumerable<GRUPOSCLIENTE>> GetGruposCliente(string NO_CIA, string GRUPO);


        //===========================================================================================

        Task<int> ValidarTurnoUsado(string NO_CIA, string TURNO);
        Task<int> TurnoExiste(string NO_CIA, string TURNO);
    }
}
