import {FormProps, Modal} from 'antd';
import {Button, Form, Input} from 'antd';
import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import TeacherForm from "../../../components/create-teacher-form/teacherForm.tsx";
import TableTeachers from "../../../components/table-teachers/tableTeachers.tsx";
import {useFilterTeachers} from "../../../hooks/useTeachersHook.ts";
import {useSearchParams} from "react-router-dom";
import UploadForm from "../../../components/upload-teacher-img/teacherImgForm.tsx";

type FieldType = {
  firstName?: string;
  lastName?: string;
};

const CreateTeachers = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {filterTeacher, filterLoading, isSuccess} = useFilterTeachers()

  const [searchParams, setSearchParams] = useSearchParams();
  const modalType = searchParams.get("modal");

  const isCreateTeacherModal = modalType === "create-teacher";
  const teachers = JSON.parse(localStorage.getItem("teachers") as string) || [];

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    filterTeacher({filter: values, paging: {page: 0, size: 100}});
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const createTeacher = () => {
    setIsModalOpen(true);
    setSearchParams({modal: "create-teacher"});
  };
  const addTeacherImage = () => {
    setIsModalOpen(true);
    setSearchParams({modal: "add-teacher-image"})
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchParams({});
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form])

  return (
      <div>
        <div className="flex gap-2 items-start justify-between md:flex-row flex-col">
          <div className="flex gap-2 items-center">
            <Button onClick={createTeacher}>Create Teacher</Button>
            <Button onClick={addTeacherImage}>Add teacher img</Button>
          </div>
          <div>
            <Form
                form={form}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="w-full flex gap-2 items-center"
            >
              <Form.Item<FieldType>
                  name="firstName"
                  rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input placeholder="First Name"/>
              </Form.Item>

              <Form.Item<FieldType>
                  name="lastName"
              >
                <Input placeholder="Last Name"/>
              </Form.Item>

              <Form.Item label={null}>
                <Button loading={filterLoading} disabled={filterLoading} type="primary" htmlType="submit">
                  <FaSearch/>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div>
          <TableTeachers data={teachers}/>
        </div>
        <Modal
            title={isCreateTeacherModal ? "Create Teacher" : "Add Teacher Image"}
            footer={null}
            forceRender={true}
            open={isModalOpen}
            onCancel={handleCancel}
            className="max-w-[400px]"
        >
          {
            isCreateTeacherModal ?
                <TeacherForm setIsModalOpen={setIsModalOpen}/> : <UploadForm setIsModalOpen={setIsModalOpen}/>
          }
        </Modal>
      </div>
  )
}
export default CreateTeachers
