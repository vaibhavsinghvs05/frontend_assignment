import React, { useState, useEffect } from "react";
import { Table, Input, Space } from "antd";
import { fetchApplications } from "../services/api";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchApplications();
        setApplications(data);
        setFilteredApplications(data);
      } catch (error) {
        console.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredApplications(
      applications.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(value) ||
          app.status_En.toLowerCase().includes(value) ||
          app.studentID.toLowerCase().includes(value)
      )
    );
  };

  const columns = [
    {
      title: "Application No",
      dataIndex: "applicationNO",
      key: "applicationNO",
      sorter: (a, b) => a.applicationNO.localeCompare(b.applicationNO),
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      key: "applicationDate",
      sorter: (a, b) => new Date(a.applicationDate) - new Date(b.applicationDate),
    },
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Status (English)",
      dataIndex: "status_En",
      key: "status_En",
    },
    {
      title: "Status (Arabic)",
      dataIndex: "status_Ar",
      key: "status_Ar",
    },
    {
      title: "Last Updated",
      dataIndex: "lastDate",
      key: "lastDate",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        placeholder="Search by Applicant Name, Status, or Student ID"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredApplications}
        loading={loading}
        rowKey="applicationNO"
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
};

export default ApplicationsTable;
