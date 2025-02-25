import {Button, message, Modal, notification, Popconfirm, Table, TableProps, Tooltip} from "antd";
import {Content} from "../../types/teachersTypes.ts";
import {FaUserEdit, FaUserMinus, FaEye} from "react-icons/fa";
import TeacherForm from "../create-teacher-form/teacherForm.tsx";
import {useState} from "react";
import {useDeleteTeacher, useEditTeacher} from "../../hooks/useTeachersHook.ts";
import {useSearchParams} from "react-router-dom";
import CopyButton from "../compy-button/copyButton.tsx";
import TeacherImages from "../teachers-images/teacherImages.tsx";

type NotificationType = 'success'

const TableTeachers = ({data}: { data: Content[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const {editTeacher, editLoading, isSuccess} = useEditTeacher()
  const {mutate: deleteTeacher} = useDeleteTeacher()
  const [searchParams, setSearchParams] = useSearchParams();
  const modalType = searchParams.get("modal");
  const isEditTeacherModal = modalType === "edit-teacher";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({message: "Successfully deleted"});
  };

  const editTeachers = (id: number) => {
    setIsModalOpen(true);
    setId(id);
    setSearchParams({modal: `edit-teacher`})
  }
  const confirmDelete = (id: number) => {
    deleteTeacher(id, {
      onSuccess: () => {
        message.success("Teacher deleted successfully!");
        openNotificationWithIcon('success');
      },
      onError: () => {
        message.error("Failed to delete teacher!");
      },
    });
  };

  const teacherImagesModal = (id: number) => {
    setIsModalOpen(true)
    setTeacherId(id);
    setSearchParams({modal: `show-teacher-images`})
  }

  const columns: TableProps<Content>['columns'] = [
    {
      title: "#",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Teacher ID",
      render: (item) => <div className="flex gap-1 items-center">
        <p id="text">{item.id}</p>
        <CopyButton text={item.id}/>
      </div>
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Degree",
      dataIndex: "degree",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Pinfl",
      dataIndex: "pinfl",
    },
    {
      title: "Action",
      render: (item) => (<div className="flex gap-2">
        <Tooltip placement="left" title={"Show teacher images"}>
          <Button onClick={() => teacherImagesModal(item.id)}><FaEye/></Button>
        </Tooltip>
        <Button onClick={() => editTeachers(item.id)}
                className="px-3 py-4 flex justify-center items-center bg-yellow-500 hover:!bg-yellow-400 hover:!border-white hover:!text-gray-500"><FaUserEdit
            size={18}/></Button>

        <Popconfirm
            title="Are you sure to delete this teacher?"
            onConfirm={() => confirmDelete(item.id)}
            okText="Yes"
            cancelText="No"
        >
          <Button
              className="px-3 py-4 flex justify-center items-center bg-red-500 hover:!bg-red-400 hover:!border-white hover:!text-gray-500">
            <FaUserMinus size={18}/>
          </Button>
        </Popconfirm>
      </div>)
    }
  ]

  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchParams({});
  };

  return (
      <div>
        {contextHolder}
        <div className="w-full overflow-x-auto">
          <Table<Content>
              columns={columns}
              dataSource={data?.map((item) => ({key: item.id, ...item}))} pagination={false}
          />
        </div>

        <Modal
            title={isEditTeacherModal ? "Edit Teacher" : "Teacher images"}
            footer={null}
            forceRender={true}
            open={isModalOpen}
            onCancel={handleCancel}
            className="max-w-[400px]"
        >
          {isEditTeacherModal ?
              <TeacherForm setIsModalOpen={setIsModalOpen} id={id} editTeacher={editTeacher}
                           editLoading={editLoading} editSuccess={isSuccess}/> :
              <TeacherImages teacherId={teacherId}/>
          }
        </Modal>
      </div>
  )
}
export default TableTeachers
