import { FaTimes } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Table, Modal, Button, Pagination } from "rsuite";
import "rsuite/dist/rsuite.css";
import { TokenANDnoCia } from "../../Utilities/TokenANDnoCia";
import { useNavigate } from "react-router-dom";
import { UseTurnoContext } from "../../Context/UseNumTurno";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TablaDetalleTurno = () => {
  const { noCia, token } = TokenANDnoCia();
  // const usenavigate = useNavigate();
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(false);
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const modalSize = ["xs", "sm", "md", "lg", "full"].includes(size)
    ? size
    : "lg";
  const [nextId, setNextId] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState([]);
  const [selectedClienteData, setSelectedClienteData] = useState("");
  const [selectedGCliente, setSelectedGCliente] = useState([]);
  const [selectedGrupoCliente, setSelectedGrupoCliente] = useState("");
  const { detalleObjet, setDetalleObjet } = useContext(UseTurnoContext);

  const getData = () => {
    if (sortColumn && sortType) {
      return detalleObjet.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return detalleObjet;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const detailsTurno = getData().filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i <= end;
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCliente = await fetch(
          `${API_Services}/Turno/GetCliente/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (responseCliente.status === 404) {
          // console.log("Aui")
        } else if (responseCliente.ok) {
          const dataCliente = await responseCliente.json();
          setSelectedCliente(dataCliente);
        } else {
          console.error(
            "Ocurrió un error en la solicitud:",
            responseCliente.status
          );
        }

        const responseGrupoCliente = await fetch(
          `${API_Services}/Turno/GetGruposCliente/${noCia}/${selectedClienteData.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataGrupoCliente = await responseGrupoCliente.json();
        setSelectedGCliente(dataGrupoCliente);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [API_Services, token, noCia, selectedClienteData.value]);

  const optsCliente = selectedCliente.map((item) => ({
    value: item.GRUPO,
    label: item.DESCRIPCION,
  }));

  const handleSelectedCliente = (item) => {
    setSelectedClienteData(item);
    setSelectedGrupoCliente("");
  };

  const optsGrupoCliente = selectedGCliente.map((item) => ({
    value: item.NO_CLIENTE,
    label: item.NOMBRE_LARGO,
  }));

  const handleGrupoCliente = (item) => {
    setSelectedGrupoCliente(item);
  };

  //NOTE: OBJETO PARA EL DETALLE
  const guardarDetalleTurno = () => {
    const objDetalles = {
      id: nextId,
      NO_CIA: noCia,
      NO_CLIENTE: selectedGrupoCliente.value,
      NOMBRE: selectedGrupoCliente.label,
      GRUPO: selectedClienteData.value,
      ESTADO: "P",
    };
    setNextId(nextId + 1);
    // setArrayDetalle([...arrayDetalle, objDetalles]);
    setDetalleObjet([...detalleObjet, objDetalles]);

    toast.success("Detalle agregado exitosamente", {
      theme: "colored",
    });
    handleClose();
    setSelectedClienteData("");
    setSelectedGrupoCliente("");
    // return objDetalles;
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between mb-4">
          <h3>Tabla de control</h3>
          <Button
            onClick={() => {
              handleOpen("lg");
            }}
            size="sm"
            color="green"
            appearance="primary"
          >
            Agregar Clientes
          </Button>
        </div>
        <Table
          appearance={"primary"}
          height={400}
          data={detailsTurno}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          bordered
          renderEmpty={() => {
            return (
              <div className="rs-table-body-info">
                No hay registros para mostrar{" "}
              </div>
            );
          }}
          autoHeight
          affixHeader
          affixHorizontalScrollbar
        >
          <Column width={150} sortable resizable>
            <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
              GRUPO
            </HeaderCell>
            <Cell dataKey="GRUPO" />
          </Column>

          <Column width={200} sortable resizable>
            <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
              CLIENTE
            </HeaderCell>
            <Cell dataKey="NO_CLIENTE" />
          </Column>

          <Column width={800} sortable resizable>
            <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
              NOMBRE
            </HeaderCell>
            <Cell dataKey="NOMBRE" />
          </Column>

          <Column width={200} fixed="right">
            <HeaderCell style={{ background: "#d9d9d9", color: "black" }}>
              ACCIONES
            </HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <>
                  <Button
                    appearance="primary"
                    color="cyan"
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Editar
                  </Button>
                  {" | "}
                  <Button
                    appearance="primary"
                    color="red"
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </Cell>
          </Column>
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={detailsTurno.length}
            limitOptions={[5, 10, 15, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>

      <Modal
        backdrop="static"
        keyboard={false}
        size={modalSize}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <h5 className="text-center">Ingreso de cliente</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="container border">
            <div className="row p-5" style={{ height: "400px" }}>
              <div className="col-md-6">
                {" "}
                <label className="form-label">GRUPO</label>
                <Select
                  options={optsCliente}
                  value={selectedClienteData}
                  onChange={handleSelectedCliente}
                  placeholder="Seleciona un grupo"
                />
              </div>

              <div className="col-md-6 ">
                <label className="form-label">CLIENTE</label>
                <Select
                  options={optsGrupoCliente}
                  value={selectedGrupoCliente}
                  onChange={handleGrupoCliente}
                  placeholder="Seleciona el cliente"
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <Button
              color="green"
              appearance="primary"
              onClick={guardarDetalleTurno}
            >
              <BiSolidSave />
              &nbsp; Guardar
            </Button>
            <Button onClick={handleClose} appearance="primary" color="red">
              <FaTimes /> &nbsp; Cerrar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default TablaDetalleTurno;
