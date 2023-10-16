using Api_Logistica.Data.Repositorios.IRepositorios;
using Api_Logistica.Interfaces;
using Api_Logistica.Models;
using Dapper;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Api_Logistica.Services.Interface;

namespace Api_Logistica.Data.Repositorios
{
    public class TrasladoRepository : ITrasladoService
    {
        private readonly IOracleDBConnection _oracleDBConnection;

        public TrasladoRepository(IOracleDBConnection oracleDBConnection)
        {
            _oracleDBConnection = oracleDBConnection;
        }

        public async Task<IEnumerable<TrasladoModel>> GetAllTraslado(string ESTADO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                var query = "";
                string estado = ESTADO.ToUpper();

                if (ESTADO == "a")
                {
                    query = @$"
                    select * from naf47.vw_log_traslados
                    where estado = '{estado}' order by turno desc";
                }
                else if (ESTADO == "r")
                {
                    query = @$"
                    select* from naf47.vw_log_traslados
                    where estado = '{estado}' order by hora_salida desc, turno desc";
                }

                var results = await cnn.QueryAsync<TrasladoModel>(query);

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

        public async Task<IEnumerable<TrasladoDetalles>> GetDetailsTraslado(string NO_CIA, string NO_DOCU)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                var query = $@"
                select * from naf47.vw_log_traslado_detalle where no_cia = '{NO_CIA}' and no_docu = '{NO_DOCU}'";

                var results = await cnn.QueryAsync<TrasladoDetalles>(query);

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

        public async Task<byte[]> GetImages(string NO_CIA, string TICKET, string SERIE, string PARAMETRO)
        {

            Byte[] imageBytes = null;
            string imgPath = "";
            string query = "";
            string tipo = await GetTipoTicket(NO_CIA, TICKET, SERIE);

            GetImg path = new GetImg();

            if (SERIE == "A")
            {
                if (tipo == "PT")
                {
                    query = @"
                SELECT a.no_cia, a.ticket, a.serie,
                '\\192.161.6.12\fotos\Fotos\IPCam02\' || c.ubicacionfoto_ent entrada,
                '\\192.168.10.7\DataFotosBascula\Fotos\Fotos\' || NVL(a.ubicafoto_salidareal, a.ubicacionfoto_sale) salida,
                a.turno turno_origen, b.turno turno_destino, c.ticket, c.serie
                FROM arbppesos a, arin_turnos b, arbppesos c
                WHERE a.no_cia = :no_cia
                AND a.serie = :serie
                AND a.ticket = :ticket
                AND a.no_cia = b.no_cia(+)
                AND a.turno = b.turno_origen(+)
                AND b.no_cia = c.no_cia(+)
                AND b.turno = c.turno(+)
                AND a.proceso IN (12)
                AND a.ind_anulado != 'S'
                AND c.proceso(+) = '13'
                AND c.ind_anulado(+) != 'S'
                ORDER BY 2 DESC";
                }
                else if (tipo == "MP")
                {
                    query = @"
                SELECT a.no_cia, a.ticket, a.serie,
                '\\192.161.6.12\fotos\Fotos\IPCam02\' || c.ubicacionfoto_ent entrada,
                '\\192.168.10.7\DataFotosBascula\Fotos\Fotos\' || NVL(a.ubicafoto_salidareal, a.ubicacionfoto_sale) salida,
                a.turno turno_origen, b.turno turno_destino, c.ticket, c.serie
                FROM arbppesos a, arin_turnos_mp b, arbppesos c
                WHERE a.no_cia = :no_cia
                AND a.serie = :serie
                AND a.ticket = :ticket
                AND a.no_cia = b.no_cia(+)
                AND a.turno = b.turno_origen(+)
                AND b.no_cia = c.no_cia(+)
                AND b.turno = c.turno(+)
                AND a.proceso IN (14)
                AND a.ind_anulado != 'S'
                AND c.proceso(+) = '15'
                AND c.ind_anulado(+) != 'S'
                ORDER BY 2 DESC";
                }
            }
            else if (SERIE == "B")
            {
                if (tipo == "PT")
                {
                    query = @"
                SELECT a.no_cia, a.ticket, a.serie,
                '\\192.168.10.7\DataFotosBascula\Fotos\Fotos\' || c.ubicacionfoto_ent entrada,
                '\\192.161.6.12\fotos\Fotos\IPCam02\' || NVL(a.ubicafoto_salidareal, a.ubicacionfoto_sale) salida,
                a.turno turno_origen, b.turno turno_destino, c.ticket, c.serie
                FROM arbppesos a, arin_turnos b, arbppesos c
                WHERE a.no_cia = :no_cia
                AND a.serie = :serie
                AND a.ticket = :ticket
                AND a.no_cia = b.no_cia(+)
                AND a.turno = b.turno_origen(+)
                AND b.no_cia = c.no_cia(+)
                AND b.turno = c.turno(+)
                AND a.proceso IN (12)
                AND a.ind_anulado != 'S'
                AND c.proceso(+) = '13'
                AND c.ind_anulado(+) != 'S'
                ORDER BY 2 DESC";
                }
                else if (tipo == "MP")
                {
                    query = @"
                SELECT a.no_cia, a.ticket, a.serie,
                '\\192.168.10.7\DataFotosBascula\Fotos\Fotos\' || c.ubicacionfoto_ent entrada,
                '\\192.161.6.12\fotos\Fotos\IPCam02\' || NVL(a.ubicafoto_salidareal, a.ubicacionfoto_sale) salida,
                a.turno turno_origen, b.turno turno_destino, c.ticket, c.serie
                FROM arbppesos a, arin_turnos_mp b, arbppesos c
                WHERE a.no_cia = :no_cia
                AND a.serie = :serie
                AND a.ticket = :ticket
                AND a.no_cia = b.no_cia(+)
                AND a.turno = b.turno_origen(+)
                AND b.no_cia = c.no_cia(+)
                AND b.turno = c.turno(+)
                AND a.proceso IN (14)
                AND a.ind_anulado != 'S'
                AND c.proceso(+) = '15'
                AND c.ind_anulado(+) != 'S'
                ORDER BY 2 DESC";
                }
            }

            try
            {
                using (var cnn = _oracleDBConnection.GetOpenConnection())
                {
                    if (cnn is OracleConnection oracleConnection)
                    {
                        using (var cmd = new OracleCommand(query, oracleConnection))
                        {
                            cmd.Parameters.Add(new OracleParameter("no_cia", NO_CIA));
                            cmd.Parameters.Add(new OracleParameter("serie", SERIE));
                            cmd.Parameters.Add(new OracleParameter("ticket", TICKET));

                            using (var reader = await cmd.ExecuteReaderAsync())
                            {
                                if (reader.Read())
                                {
                                    if (PARAMETRO == "E")
                                    {
                                        imgPath = reader["entrada"].ToString();
                                    }
                                    else if (PARAMETRO == "S")
                                    {
                                        imgPath = reader["salida"].ToString();
                                    }
                                }
                            }
                        }
                    }
                }

                if (!string.IsNullOrEmpty(imgPath) && System.IO.File.Exists(imgPath))
                {
                    imageBytes = System.IO.File.ReadAllBytes(imgPath);
                }
            }
            catch (Exception)
            {
                throw;
            }

            return imageBytes;
        }


        public async Task<string> GetTipoTicket(string NO_CIA, string TICKET, string SERIE)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                var resultado = "";
                var proceso = "";

                string query = $@"
                    select proceso from arbppesos
                    where no_cia = '{NO_CIA}'
                    and ticket ='{TICKET}'
                    and serie = '{SERIE}'";

                proceso = await cnn.QueryFirstOrDefaultAsync<string>(query);

                if (proceso == null)
                {
                    return string.Empty;
                }
                string resultQuery = $@"
                    select TIPO from ARIN_PROCESOSBASCULA
                    where proceso = '{proceso}'";

                resultado = await cnn.QueryFirstOrDefaultAsync<string>(resultQuery);

                return resultado ?? string.Empty;
            }

        }

        public async Task<IEnumerable<TrasladoModel>> GetTrasladoEntregadosDias(string ESTADO)
        {
            using (var cnn = _oracleDBConnection.GetOpenConnection())
            {
                string estado = ESTADO.ToUpper();

                var query = @$"
                SELECT * FROM NAF47.VW_LOG_TRASLADOS
                WHERE ESTADO = '{estado}'
                and to_date( substr(hora_llegada,0,10)) = trunc(sysdate)";

                var results = await cnn.QueryAsync<TrasladoModel>(query);

                if (results.Any())
                {
                    return results;
                }
                else
                {
                    //aqui regrese un modelo vacio
                    var res = Enumerable.Empty<TrasladoModel>();
                    return res;
                }
            }
        }
    }
}
