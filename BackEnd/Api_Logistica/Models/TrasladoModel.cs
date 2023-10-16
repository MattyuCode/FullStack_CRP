using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Models
{
    public class TrasladoModel
    {
        public string NO_CIA { get; set; }
        public string ESTADO { get; set; }
        public string NO_DOCU { get; set; }
        public string COD_TIPO_TRASLADO { get; set; }
        public string UNIDAD { get; set; }
        public string PLACA { get; set; }
        public string PILOTO { get; set; }
        public string TIPO_TRASLADO { get; set; }
        public string BOD_ORIG { get; set; }
        public string BOD_ORIGEN { get; set; }
        public string BOD_DEST { get; set; }
        public string BOD_DESTINO { get; set; }
        public string HORA_SALIDA { get; set; }
        public string HORA_LLEGADA { get; set; }
        public string TURNO { get; set; }
        public string TICKET { get; set; }
        public string SERIE { get; set; }
    }
    public class TrasladoDetalles
    {
        public string NO_CIA { get; set; }
        public string NO_DOCU { get; set; }
        public string NO_ARTI { get; set; }
        public string DESCRIPCION { get; set; }
        public string UNIDAD { get; set; }
        public string CANTIDAD { get; set; }
    }

    public class GetImg
    {
        public string NO_CIA { get; set; }
        public string TICKET { get; set; }
        public string SERIE { get; set; }
        public string ENTRADA { get; set; }
        public string SALIDA { get; set; }
    }
}
