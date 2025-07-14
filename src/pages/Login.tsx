import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input } from "antd";

import logoUrl from "@assets/Logo.png";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    //const api = useApi();
    const navigate = useNavigate();
    const location = useLocation();
    //const { setUser } = useUserStore();

    const from = location.state?.from
        ? `${location.state.from.pathname}${location.state.from.search || ""}`
        : "/";

    const [form] = Form.useForm<{ username: string; password: string }>();

    const validateFields = async () => {
        try {
            await form.validateFields();
            return true;
        } catch {
            return false;
        }
    };

    const save = async () => {
        try {
            const isValid = await validateFields();
            if (!isValid) return;

            const d = form.getFieldsValue();

            // Mock response instead of real API call
            // Replace this block with real api.call(() => login(d)) when ready
            const res = await new Promise<{ data: { user: any; token: string } }>((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: {
                            user: {
                                id: 1,
                                name: d.username || "Mock User",
                                role: "Employee",
                                initials: "MU",
                            },
                            token: "mocked-jwt-token-123456",
                        },
                    });
                }, 500); // simulate network delay
            });

            //setUser(res.data.user);
            localStorage.setItem("token", res.data.token);

            navigate(from, { replace: true });
        } catch (e) {
            //showError(e);
        }
    };


    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: 600,
                    background: "white",
                    padding: "80px 90px",
                    borderRadius: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 40,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 30,
                    }}
                >
                    <Image preview={false} src={logoUrl} alt="Logo" />
                    <div
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <LoginOutlined />
                        <span>T. Hasegawa Portal</span>
                    </div>
                </div>

                <Form
                    key="LoginForm"
                    preserve
                    name="LoginForm"
                    form={form}
                    layout="vertical"
                    style={{
                        width: "100%",
                        background: "#dedede22",
                        padding: "40px 80px",
                        borderRadius: 24,
                    }}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input autoFocus />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            //loading={api.isLoading}
                            onClick={save}
                            className="mt3"
                            style={{ width: "200px", float: "right" }}
                            type="primary"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
