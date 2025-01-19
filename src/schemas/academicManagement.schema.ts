import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});

export const academicFacultySchema = z.object({
  name: z
    .string({ required_error: "Please give a Name" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters long." })
    .trim(),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please give a Name" }),
  academicFaculty: z.string({ required_error: "Please select a Faculty Name" }),
});
