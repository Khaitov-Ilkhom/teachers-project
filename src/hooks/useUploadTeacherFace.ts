import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {uploadTeacherFace} from "../api/teachers.ts";

export const useUploadTeacherFace = () => {
  return useMutation({
    mutationFn: ({ teacherId, file }: { teacherId: number; file: File }) =>
        uploadTeacherFace(teacherId, file),
    onSuccess: () => {
      message.success("Fayl muvaffaqiyatli yuklandi!");
    },
    onError: () => {
      message.error("Fayl yuklashda xatolik yuz berdi!");
    },
  });
};
