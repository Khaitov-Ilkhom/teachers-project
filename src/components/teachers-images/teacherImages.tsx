import {useGetTeacherImageIdList} from "../../hooks/useTeachersHook.ts";
import {Empty, Image} from "antd";

type TeacherImagesType = {
  teacherId: number | null,
}

const TeacherImages = ({teacherId}: TeacherImagesType) => {
  const imagesId: number[] = []
  const {imageIdList} = useGetTeacherImageIdList(teacherId ?? null)

  if (imageIdList) {
    for (let i = 0; i < imageIdList.length; i++) {
      imagesId.push(imageIdList[i].imgId)
    }
  }

  return (
      <>
        {
          imageIdList.length > 0 ?
              <div className="grid grid-cols-2 gap-2">
                {
                  imagesId?.map((id, index) => <div key={index}>
                    <Image className="max-w-[150px] max-h-[120px] object-cover"
                           src={`http://217.114.4.62:30300/api/v1/file/view/${id}`}/>
                  </div>)
                }
              </div> :
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
      </>
  )
}
export default TeacherImages
