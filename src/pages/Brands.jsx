import React, { useState } from 'react'
import { BrandAdd, PageHeader } from '../components';
import { Button, Image, Space, Table } from 'antd';
import useDeleteModal from '../hooks/useDeleteModal';
import { useLoad } from '../hooks/request';
import { urls } from '../constants/urls';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Brands() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null)
  const deleteModal = useDeleteModal();

  const {response, loading, request} = useLoad({url: urls.brand.getList})

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
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <Image src={img} width={100} height={100} preview={false} style={{objectFit: 'contain'}}/>
      )
    },
    {
      title: "Name",
      dataIndex: "name_uz",
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
            deleteModal(urls.brand.delete(item.id), request)
          }
        />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Brands"
        extra={
          <Button onClick={() => setDrawerOpen(true)} loading={loading}>+ Add brand</Button>
        }
      />

      <Table
        dataSource={response?.brands}
        columns={columns}
        loading={loading}
        rowKey={"id"}
      />

      <BrandAdd
        open={drawerOpen}
        onClose={closeDrower}
        refetch={request}
        editedItem={editedItem}
      />
    </div>
  );
}

export default Brands