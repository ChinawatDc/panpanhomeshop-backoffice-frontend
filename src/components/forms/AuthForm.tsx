"use client";
import type { LoginFormValues, RegisterFormValues } from "@/types/auth";
import { Button, Form, Input } from "antd";

type Props = {
  type: "login" | "register";
};

export default function AuthForm({ type }: Props) {
  // ใช้ union type เพื่อรองรับทั้ง login/register
  const onFinish = (values: LoginFormValues | RegisterFormValues) => {
    console.log("Submitted:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      {type === "register" && (
        <Form.Item
          label="ชื่อผู้ใช้"
          name="username"
          rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label="อีเมล"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "กรุณากรอกอีเมลที่ถูกต้อง",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="รหัสผ่าน"
        name="password"
        rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {type === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
        </Button>
      </Form.Item>
    </Form>
  );
}
