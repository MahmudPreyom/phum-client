/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableProps } from "antd";
import {
  // TAcademicDepartment,
  TAcademicDepartmentTableData,
  TQueryParam,
} from "../../../types";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

// export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicDepartment,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(params);

  const tableData =
    academicDepartment?.data?.map(({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })) || [];

  const columns: TableProps<TAcademicDepartmentTableData>["columns"] = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Faculty Name",
      dataIndex: "academicFaculty",
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
  return (
    <Table<TAcademicDepartmentTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default AcademicDepartment;
