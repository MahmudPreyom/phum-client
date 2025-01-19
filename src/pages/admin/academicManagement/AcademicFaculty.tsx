/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableProps, Tag } from "antd";
import { TAcademicFaculty, TQueryParam } from "../../../types";
import { useState } from "react";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(params);

  const tableData = academicFaculty?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableProps<TTableData>["columns"] = [
    {
      title: "Faculty Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };
  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default AcademicFaculty;
