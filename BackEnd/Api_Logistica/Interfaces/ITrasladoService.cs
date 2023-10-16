using Api_Logistica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Services.Interface
{
    public interface ITrasladoService
    { 
        Task<IEnumerable<TrasladoModel>> GetAllTraslado(string ESTADO);
        Task<IEnumerable<TrasladoModel>> GetTrasladoEntregadosDias(string ESTADO);
        Task<IEnumerable<TrasladoDetalles>> GetDetailsTraslado(string NO_CIA, string NO_DOCU);
       
        Task<byte[]> GetImages(string NO_CIA, string TICKET, string SERIE, string PARAMETRO);



    }
}
