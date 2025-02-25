import React, {useState, useRef} from "react";
import {Modal, Button, Form, Input, message, Upload, notification} from "antd";
import Webcam from "react-webcam";
import {UploadOutlined, ReloadOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../../api/api.ts";

interface UploadImageParams {
  teacherId: number;
  file: File;
}

type NotificationType = "success";

const CameraModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({message: "Successfully uploaded image"});
  };

  const uploadImage = useMutation({
    mutationFn: async ({teacherId, file}: UploadImageParams) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      return axiosInstance.post(
          `/v1/teacher/face/recognize/by/id?teacherId=${teacherId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
    },
    onSuccess: () => {
      message.success("Rasm muvaffaqiyatli yuborildi");
      openNotificationWithIcon("success");
      setIsModalOpen(false);
      form.resetFields();
      setCapturedImage(null);
    },
    onError: () => {
      message.error("Rasm yuborishda xatolik yuz berdi");
    },
  });

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setCapturedImage(null);
  };

  const captureImage = (): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = base64ToFile(imageSrc, "captured-image.jpg");
      setCapturedImage(file);
      message.success("Rasm muvaffaqiyatli olindi");
    }
  };

  const resetCapturedImage = (): void => {
    setCapturedImage(null);
    message.info("Rasm ochirildi. Qayta rasmga oling.");
  };

  const uploadCapturedImage = (): void => {
    form
        .validateFields()
        .then((values: { teacherId: number }) => {
          if (capturedImage) {
            uploadImage.mutate({teacherId: values.teacherId, file: capturedImage});
          } else {
            message.error("Iltimos, avval rasmga oling");
          }
        })
        .catch(() => {
          message.error("Iltimos, ID ni to'g'ri kiriting");
        });
  };

  const base64ToFile = (base64: string, filename: string): File => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, {type: mimeString});
  };

  return (
      <div>
        {contextHolder}
        <div className="flex justify-center">
          <Button type="primary" onClick={showModal}>
            Kamerani yoqish
          </Button>
        </div>
        <Modal
            title="Kameradan rasmga olish"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
          {isModalOpen && !capturedImage && (
              <>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={{facingMode: "user"}}
                />
                <Button
                    type="primary"
                    block
                    onClick={captureImage}
                    style={{marginTop: "1rem"}}
                >
                  Rasmga olish
                </Button>
              </>
          )}

          {capturedImage && (
              <>
                <img
                    src={URL.createObjectURL(capturedImage)}
                    alt="Captured"
                    style={{width: "100%", marginBottom: "1rem"}}
                />
                <Button
                    icon={<ReloadOutlined/>}
                    onClick={resetCapturedImage}
                    style={{marginBottom: "1rem"}}
                    block
                >
                  Qayta olish
                </Button>
                <Form form={form} layout="vertical">
                  <Form.Item
                      name="teacherId"
                      label="Teacher ID"
                      rules={[{required: true, message: "Iltimos, ID ni kiriting!"}]}
                  >
                    <Input type="number" placeholder="ID kiriting"/>
                  </Form.Item>

                  <Form.Item className="hidden" label="Rasm yuklash">
                    <Upload
                        fileList={[
                          {uid: "-1", name: capturedImage.name, status: "done"},
                        ]}
                        beforeUpload={() => false}
                        showUploadList={true}
                        disabled
                    >
                      <Button icon={<UploadOutlined/>} disabled>
                        Fayl tanlandi
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Button
                        type="primary"
                        block
                        onClick={uploadCapturedImage}
                        loading={uploadImage.isPending}
                    >
                      Yuklash
                    </Button>
                  </Form.Item>
                </Form>
              </>
          )}
        </Modal>
      </div>
  );
};

export default CameraModal;
