import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  createTeacherApi,
  editTeacherApi,
  filterTeachers,
  getTeacherApi,
  getTeacherImageIdListApi
} from "../api/teachers.ts";
import {queryClient} from "../utils/utils.ts";
import {TeacherCreateType, TeacherFilter} from "../types/teachersTypes.ts";
import {message} from "antd";
import {useEffect} from "react";
import axiosInstance from "../api/api.ts";

export const useCreateTeacher = () => {
  const {
    mutate: createTeacher,
    isPending: createLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (teacherData: TeacherCreateType) => createTeacherApi(teacherData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["teacher-list"]});
      message.success("Successfully created teacher");
    },
    onError: (error) => {
      message.error(error.message || "Error creating teacher");
    },
  });

  return {createTeacher, createLoading, isSuccess};
};

export const useFilterTeachers = () => {
  const {
    mutate: filterTeacher,
    isPending: filterLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (teacherData: TeacherFilter) => filterTeachers(teacherData),
    onSuccess: (data) => {
      message.success("Successfully filtered teachers");
      const content = data?.data?.content;
      localStorage.setItem("teachers", JSON.stringify(content))
      queryClient.invalidateQueries({queryKey: ["teacher-list"]});
    },
    onError: (error) => {
      message.error(error.message || "Error filtering teachers");
    },
  });

  return {filterTeacher, filterLoading, isSuccess};
};

export const useEditTeacher = () => {
  const {
    mutate: editTeacher,
    isPending: editLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (teacherData: TeacherCreateType) => editTeacherApi(teacherData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["teacher-list"]});
      message.success("Successfully edited!");
    },
    onError: (error) => {
      message.error(error.message || "Error editing teacher");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully edited!");
    }
  }, [isSuccess]);

  return {editTeacher, editLoading, isSuccess};
};

export const useGetTeacher = (id: number | null) => {
  const {data: oneTeacher, isPending: oneTeacherLoading} = useQuery({
    queryKey: ["teacher-list", id],
    queryFn: () => id ? getTeacherApi(id) : Promise.resolve(null),
    enabled: !!id,
  });

  const teacherData = oneTeacher?.data || {};

  return {teacherData, oneTeacherLoading};
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/teachers/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["teacher-list"]});
    },
  });
};

export const useGetTeacherImageIdList = (id: number | null) => {
  const {data: teacherData, isPending: imageListLoading} = useQuery({
    queryKey: ["teacher-list", id],
    queryFn: () => id ? getTeacherImageIdListApi(id) : Promise.resolve(null),
    enabled: !!id,
  });

  const imageIdList = teacherData?.data?.data || [];

  return {imageIdList, imageListLoading};
};