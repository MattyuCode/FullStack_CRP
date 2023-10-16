import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button as Boton } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { TokenANDnoCia } from "../../../Components/Utilities/TokenANDnoCia";
import { TbClockPause, TbClockPlay } from "react-icons/tb";
import "./Traslado.css";
import { IoGitPullRequestSharp } from "react-icons/io5";
import DataGrid, {
  Column,
  Button,
  FilterRow,
  HeaderFilter,
  ColumnChooser,
  ColumnFixing,
  SearchPanel,
  Pager,
  Paging,
  Export,
  Grouping,
  Summary,
  GroupPanel,
  SortByGroupSummaryInfo,
  TotalItem,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import { useRef } from "react";
import "devextreme/dist/css/dx.light.css";
import "devextreme/dist/css/dx.common.css";
import { InfinitySpin } from "react-loader-spinner";

const Traslado = () => {
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const [traslado, setTraslado] = useState([]);
  const [filterTraslado, setFilterTraslado] = useState([]);
  const { noCia, token } = TokenANDnoCia();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const [size1, setSize1] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOpen1 = (value) => {
    setSize1(value);
    setOpen1(true);
  };
  const [detallesTraslado, setDetallesTraslado] = useState([]);
  const [entregados, setEntregados] = useState([]);
  const [entregadosDias, setEntregadosDias] = useState([]);
  const [cantidadTraslado, setCantidadTraslado] = useState([]);
  const [isPuased, setIsPuased] = useState(false);
  const [nombreCampo, setNombreCampos] = useState("Transito");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [imagen, setImagen] = useState("");
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const dataGridRef = useRef(null);
  // const pageSizes = [5, 10, 25, 50, 100, "all"];
  const pageSizes = [5, 10, 25, 50, 100];
  const modalSize = ["xs", "sm", "md", "lg", "full"].includes(size)
    ? size
    : "lg";
  const modalSize1 = ["xs", "sm", "md", "lg", "full"].includes(size1)
    ? size
    : "lg";

  useEffect(() => {
    const API_s = async () => {
      try {
        if (!token) return;

        //  debugger
        const response = await fetch(
          `${API_Services}/Traslado/GetAllTraslado/a`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          if (response.statusCode !== 401) {
            throw new Error(
              `La solicitud falló con el estado: ${response.status}`
            );
          }
        } else {
          const data = await response.json();
          // console.log(data);
          setCantidadTraslado(data);
          setTraslado(data);
          setFilterTraslado(data);

          const response1 = await fetch(
            `${API_Services}/Traslado/GetAllTraslado/r`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data1 = await response1.json();
          setEntregados(data1);
          setFilterTraslado(data1);

          const responseTrasladoDia = await fetch(
            `${API_Services}/Traslado/GetTrasladoEntregadosDias/r`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseTrasladoDia.status === 404) {
            console.log("No se encontraron datos en la API");
          } else {
            const dataTrasladoDia = await responseTrasladoDia.json();
            setEntregadosDias(dataTrasladoDia);
            setFilterTraslado(dataTrasladoDia);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    API_s();

    const timer = setInterval(() => {
      if (!isPuased) {
        API_s();
        const formattedDate = new Date().toLocaleDateString("es-GT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setLastUpdateTime(formattedDate);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [token, isPuased, API_Services]);

  const handlePauseClick = () => setIsPuased(!isPuased);

  const verDetallesTraslado = async (e) => {
    const noDocu = e.row.data.NO_DOCU;
    const response = await fetch(
      `${API_Services}/Traslado/GetDetailsTraslado/${noCia}/${noDocu}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 204) {
      setDetallesTraslado([]);
    } else {
      const data = await response.json();
      setDetallesTraslado(data);
    }
  };

  const entregadoAlDia = async (estado) => {
    setLoading(true);
    try {
      const responseEntregadosDia = await fetch(
        `${API_Services}/Traslado/GetTrasladoEntregadosDias/${estado}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dataEntregadosDia = await responseEntregadosDia.json();
      setTraslado(dataEntregadosDia);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const TrasladoFiltro = async (filtro) => {
    setLoading(true);
    try {
      const responseFiltro = await fetch(
        `${API_Services}/Traslado/GetAllTraslado/${filtro}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dataFiltro = await responseFiltro.json();
      setTraslado(dataFiltro);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    const nombre = "Entregados al día";
    setNombreCampos(nombre);
    const estado = "r";
    entregadoAlDia(estado);
  };

  const transito = () => {
    const nombre = "En transito";
    setNombreCampos(nombre);
    const estado = "a";
    TrasladoFiltro(estado);
  };

  const Entregados = () => {
    const nombre = "Entregados";
    setNombreCampos(nombre);
    const estado = "r";
    TrasladoFiltro(estado);
  };

  const verImage = async (e, parametro) => {
    const no_ciaP = e.row.data.NO_CIA,
      ticket = e.row.data.TICKET,
      serie = e.row.data.SERIE;
    setImagen("");
    setLoader(true);

    try {
      const response = await fetch(
        `${API_Services}/Traslado/ObtenerImagen/${no_ciaP}/${ticket}/${serie}/${parametro}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.blob();
      if (response.status === 404) {
        toast.error("No se encontró la imagen.", {
          theme: "colored",
        });
        setLoader(false);
        setTimeout(() => handleClose1(), 5000);
      } else {
        setImagen(URL.createObjectURL(data));
        setLoader(false);
        // console.log(URL.createObjectURL(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const orders = traslado.map((item) => ({
    TICKET: item.TICKET,
    SERIE: item.SERIE,
    NO_CIA: item.NO_CIA,
    NO_DOCU: item.NO_DOCU,
    UNIDAD: item.UNIDAD,
    PLACA: item.PLACA,
    TURNO: item.TURNO,
    PILOTO: item.PILOTO,
    TIPO_TRASLADO: item.TIPO_TRASLADO,
    BOD_ORIGEN: item.BOD_ORIGEN,
    BOD_DESTINO: item.BOD_DESTINO,
    HORA_SALIDA: item.HORA_SALIDA,
    HORA_LLEGADA: item.HORA_LLEGADA,
  }));

  const renderGridCell = (data) => {
    return (
      <a href={data.text} target="_blank" rel="noopener noreferrer">
        Website
      </a>
    );
  };

  const phoneNumberFormat = (value) => {
    const USNumber = value.match(/(\d{3})(\d{3})(\d{4})/);
    return `(${USNumber[1]}) ${USNumber[2]}-${USNumber[3]}`;
  };

  const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Companies");

    worksheet.columns = [
      { width: 5 },
      { width: 30 },
      { width: 25 },
      { width: 15 },
      { width: 25 },
      { width: 40 },
    ];

    exportDataGrid({
      component: e.component,
      worksheet,
      keepColumnWidths: false,
      topLeftCell: { row: 2, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        if (gridCell.rowType === "data") {
          if (gridCell.column.dataField === "Phone") {
            excelCell.value = parseInt(gridCell.value, 10);
            excelCell.numFmt = "[<=9999999]###-####;(###) ###-####";
          }
          if (gridCell.column.dataField === "Website") {
            excelCell.value = {
              text: gridCell.value,
              hyperlink: gridCell.value,
            };
            excelCell.font = { color: { argb: "FF0000FF" }, underline: true };
            excelCell.alignment = { horizontal: "left" };
          }
        }
        if (gridCell.rowType === "group") {
          excelCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "BEDFE6" },
          };
        }
        if (gridCell.rowType === "totalFooter" && excelCell.value) {
          excelCell.font.italic = true;
        }
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "Traslado.xlsx"
        );
      });
    });
    e.cancel = true;
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center mb-3">
        <div
          className="col-md-3"
          onClick={transito}
          style={{ cursor: "pointer" }}
        >
          <div
            className="card tarjetas estilosoo shadow"
            style={{ background: "#e3e31b" }}
          >
            <div className="r" style={{ marginRight: "25px" }}>
              <h4 className="text-center">En transito</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p className="h3 text-center p-0 m-0">
                  {cantidadTraslado.length}
                </p>
                <IoGitPullRequestSharp
                  className="iconTransito"
                  style={{ marginLeft: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-3"
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
        >
          <div
            className="card tarjetas  estilosoo shadow"
            style={{ background: "#218648", color: "#ffff" }}
          >
            <div className="r">
              <h4 className="text-center">Entregados del día</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p className="h3 text-center p-0 m-0">
                  {entregadosDias.length || 0}
                </p>
                <i
                  className="fas fa-dolly  iconTransito"
                  style={{ marginLeft: "30px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-3"
          onClick={Entregados}
          style={{ cursor: "pointer" }}
        >
          <div
            className="card tarjetas border-0 border-left-info estilosoo shadow"
            style={{ background: "#2071a1", color: "white" }}
          >
            <div className="r" style={{ marginRight: "25px" }}>
              <h4 className="text-center">Entregados</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p className="h3 text-center p-0 m-0">{entregados.length}</p>
                <i
                  className="fas fa-truck iconTransito"
                  style={{ marginLeft: "30px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="iconos">
            {isPuased ? (
              <TbClockPlay
                title="Iniciar timer"
                onClick={handlePauseClick}
                style={{ color: "red" }}
              />
            ) : (
              <TbClockPause
                title="Pausar timer"
                onClick={handlePauseClick}
                style={{ color: "green" }}
              />
            )}
          </div>
          <p className="text-center">{lastUpdateTime}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <span className="titless text-center">Traslado</span>
        </div>
        <div className="col-md-12 mb-5">
          <div className="tab-contentAct card shadow">
            {loading ? (
              <div className="text-center">
                <InfinitySpin width="300" color="#4fa94d" />
                {/* <p>Loading...</p> */}
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between  ">
                  <div className="">
                    <h3 style={{ marginLeft: "150px", color: "#757575" }}>
                      {nombreCampo}
                    </h3>
                  </div>

                  <div className=""></div>
                </div>

                <DataGrid
                  id="gridContainer"
                  ref={dataGridRef}
                  dataSource={orders}
                  // keyExpr="ID"
                  showBorders={true}
                  onExporting={onExporting}
                >
                  <GroupPanel
                    visible={true}
                    emptyPanelText="Arrastre una columna para agrupar"
                  />
                  <Grouping autoExpandAll={true} />
                  <SortByGroupSummaryInfo summaryItem="count" />

                  <ColumnChooser enabled={true} />
                  <ColumnFixing enabled={true} />
                  <FilterRow visible={true} />
                  <HeaderFilter visible={true} />
                  <SearchPanel
                    visible={true}
                    width={240}
                    placeholder="Buscar..."
                  />

                  <Column dataField="UNIDAD" width={100} caption="UNIDAD">
                    {/* <HeaderFilter groupInterval={10000} /> */}
                    <HeaderFilter />
                  </Column>

                  <Column
                    dataField="PLACA"
                    // alignment="right"
                    // dataType="date"
                    // calculateFilterExpression={calculateFilterExpression}
                    width={120}
                  >
                    <HeaderFilter />
                  </Column>

                  <Column
                    dataField="TURNO"
                    // alignment="right"
                    // dataType="datetime"
                    // format="M/d/yyyy, HH:mm"
                    width={100}
                  >
                    <HeaderFilter />
                  </Column>

                  <Column
                    dataField="PILOTO"
                    // alignment="right"
                    // dataType="number"
                    // format="currency"
                    // editorOptions={saleAmountEditorOptions}
                    width={280}
                  >
                    <HeaderFilter />
                  </Column>

                  <Column dataField="TIPO_TRASLADO" width={250}>
                    <HeaderFilter />
                  </Column>

                  <Column dataField="BOD_ORIGEN" caption="ORIGEN" width={100}>
                    <HeaderFilter />
                  </Column>

                  <Column dataField="BOD_DESTINO" caption="DESTINO" width={100}>
                    <HeaderFilter />
                  </Column>

                  <Column
                    dataField="HORA_SALIDA"
                    // alignment="right"
                    // dataType="number"
                    // format="currency"
                    // editorOptions={saleAmountEditorOptions}
                    width={250}
                  >
                    <HeaderFilter />
                  </Column>

                  <Column
                    caption="FOTO"
                    fixed={false}
                    width={50}
                    type="buttons"
                  >
                    <Button
                      icon="image"
                      hint="SALIDA"
                      onClick={(e) => {
                        handleOpen1("lg");
                        verImage(e, "S");
                      }}
                    />
                  </Column>

                  <Column dataField="HORA_LLEGADA" width={200}>
                    <HeaderFilter />
                  </Column>

                  <Column
                    caption="FOTO"
                    fixed={false}
                    width={50}
                    type="buttons"
                  >
                    <Button
                      icon="image"
                      hint="ENTRADA"
                      onClick={(e) => {
                        handleOpen1("lg");
                        verImage(e, "E");
                      }}
                    />
                  </Column>

                  <Column caption="ACCION" fixed={true} type="buttons">
                    <Button
                      name="Details"
                      icon="detailslayout"
                      hint="Detalles"
                      onClick={(e) => {
                        handleOpen("lg");
                        verDetallesTraslado(e);
                      }}
                    />
                  </Column>

                  <Export enabled={true} />

                  <Summary>
                    <TotalItem
                      column="Name"
                      summaryType="count"
                      displayFormat="Total count: {0} companies"
                    />
                  </Summary>

                  <Paging defaultPageSize={10} />
                  <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={pageSizes}
                  />
                </DataGrid>
              </>
            )}
          </div>
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
          <h5 className="text-center">Detalles de Traslado</h5>
        </Modal.Header>

        <Modal.Body>
          <div className="container border p-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                {detallesTraslado.length === 0 ? (
                  <>
                    <div className="alert alert-info">
                      <br />
                      <br />
                      <h4 className="text-center"> No hay datos disponibles</h4>
                      <br />
                      <br />
                    </div>
                  </>
                ) : (
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-secondary">
                        <th scope="">NO CIA</th>
                        <th scope="">NO DOCU</th>
                        <th scope="">NO ARTI</th>
                        <th scope="">DESCRIPCIÓN</th>
                        <th scope="">UNIDAD</th>
                        <th scope="">CANTIDAD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallesTraslado.map((item, index) => (
                        <tr key={index}>
                          <td> {item.NO_CIA} </td>
                          <td> {item.NO_DOCU} </td>
                          <td> {item.NO_ARTI} </td>
                          <td> {item.DESCRIPCION} </td>
                          <td> {item.UNIDAD} </td>
                          <td> {item.CANTIDAD} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <Boton onClick={handleClose} color="red" appearance="primary">
              Cerrar
            </Boton>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal size={modalSize1} open={open1} onClose={handleClose1}>
        <Modal.Body>
          {loader ? (
            <div className="text-center">
              <InfinitySpin width="300" color="#4fa94d" />
            </div>
          ) : imagen ? (
            <img src={imagen} className="card-img-top" alt="" />
          ) : (
            <div>
              <h3 className="alert alert-danger text-center">
                No se encontró la imagen.
              </h3>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Traslado;
