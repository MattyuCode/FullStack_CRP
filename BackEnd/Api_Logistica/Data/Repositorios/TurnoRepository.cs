using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Interfaces;
using Api_Logistica.Models;
using Dapper;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Data.Repositorios
{

    public class TurnoRepository : ITurnoService
    {
        private readonly IOracleDBConnection _oracleDBConnection;
        public TurnoRepository(IOracleDBConnection oracleDBConnection)
        {
            _oracleDBConnection = oracleDBConnection;
        }

        #region Primer codigo con ITurno
        public async Task<IEnumerable<TurnoModel>> GetAllTurnos()
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = @$"SELECT * FROM vw_log_turnos ORDER BY turno DESC";

                var result = await cnn.QueryAsync<TurnoModel>(query);
                return result;
            }
        }

        public async Task<IEnumerable<DetallesTurno>> GetTurnosById(string NO_CIA, string TURNO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = @$"select no_cia, turno, grupo, no_cliente, cliente, estado  from vw_log_detalleturno where no_cia = '{NO_CIA}' and turno = '{TURNO}'";
                var results = await cnn.QueryAsync<DetallesTurno>(query);

                if (results.Any())
                {
                    return results;
                }
                else
                {
                    return null;
                }
            }
        }
        string numeroDeTurno = "";

        //METODO PARA OBTENER EL NÚMERO DE TURNO--- Agregado recientemente en la interface
        public async Task<string> GetNumTurno(string NO_CIA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"SELECT Nvl( MAX(turno) , 0 ) + 1	
		                            FROM arin_turnos
	                             WHERE no_cia = '{NO_CIA}'";
                string result = await cnn.QueryFirstOrDefaultAsync<string>(query);
                return result ?? string.Empty;
            }
        }

        public async Task<string> CreateEncabezadoTurno(CrearTurnoModel addTurno)
        {

            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                try
                {
                      numeroDeTurno = await GetNumTurno(addTurno.NO_CIA);

                    var obj = new
                    {
                        pNO_CIA = addTurno.NO_CIA,
                        pNO_SEDE = addTurno.NO_SEDE,
                        pTURNO = numeroDeTurno,
                        pNUM_PLACA = addTurno.NUM_PLACA,
                        pPILOTO = addTurno.PILOTO,
                        pNOMBRE_PILOTO = addTurno.NOMBRE_PILOTO,
                        pTIPO_TURNO = addTurno.TIPO_TURNO,
                        pTURNO_ORIGEN = addTurno.TURNO_ORIGEN,
                        pINTERNO = addTurno.INTERNO,
                        pTRANSPORTISTA = addTurno.TRANSPORTISTA,
                        pVEHICULO = addTurno.VEHICULO,
                        pTIPO_VEHICULO = addTurno.TIPO_VEHICULO,
                        pMARCA_VEHICULO = addTurno.MARCA_VEHICULO,
                        pLICENCIA = addTurno.LICENCIA,
                        pUSUARIO_CREA = addTurno.USUARIO_CREA
                    };
                    await cnn.ExecuteAsync("SP_InsertarTurno", obj, commandType: CommandType.StoredProcedure);

                    return numeroDeTurno;
                }
                catch (Exception e)
                {
                    throw new Exception("Error al cargar en el servicio ", e);
                }
            }
        }

        public async Task CreateDetalleTurno(crearDtallesTurno newTurno)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                try
                {
                    var obj = new
                    {
                        pNO_CIA = newTurno.NO_CIA,
                        pTURNO = newTurno.TURNO,
                        pGRUPO = newTurno.GRUPO,
                        pNO_CLIENTE = newTurno.NO_CLIENTE,
                        pESTADO = newTurno.ESTADO
                    };

                    await cnn.ExecuteAsync("SP_InsertarDetalleTurno", obj, commandType: CommandType.StoredProcedure);

                }
                catch (Exception e)
                {
                    throw new Exception("Error al cargar en el servicio ", e);
                }
            }
        }


        public Task UpdateTurno(TurnoModel updateTurno)
        {
            throw new NotImplementedException();
        }

        public Task DeleteTurno(int idTurnos)
        {
            throw new NotImplementedException();
        }

        #endregion


        #region METODOS PARA OBTENER

        public async Task<IEnumerable<CompaniaModel>> GetAllCompanias()
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"SELECT NO_CIA, NOMBRE, ORDEN FROM VW_LOGISTICA_COMPANIAS";
                var companias = await cnn.QueryAsync<CompaniaModel>(query);

                return companias;

            }
        }

        public async Task<IEnumerable<SedeModel>> GetAllSedes(string NO_CIA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"Select no_cia, no_sede, planta from VW_APP_SEDES where no_cia ='{NO_CIA}'";
                var sedes = await cnn.QueryAsync<SedeModel>(query);

                if (sedes.Any())
                {
                    return sedes;
                }
                else
                {
                    var res = Enumerable.Empty<SedeModel>();
                    return res;
                }

            }
        }

        public async Task<IEnumerable<TransportistaModel>> GetAllTransportista(string NO_CIA)
        {

            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"select * from VW_LOGISTICA_TRANSPORTISTA where no_cia = '{NO_CIA}'";
                var results = await cnn.QueryAsync<TransportistaModel>(query);

                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<TransportistaModel>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<TIPOTURNOMODEL>> GetTIPO_TURNO()
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"select * from vw_PLOG_TIPOTURNO";
                var results = await cnn.QueryAsync<TIPOTURNOMODEL>(query);

                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<TIPOTURNOMODEL>();
                    return res;
                }

            }
        }

        public async Task<IEnumerable<VehiculoModel>> GetVehiculo(string NO_CIA, string TRANSPORTISTA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"
                                Select * from vw_PLOGIS_Vehiculos
                                where no_cia ='{NO_CIA}'
                                and transportista ='{TRANSPORTISTA}'";
                var results = await cnn.QueryAsync<VehiculoModel>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<VehiculoModel>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<pilotoModel>> GetPiloto(string NO_CIA, string TRANSPORTISTA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"
                                Select * from vw_PLOGIS_Pilotos
                                where no_cia ='{NO_CIA}'
                                and transportista ='{TRANSPORTISTA}'";
                var results = await cnn.QueryAsync<pilotoModel>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<pilotoModel>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<tipoModel>> GetTipo(string NO_CIA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"
                                Select * from vw_plogis_tipovehiculo
                                where no_cia ='{NO_CIA}'";
                var results = await cnn.QueryAsync<tipoModel>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<tipoModel>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<DETALLES_TURNO_MODEL>> GETDETAILSTURNO(string TURNO_GENERADO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"SELECT a.no_cia,
                                        a.turno,
                                        a.grupo,
                                        a.no_cliente,
                                        b.nombre,
                                        a.estado
                                    FROM arin_detalleturnos a, arccmc b
                                    WHERE     a.no_cia = b.no_cia
                                        AND a.grupo = b.GRUPO
                                        AND a.no_cliente = b.no_cliente
                                        AND a.turno = '{TURNO_GENERADO}'";

                //CREAR UNA VISTA TOMAR EL PARATMETO EL TURNO CREADO DE ENCABEZADO

                var results = await cnn.QueryAsync<DETALLES_TURNO_MODEL>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<DETALLES_TURNO_MODEL>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<CLIETE>> GetCliente(string NO_CIA)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"SELECT *
                                FROM VW_PLOGIS_GRUPOSCLIENTE
                                where no_cia ='{NO_CIA}'";
                var results = await cnn.QueryAsync<CLIETE>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<CLIETE>();
                    return res;
                }
            }
        }

        public async Task<IEnumerable<GRUPOSCLIENTE>> GetGruposCliente(string NO_CIA, string GRUPO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string query = $@"SELECT *
                                FROM VW_PLOGIS_CLIENTE
                                WHERE no_cia = '{NO_CIA}' AND grupo = '{GRUPO}'";
                var results = await cnn.QueryAsync<GRUPOSCLIENTE>(query);
                if (results.Any())
                {
                    return results;
                }
                else
                {
                    var res = Enumerable.Empty<GRUPOSCLIENTE>();
                    return res;
                }
            }
        }

        #endregion



        #region CON LOS METODO PARA VALIDAR TURNOS
        public async Task<int> ValidarTurnoUsado(string NO_CIA, string TURNO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                try
                {
                    string query = $@"
                                    SELECT DISTINCT (a.turno)     turno
                                      FROM arin_turnos a, arin_detalleturnos b
                                     WHERE     a.no_cia = '{NO_CIA}'
                                           AND a.turno_origen = '{TURNO}'
                                           AND a.no_cia = b.no_cia
                                           AND a.turno = b.turno
                                           AND b.estado != 'N'";
                    var result = await cnn.QueryFirstOrDefaultAsync<int>(query);

                    if (result  <= 0)
                    {
                        return 0;
                    }
                    else
                    {
                        return 1;
                    }

                }
                catch (Exception e)
                {
                    throw new NotImplementedException("Ocurio un error al obtener datos" + e);
                }
            }
        }

        public async Task<int> TurnoExiste(string NO_CIA, string TURNO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                try
                {
                    string query = $@"
                                    SELECT a.transportista,
                                           a.vehiculo,
                                           a.num_placa,
                                           a.licencia,
                                           a.piloto,
                                           a.nombre_piloto,
                                           a.interno,
                                           a.peso_sistema
                                      FROM arin_turnos a, arin_detalleturnos b
                                     WHERE     a.no_cia = '{NO_CIA}'
                                           AND a.turno = '{TURNO}'
                                           AND a.no_cia = b.no_cia
                                           AND a.turno = b.turno";
                    var result = await cnn.QueryFirstOrDefaultAsync<int>(query);
                    
                    if (result <= 0)
                    {
                        return 0;
                    }
                    else
                    {
                        return 1;
                    }

                }
                catch (Exception e)
                {
                    throw new NotImplementedException("Ocurio un error al obtener datos" + e);
                }
            }
        }

        #endregion



    }

}
