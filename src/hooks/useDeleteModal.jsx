import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
import Axios from "../api";

const { confirm } = Modal;

function useDeleteModal() {

    const deleteModal = (url,refetch) => {
        confirm({
          title: "Are you sure delete this task?",
          icon: <ExclamationCircleFilled />,
          content: "Some descriptions",
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk() {
            Axios.delete(url).then((response) => {
                if(response.data.isOk){
                    message.success('Successfully deleted!')
                    refetch()
                }
            }).catch(error => console.log(error))
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      }

  return deleteModal;
}

export default useDeleteModal
