import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

import { Form } from "react-bootstrap";

//
import 'regenerator-runtime/runtime';

export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Form className="searchBar">
      <Form.Control
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`search ${count} records`}
      />
    </Form>
  );
}
