import {Dispatch, SetStateAction, useState} from "react";
import {Form, Input, Upload, Button, message, notification} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useUploadTeacherFace} from "../../hooks/useUploadTeacherFace.ts";

type NotificationType = 'success'

const UploadForm = ({setIsModalOpen}: { setIsModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const mutation = useUploadTeacherFace();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({message: "Successfully uploaded image"});
  };

  const onFinish = (values: { teacherId: number }) => {
    if (!file) {
      message.error("Iltimos, fayl yuklang!");
      return;
    }

    mutation.mutate(
        {teacherId: values.teacherId, file},
        {
          onSuccess: () => {
            openNotificationWithIcon('success');
            form.resetFields();
            setFile(null);
            setIsModalOpen(false);
          },
        }
    );
  };

  return (
      <>
        {contextHolder}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
              label="Teacher ID"
              name="teacherId"
              rules={[{required: true, message: "Iltimos, ID kiriting!"}]}
          >
            <Input type="number" placeholder="ID kiriting"/>
          </Form.Item>

          <Form.Item label="Rasm yuklash">
            <Upload
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
                showUploadList={true}
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
