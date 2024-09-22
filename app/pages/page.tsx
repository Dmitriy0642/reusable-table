"use client";
import React from "react";
import { Pages } from "../api/Pages";
import Table from "../components/Table";
import { isValidDate } from "../utilities/isValidateDate";
import { formatDate } from "../utilities/formatDate";
const page = () => {
  return (
    <>
      <Table
        data={Pages}
        renderHeader={(key) => <strong>{key.toUpperCase()}</strong>}
        renderCell={(value, key) => {
          if (isValidDate(value, key)) {
            return <span>{formatDate(value)}</span>;
          }
          if (typeof value === "boolean") {
            return <span>{value ? "Active" : "Inactive"}</span>;
          }
          return <span>{value}</span>;
        }}
      />
    </>
  );
};

export default page;
