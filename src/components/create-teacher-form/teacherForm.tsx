import {Button, Form, FormProps, Input, message, notification} from "antd";
import {useCreateTeacher, useGetTeacher} from "../../hooks/useTeachersHook.ts";
import {Dispatch, SetStateAction, useEffect} from "react";
import {TeacherCreateType} from "../../types/teachersTypes.ts";
import {UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";

type CreateTeacherFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  id?: number | null
  editLoading?: boolean
  editSuccess?: boolean
  editTeacher?: UseMutateFunction<AxiosResponse<any, any>, Error, TeacherCreateType, unknown>
}

type NotificationType = 'success'

const TeacherForm = ({
                       setIsModalOpen, id,
                       editTeacher, editLoading,
                       editSuccess
                     }: CreateTeacherFormProps) => {
  const [form] = Form.useForm();
  const {createTeacher, createLoading, isSuccess} = useCreateTeacher()
  const {teacherData} = useGetTeacher(id ?? null)
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({message: id ? "Successfully updated" : 'Successfully created!'});
  };

  useEffect(() => {
    if (teacherData && id) {
      form.setFieldsValue({
        firstName: teacherData.firstName || "",
        lastName: teacherData.lastName || "",
        phone: teacherData.phone || "",
        pinfl: teacherData.pinfl || "",
        degree: teacherData.degree || "",
        position: teacherData.position || "",
      });
    }
  }, [teacherData, id, form]);

  const loading = editLoading || createLoading;

  const onFinish: FormProps<TeacherCreateType>['onFinish'] = (values) => {
    if (id !== undefined && id !== null) {
      editTeacher?.({...values, id: id});
    } else {
      createTeacher(values);
    }
  };
  const onFinishFailed: FormProps<TeacherCreateType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Successfully created!');
      setIsModalOpen(false);
      form.resetFields();
      openNotificationWithIcon('success');
    }
    if (editSuccess) {
      message.success('Successfully edited!');
      setIsModalOpen(false);
      form.resetFields();
      openNotificationWithIcon('success');
    }
  }, [isSuccess, editSuccess, form, setIsModalOpen]);

  return (
      <div>
        {contextHolder}
        <Form
            form={form}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full space-y-2"
            layout="vertical"
        >
          <Form.Item<TeacherCreateType>
              label="First Name"
              name="firstName"
              rules={[{required: true, message: 'Please input your First Name!'}]}
              className="!my-1"
          >
            <Input placeholder="First Name"/>
          </Form.Item>

          <Form.Item<TeacherCreateType>
              label="Last Name"
              name="lastName"
              rules={[{required: true, message: 'Please input your Last Name!'}]}
              className="!my-1"
          >
            <Input placeholder="Last Name"/>
          </Form.Item>

          <Form.Item<TeacherCreateType>
              label="Phone"
              name="phone"
              rules={[{required: true, message: 'Please input your Phone!'}]}
              className="!my-1"
          >
            <Input placeholder="Phone"/>
          </Form.Item>

          <Form.Item<TeacherCreateType>
              label="Pinfl"
              name="pinfl"
              rules={[{required: true, message: 'Please input your Pinfl!'}]}
              className="!my-1"
          >
            <Input placeholder="Pinfl"/>
          </Form.Item>

          <Form.Item<TeacherCreateType>
              label="Degree"
              name="degree"
              rules={[{required: true, message: 'Please input your Degree!'}]}
              className="!my-1"
          >
            <Input placeholder="Degree"/>
          </Form.Item>

          <Form.Item<TeacherCreateType>
              label="Position"
              name="position"
              rules={[{required: true, message: 'Please input your Position!'}]}
              className="!my-1"
          >
            <Input placeholder="Position"/>
          </Form.Item>

          <Form.Item label={null}>
            <Button loading={loading} disabled={loading} type="primary" htmlType="submit"
                    className="w-full">
              {id ? "Tahrirlash" : "Saqlash"}
            </Button>
          </Form.Item>
        </Form>
      </div>
  )
}
export default TeacherForm;
