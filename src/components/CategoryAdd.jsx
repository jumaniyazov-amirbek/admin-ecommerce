import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, message } from "antd";
import { slugify } from "../helpers/helpers";
import { urls } from "../constants/urls";
import { usePostRequest, usePutRequest } from "../hooks/request";

function CategoryAdd({
  open,
  onClose,
  editedItem,
  categories,
  fetchCategories,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const isEdited = editedItem !== null;

  const { request: postRequest } = usePostRequest({
    url: urls.categories.post,
  });
  const { request: putRequest } = usePutRequest();

  async function handleFinish(e) {
    let posted_data = { ...e, slug: slugify(e.name_uz) };

    const { success, error } = isEdited
      ? await putRequest({
          url: urls.categories.put(editedItem.id),
          data: posted_data,
        })
      : await postRequest({ data: posted_data });

    if (success) {
      message.success("Category added");
      onClose();
      form.resetFields();
      fetchCategories();
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
      title={`${isEdited ? "Edit" : "Add"} category modal`}
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
            <Form.Item label="Image url" name="catImage">
              <Input type="url" placeholder="Paste image url" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Parent category" name="parent_id">
              <Select>
                <Option value="0">Own</Option>
                {categories?.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name_uz}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
        >
          {isEdited ? "Edit" : "Add"} category
        </Button>
      </Form>
    </Drawer>
  );
}

export default CategoryAdd;
