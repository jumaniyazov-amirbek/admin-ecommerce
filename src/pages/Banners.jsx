import React, { useState } from "react";
import { CategoryAdd, PageHeader } from "../components";
import { Button, Space, Table, Typography } from "antd";
import { urls } from "../constants/urls";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDeleteModal from "../hooks/useDeleteModal";
import { useLoad } from "../hooks/request";

function Banners() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null)
  const deleteModal = useDeleteModal();

  const {response, loading, request} = useLoad({url: urls.Products.getList})

  function closeDrower() {
    setDrawerOpen(false);
    setEditedItem(null)
  }

  function handleEdit(item){
    console.log(item)
    setEditedItem(item)
    setDrawerOpen(true)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name_uz",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Typography.Text type={status ? "success" : "danger"}>
          {status === 1 ? "ACTIVE" : "DEACTIVE"}
        </Typography.Text>
      ),
    },
    {
      title: "Actions",
      render: (item) => (
        <Space>
          <Button
          icon={<EditOutlined />}
          onClick={() =>
            handleEdit(item)
          }
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={() =>
            deleteModal(urls.categories.delete(item.id), request)
          }
        />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Banners"
        extra={
          <Button onClick={() => setDrawerOpen(true)} loading={loading}>+ Add category</Button>
        }
      />

      <Table
        dataSource={response?.Products}
        columns={columns}
        loading={loading}
        rowKey={"id"}
      />

      <CategoryAdd
        open={drawerOpen}
        onClose={closeDrower}
        fetchCategories={request}
        editedItem={editedItem}
        categories={response?.Products}
      />
    </div>
  );
}

export default Banners;
  