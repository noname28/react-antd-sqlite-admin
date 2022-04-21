import React from "react";
import {useEffect, useState} from "react";
import { Card, Row, Table, Button } from "antd";
import { getUser, getUsers } from "./api";
import { isLoginls } from "../../utils/utils"

function Index(props) {
  const [dataSource, setDataSource] = useState([]);

  const handleSighOut=()=>{
    localStorage.removeItem("user");
    // this.props.navigate("/login");
    window.location.assign("/login");
    // console.log("Why working is here!");
  }

  const columns = [
    {
      title: "User Name",
      dataIndex: "USERNAME",
      key: "USERNAME",
    },
    {
      title: "Password",
      dataIndex: "PASSWORD",
      key: "PASSWORD",
    },
    {
      title: "First Name",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "Last Name",
      dataIndex: "SURNAME",
      key: "SURNAME",
    },
    {
      title: "Age",
      dataIndex: "AGE",
      key: "AGE",
    },
    {
      title: "Active",
      dataIndex: "ACTIVE",
      key: "ACTIVE",
    },
    {
      title: "Last Login",
      dataIndex: "LAST_LOGIN",
      key: "LAST_LOGIN",
    },
  ];
  // function loadData() {
  //   getUsers()
  //     .then((resp) => {
  //       console.log("resp: ", resp);
  //       setDataSource(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // }
  
  useEffect(() => {
    const user = isLoginls();
    if (!user) window.location.assign("/login");
    console.log("user : " ,user);
    getUsers()
      .then((resp) => {
        console.log("resp: ", resp);
        setDataSource(resp.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  

  return (
    <Card>
      <Row>
        <Button type="primary" onClick={()=>handleSighOut()}>Sign Out</Button>
      </Row>
      <Table dataSource={dataSource} id={"USERNAME"} rowKey={"USERNAME"} columns={columns} />;
    </Card>
  );
}

export default Index;
