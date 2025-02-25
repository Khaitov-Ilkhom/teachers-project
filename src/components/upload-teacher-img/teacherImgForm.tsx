import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Form, Input, Upload, Button, message, notification} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {RcFile, UploadFile} from "antd/es/upload/interface";
import {useUploadTeacherFace} from "../../hooks/useUploadTeacherFace.ts";

type NotificationType = "success";

const UploadForm = ({setIsModalOpen, isModalOpen}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  isModalOpen: boolean
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<RcFile | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const mutation = useUploadTeacherFace();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({message: "Successfully uploaded image"});
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      setFile(null);
      setFileList([]);
    }
  }, [isModalOpen, form]);

  const onFinish = (values: { teacherId: number }) => {
    if (!file) {
      message.error("Iltimos, fayl yuklang!");
      return;
    }

    mutation.mutate(
        {teacherId: values.teacherId, file},
        {
          onSuccess: () => {
            openNotificationWithIcon("success");
            form.resetFields();
            setFile(null);
            setFileList([]);
            setIsModalOpen(false);
          },
        }
    );
  };

  return (
      <>
        {contextHolder}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
              label="Teacher ID"
              name="teacherId"
              rules={[{required: true, message: "Iltimos, ID kiriting!"}]}
          >
            <Input type="number" placeholder="ID kiriting"/>
          </Form.Item>

          <Form.Item label="Rasm yuklash">
            <Upload
                beforeUpload={(file: RcFile) => {
                  setFile(file);
                  setFileList([{uid: file.uid, name: file.name, status: "done", originFileObj: file}]);
                  return false;
                }}
                fileList={fileList}
                onRemove={() => {
                  setFile(null);
                  setFileList([]);
                }}
                showUploadList={true}
                maxCount={1}
            >
              <Button icon={<UploadOutlined/>}>Fayl tanlash</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={mutation.isPending}>
              Yuklash
            </Button>
          </Form.Item>
        </Form>
      </>
  );
};

export default UploadForm;
