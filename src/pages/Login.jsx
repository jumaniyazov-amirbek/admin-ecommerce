import { Button, Card, Form, Input, Row, message } from "antd";
import React, { useContext, useState } from "react";
import Axios from "../api";
import { urls } from "../constants/urls";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const { setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (e) => {
    setLoading(true);
    Axios.post(urls.auth.login, e)
      .then((response) => {
        if (response.data.isOk) {
          setUserData({
            isAuth: true,
            tokens: {
              access: response.data.accessToken,
              refresh: response.data.refreshToken,
            },
          });
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        message.error("Error");
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <Card title="Login" className="login-page__card">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username ni to'ldirishingiz shart!",
              },
            ]}
          >
            <Input placeholder="Type username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Type password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="login-page__button"
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
