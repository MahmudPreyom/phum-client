/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: faculties, isLoading } = useGetAcademicFacultiesQuery([]); // Fetch academic faculties

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastedId = toast.loading("Creating...");
    try {
      const departmentData = {
        name: data.name,
        academicFaculty: data.academicFaculty, // Selected faculty ID
      };

      const res = await addAcademicDepartment(departmentData).unwrap();

      if (res.error) {
        toast.error(res.error.data.message, { id: toastedId });
      } else {
        toast.success("Department created successfully", { id: toastedId });
      }
    } catch (error) {
      toast.error("Failed to create department. Please try again.", {
        id: toastedId,
      });
    }
  };

  const facultyOptions = faculties?.data?.map((item) => ({
    value: item._id, // Faculty ID
    label: item.name, // Faculty Name
  }));

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Department Name" />

          <PHSelect
            label="Faculty Name"
            name="academicFaculty"
            options={facultyOptions}
            disabled={isLoading}
            // loading={isLoading} // Show loading spinner while data is being fetched
            // placeholder="Select a faculty"
          />

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
