import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, message } from "antd";
import { slugify } from "../helpers/helpers";
import { urls } from "../constants/urls";
import { usePatchRequest, usePostRequest, usePutRequest } from "../hooks/request";

function BrandAdd({
  open,
  onClose,
  editedItem,
  refetch,
}) {
  const [form] = Form.useForm();
  const isEdited = editedItem !== null;

  const { request: postRequest, loading: postLoading } = usePostRequest({
    url: urls.brand.post,
  });
  const { request: putRequest, loading: putLoading } = usePutRequest();

  async function handleFinish(e) {
    let posted_data = e;

    const { success, error } = isEdited
      ? await putRequest({
          url: urls.brand.put(editedItem.id),
          data: posted_data,
        })
      : await postRequest({ data: posted_data });

    if (success) {
      message.success("Brand added");
      onClose();
      form.resetFields();
      refetch();
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    form.setFieldsValue(editedItem);
  }, [editedItem]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`${isEdited ? "Edit" : "Add"} brand modal`}
      width={800}
    >
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Row gutter={[12, 0]}>
          <Col lg={12}>
            <Form.Item label="Name uz" name="name_uz">
              <Input placeholder="Type name uz" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Name ru" name="name_ru">
              <Input placeholder="Type name ru" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col lg={12}>
            <Form.Item label="Image url" name="image">
              <Input type="url" placeholder="Paste image url" />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          loading={putLoading || postLoading}
          disabled={putLoading || postLoading}
        >
          {isEdited ? "Edit" : "Add"} brand
        </Button>
      </Form>
    </Drawer>
  );
}

export default BrandAdd;
