import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import { TFaculty } from "../../../types/userManagement.type";

export type TTableData = Pick<TFaculty, "fullName" | "email" | "contactNo">;

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultyQuery([
    // { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const metaData = facultyData?.meta;

  const tableData = facultyData?.data?.map(
    ({ _id, fullName, email, contactNo, academicDepartment }) => ({
      key: _id,
      fullName,
      email,
      contactNo,
      academicDepartment: academicDepartment?.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Academic Department",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);

        return (
          <Space>
            {/* <Link to={`/admin/student-data/${item.key}`}> */}
            <Button>Details</Button>
            {/* </Link> */}
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default FacultyData;
