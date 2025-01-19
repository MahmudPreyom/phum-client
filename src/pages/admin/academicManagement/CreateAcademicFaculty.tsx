/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastedId = toast.loading("Creating...");
    try {
      const facultyName = data.name;
      const res = (await addAcademicFaculty({
        name: facultyName,
      })) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastedId });
      } else {
        toast.success("Faculty created successfully", { id: toastedId });
      }
    } catch (error) {
      toast.error("Failed to create Faculty. Please try again", {
        id: toastedId,
      });
    }
  };
  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
