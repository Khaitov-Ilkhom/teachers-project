import axiosInstance from "./api.ts";
import {
  TeacherCreateType,
  TeacherFilter,
  TeacherFilterData
} from "../types/teachersTypes.ts";

export const createTeacherApi = (body: TeacherCreateType) => axiosInstance.post(`/teachers/create`, body);

export const editTeacherApi = (body: TeacherCreateType) => axiosInstance.put(`/teachers/update`, body);

export const getTeacherApi = (id: number | null) => axiosInstance.get(`/teachers/one/${id}`);

export const filterTeachers = (body: TeacherFilter): Promise<TeacherFilterData> => axiosInstance.post(`/teachers/filter`, body);

export const uploadTeacherFace = async (teacherId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
      `/v1/teacher/face/register?teacherId=${teacherId}`,
      formData,
      {headers: {"Content-Type": "multipart/form-data"}}
  );

  return response.data;
};

export const getTeacherImageIdListApi = (id: number | null) => axiosInstance.get(`/v1/teacher/face/list/${id}`);
