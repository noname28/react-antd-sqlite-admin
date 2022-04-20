import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col,Layout } from 'antd';
import { getUser,checkUser } from  './login_api';
import {Loginls} from './../../utils/utils';

function Login(props) {
    // const [dataSource, setDataSource] = useState([]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        checkUser(values.username, values.password).then(resp => {
            
            // setDataSource(resp.results);
            // localStorage.setItem("user",JSON.stringify(resp.data[0]));
            Loginls(resp.data[0]);
            console.log("JSON.stringify(resp.data[0])",JSON.stringify(resp.data[0]));
            // this.props.location("/");
            window.location.assign("/index");
            // const initialValue = JSON.parse(saved);
        }).catch(err => console.log("err: ", err))

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className="site-layout">
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={4} >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </Layout>
    );

}

export default Login;