import { H2, Search, Table, Pagination } from "../ui";

import { useState, useEffect } from "react";
import { getVehiclesAPI } from "../../api/vehicles";

const COLUMNS_TABLE = [
  {
    title: "Número de licencia",
    dataIndex: "licenseNumber",
    key: "licenseNumber",
  },
  {
    title: "Propietario",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Modelo",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Marca",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    render: (color) => color?.map((color) => `${color} `),
  },
  {
    title: "Neúmaticos",
    dataIndex: "tiresNumber",
    key: "tiresNumber",
  },
  {
    title: "Estado",
    dataIndex: "statusName",
    key: "statusName",
    render: (statusName) => {
      const statusBg = {
        Disponible: "bg-green-200 text-green-500",
        "No disponible": "bg-red-500",
      };

      const classes = `${statusBg[statusName]} py-2 rounded text-center`;

      return <div className={classes} style={{ minWidth: "151px" }}>{statusName}</div>;
    },
  },
  {
    title: "Descripción de estado",
    dataIndex: "statusDescription",
    key: "statusDescription",
  },
  {
    title: "Creado en",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const List = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesCounter, setVehiclesCounter] = useState(1);

  const [inputSearch, setInputSearch] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    getVehicles();
  }, [inputSearch]);

  const getVehicles = async () => {
    const data = {
      search: {
        field: inputSearch,
      },
    };

    const response = await getVehiclesAPI(data);

    if (response.success) {
      const { vehicles, counter, perPage } = response.data;

      /* prettier-ignore */
      const mapping = vehicles.map(({ vehicleId, model, brand, color, type, licenseNumber, tiresNumber, createdAt, statusName, statusDescription, ownerName, ownerLastname }) => {
        const description = statusDescription ?? "Sin observaciones"
        return ({
          key: vehicleId,
          model,
          brand,
          color,
          type,
          licenseNumber,
          tiresNumber,
          createdAt,
          statusName,
          statusDescription: description,
          owner: `${ownerName} ${ownerLastname}`,
        })
      });

      setVehicles(mapping);
      setVehiclesCounter(counter);
      setPerPage(perPage);
    }
  };

  const onChange = (e) => {
    setInputSearch(e.target.value);
  };

  const pageHandler = (page) => {
    setPage(page);
  };

  return (
    <>
      <H2 className="my-5 text-gray-700" weight="normal">
        Listado de vehículos
      </H2>

      <Search className="text-gray-700" placeholder="Buscar por id o número de placa..." onChange={onChange} />

      <div className="mt-5">
        <Table columns={COLUMNS_TABLE} dataSource={vehicles} />
      </div>

      <div className="mt-5 flex justify-end">
        <Pagination currentPage={page} total={vehiclesCounter} perPage={perPage} onChange={pageHandler} />
      </div>
    </>
  );
};

export default List;
