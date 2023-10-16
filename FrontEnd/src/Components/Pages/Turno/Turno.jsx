import { Button as Boton } from "rsuite";
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
import { useEffect, useState } from "react";
import { TokenANDnoCia } from "../../Utilities/TokenANDnoCia";
import { useRef } from "react";
import ModalTurno from "./ModalTurno";
import { useNavigate } from "react-router-dom";

export const Turno = () => {

  const usenavigate = useNavigate();
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const noCiaSeleccionado = localStorage.getItem("no_cia_seleccionado");
  const { token } = TokenANDnoCia();
  const [turno, setTurno] = useState([]);
  const [detallesTurno, setDetallesTurno] = useState([]);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(false);
  const dataGridRef = useRef(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
    const modalSize = ["xs", "sm", "md", "lg", "full"].includes(size)
  ? size
  : "lg";



  useEffect(() => {
    const API_s = async () => {
      localStorage.setItem("no_cia_seleccionado", "10");
      try {
        const response = await fetch(`${API_Services}/Turno/GetAllTurnos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        // console.log(data);
        setTurno(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    API_s();
  }, [API_Services, token]);

  const verDetallesTurno = async (e) => {
    const TURNO = e.row.data.TURNO;
    const response = await fetch(
      `${API_Services}/Turno/GetDetailsTurno/${noCiaSeleccionado}/${TURNO}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    //console.log(data);
    setDetallesTurno(data);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center mb-3">
        <div className="row">
          <div className="col-md-12">
            <span className="titless text-center">
              Mantenimiento de turnos despacho producto terminado
            </span>
          </div>
          <div className="col-md-12 mb-5">
            <div className="tab-contentAct card shadow">
              <div className="d-flex justify-content-start px-5 ">
                <Boton
                  color="green"
                  size="lg"
                  appearance="primary"
                  onClick={() => usenavigate("/addTurno")}
                >
                  <i className="fas fa-plus"></i> &nbsp; Agregar turno
                </Boton>
              </div>

              <DataGrid
                id="gridContainer"
                ref={dataGridRef}
                dataSource={turno}
                showBorders={true}
                // onExporting={{}}
              >
                <GroupPanel
                  visible={false}
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
                  width={500}
                  placeholder="Buscar turno..."
                />

                <Column dataField="TURNO" caption="TURNO" width={150}>
                  <HeaderFilter />
                </Column>

                <Column dataField="NUM_PLACA" caption="PLACA" width={200}>
                  <HeaderFilter />
                </Column>

                <Column dataField="PILOTO">
                  <HeaderFilter />
                </Column>

                <Column dataField="FECHA_HORA">
                  <HeaderFilter />
                </Column>

                <Column dataField="HORA_ING_BASCULA">
                  <HeaderFilter />
                </Column>

                <Column caption="ACCION" fixed={true} type="buttons">
                  <Button
                    icon="print"
                    type="print"
                    text="Imprimir"
                    // onClick={this.doneClick}
                  />{" "}
                  <Button
                    icon="deleterow"
                    type="deleterow"
                    text="Anular"
                    // onClick={this.doneClick}
                    stylingMode="contained"
                  />
                </Column>

                <Column caption="DETALLE" fixed={true} type="buttons">
                  <Button
                    name="Details"
                    icon="detailslayout"
                    hint="Detalles"
                    onClick={(e) => {
                      handleOpen("lg");
                      verDetallesTurno(e);
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
                <Pager showPageSizeSelector={true} allowedPageSizes={{}} />
              </DataGrid>
            </div>
          </div>
        </div>

        <ModalTurno
          open={open}
          size={modalSize}
          handleClose={handleClose}
          detallesTurno={detallesTurno}
        />
      </div>
    </div>
  );
};
