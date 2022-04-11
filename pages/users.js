import { withSSRContext } from "aws-amplify";
import { listUsers } from "../src/graphql/queries";

import DataTable from "../components/dataTable";
import { useMemo } from "react";

export default function Users({ authenticated, username, items }) {

  /**
   * This is where we map our data structure and how we want to
   * display the data once it's in the react-table component
   */
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "FirstName",
          },
          {
            Header: "Last Name",
            accessor: "LastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Email",
            accessor: "Email",
          },
          {
            Header: "Created On",
            accessor: "createdAt",
          },
          {
            Header: "Last Updated On",
            accessor: "updatedAt",
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <DataTable columns={columns} data={items} />
    </>
  );
}

export async function getServerSideProps({req, res}) {
  const { Auth, API } = withSSRContext({req});
  const payload = {};

  try {
    const user = await Auth.currentAuthenticatedUser();
    
    const res = await API.graphql({
      query: listUsers,
    });

    console.log("testing something");
    console.log(res.data.listUsers.items);

    payload.props = {
      authenticated: true,
      username: user.attributes.email,
    };
  } catch (error) { // if not authenticated
    res.writeHead(302, {Location: "/"});
    res.end();
    payload.props = {
      authenticated: false,
    };
  }

  if (payload.props.authenticated) {
    try {
      const res = await API.graphql({
        query: listUsers,
      });

      payload.props.items = res.data.listUsers.items;
    } catch (error) {
      payload.props.items = error;
      console.log(error);
    }
  }
  console.log(payload);
  return payload;
}
