using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Logistica.Models
{
    public class TurnoModel
    {
        public string NO_CIA { get; set; }
        public string TURNO { get; set; }
        public string NUM_PLACA { get; set; }
        public string PILOTO { get; set; }
        public string FECHA_HORA { get; set; }
        public string HORA_ING_BASCULA { get; set; }

    }

    public class DetallesTurno
    {
        public string NO_CIA { get; set; }
        public string TURNO { get; set; }
        public string GRUPO { get; set; }
        public string NO_CLIENTE { get; set; }
        public string CLIENTE { get; set; }
        public string ESTADO { get; set; }
    }

    public class crearDtallesTurno
    {
        public string NO_CIA { get; set; }
        public string TURNO { get; set; }
        public string GRUPO { get; set; }
        public string NO_CLIENTE { get; set; }
        public string ESTADO { get; set; }
    }

    public class CrearTurnoModel
    {
        public string NO_CIA { get; set; }
        public string NO_SEDE { get; set; }
        //public string TURNO { get; set; }
        public string NUM_PLACA { get; set; }
        public string PILOTO { get; set; }
        public string NOMBRE_PILOTO { get; set; }

        //public string FECHA_HORA { get; set; }

        public string TIPO_TURNO { get; set; }
        public string TURNO_ORIGEN { get; set; }
        public string INTERNO { get; set; }
        public string TRANSPORTISTA { get; set; }
        public string VEHICULO { get; set; }
        public string TIPO_VEHICULO { get; set; }
        public string MARCA_VEHICULO { get; set; }
        public string LICENCIA { get; set; }
        public string USUARIO_CREA { get; set; }
    }

    public class CompaniaModel
    {
        public string NO_CIA { get; set; }
        public string NOMBRE { get; set; }

    }

    public class SedeModel
    {
        public string NO_CIA { get; set; }
        public string NO_SEDE { get; set; }
        public string PLANTA { get; set; }

    }

    public class TransportistaModel
    {
        public string NO_CIA { get; set; }
        public string TRANSPORTISTA { get; set; }
        public string DESCRIPCION { get; set; }
    }

    public class TIPOTURNOMODEL
    {
        public string TIPO_TURNO { get; set; }
        public string DESCRIPCION { get; set; }
    }


    public class VehiculoModel
    {
        public string NO_CIA { get; set; }
        public string TRANSPORTISTA { get; set; }
        public string VEHICULO { get; set; }
        public string NUM_PLACA { get; set; }
        public string LICENCIA { get; set; }
        public string TIPO { get; set; }
        public string MARCA { get; set; }
    }

    public class pilotoModel
    {
        public string NO_CIA { get; set; }
        public string TRANSPORTISTA { get; set; }
        public string PILOTO { get; set; }
        public string DESCRIPCION { get; set; }
    }
    public class tipoModel
    {
        public string NO_CIA { get; set; }
        public string TIPO_VEHICULO { get; set; }
        public string DESCRIPCION { get; set; }
    }


    public class DETALLES_TURNO_MODEL
    {
        public string NO_CIA { get; set; }
        public string GRUPO { get; set; }
        public string TURNO { get; set; }
        public string NOMBRE { get; set; }
        public string NO_CLIENTE { get; set; }
        public string ESTADO { get; set; }
    }


    public class CLIETE
    {
        public string NO_CIA { get; set; }
        public string GRUPO { get; set; }
        public string DESCRIPCION { get; set; }

    }


    public class GRUPOSCLIENTE
    {
        public string NO_CIA { get; set; }
        public string GRUPO { get; set; }
        public string NO_CLIENTE { get; set; }
        public string NOMBRE_LARGO { get; set; }
    }

    public class TURNO_EXISTE
    {
        public string TRANSPORTISTA { get; set; }
        public string VEHICULO { get; set; }
        public string NUM_PLACA { get; set; }
        public string LICENCIA { get; set; }
        public string PILOTO { get; set; }
        public string NOMBRE_PILOTO { get; set; }
        public string INTERNO { get; set; }
        public string PERSO_SISTEMA { get; set; }
    }
}
