import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography, Layout, Card } from "antd";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Feed from "./Feed";
import '../styles/Gift.css';
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const Gifts = () => {
  const PER_PAGE = 10;
  const history = useHistory()
  const [currentPage,setCurrentpage] = useState(0)
  const [data,setData] = useState([])

  useEffect(()=>{
    fetchData();

  },[])

  const fetchData = async()=>{
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    const result = await axios.get('https://bloodlagbe-api.herokuapp.com/api/v1/post/publish/1',config);
    const {data} = result.data;
    setData(data);
  }
  const handlePageClick = ({selected: selectedPage})=>{
    setCurrentpage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.slice(offset,offset+PER_PAGE)

  const pageCount = Math.ceil(data.length/PER_PAGE)
  return (
    <>
      <Content style={{marginLeft:'5px'}}>
        <Row>
          <Title level={2}>Blood Lagbe</Title>
        </Row>
        <Row gutter={[16, 16]}>
          {data.map((value,index)=>(
              <Col xs={24} sm={12} xl={6}><Feed value={value} key={index}/></Col>
          ))}
        </Row>
        <Row justify="end">
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkName={"pagination_link"}
        nextLinkName={"pagination_link"}
        disabledClassName={"pagination_link--disabled"}
        activeClassName={"pagination_link--active"}
        />
        </Row>
      </Content>
    </>
  );
};

export default Gifts;
