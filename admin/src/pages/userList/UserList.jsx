
import './userList.css';
import { DataGrid } from '@material-ui/data-grid';         // Impoted from material-ui/data-grid to use Sortable Data Table to display users
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const UserList = () => {

    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => {return item.id != id}));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'username',
          headerName: 'User Name',
          width: 180,
          renderCell: (params) => {
              return (
                  <div className="userListUser">
                      <img src={params.row.avatar} className="userListImg"/>
                      {params.row.username}
                  </div>
              );
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
        },
        {
          field: 'transaction',
          headerName: 'Transaction Volume',
          width: 200,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)}/>
                    </>
                    
                )
            }
          },
      ];
      
      

    return (
        <div className="userList">
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={8 }
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default UserList;