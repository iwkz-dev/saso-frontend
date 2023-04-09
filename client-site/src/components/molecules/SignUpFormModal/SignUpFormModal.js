import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { submitRegister } from '../../../stores/reducers/register';

const SignUpFormModal = () => {
  const dispatch = useDispatch();

  const onFinish = values => {
    dispatch(submitRegister(values));
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form {...layout} id="sign-up" onFinish={onFinish}>
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default SignUpFormModal;
