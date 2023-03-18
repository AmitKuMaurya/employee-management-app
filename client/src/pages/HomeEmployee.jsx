import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getEmployee, deleteEmployee } from "../redux/employee/employee.action";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Types from "../redux/employee/employee.action.types";
import "../styles/HomeEmployee.css";

import FilterEmployee from "../components/FilterEmployee";

const HomeEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, employees } = useSelector((state) => state.employees);
    console.log(employees);

    // error: deleteError,loading,isDeleted
    const { error: deleteError, loading, isItDeleted } = useSelector(
        (state) => state.updateAndDeleteEmployee
    );
    console.log('loading', loading);
    console.log('isDeleted', isItDeleted);

    const deleteProductHandler = (id) => {
        dispatch(deleteEmployee(id));
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
        if (deleteError) {
            alert(deleteError);
        }

        if (isItDeleted) {
            alert("Employee Data Deleted Successfully");
            dispatch({ type: Types.DELETE_EMPLOYEE_RESET });
        }
        dispatch(getEmployee());

    }, [dispatch, error, navigate, deleteError, isItDeleted]);

    // #a3a7e4

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.4
        },
        // {
        //     field: "avatar",
        //     headerName: "Avatar",
        //     minWidth: 150,
        //     flex: 0.2,
        //     // renderCell: (params) => <img src={params.getValue(params.avatar)} />
        // },
        {
            field: "username",
            headerName: "UserName",
            minWidth: 100,
            flex: 0.4,
        },
        {
            field: "email",
            headerName: "Email",
            type: "string",
            minWidth: 250,
            flex: 0.4,
        },
        {
            field: "phone",
            headerName: "Phone",
            type: "number",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "status",
            headerName: "Status",
            type: "string",
            minWidth: 100,
            flex: 0.2,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "active"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "gender",
            headerName: "Gender",
            type: "string",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "actions",
            flex: 0.2,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/update/employee/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    employees &&
        employees.forEach((item) => {
            rows.push({
                id: item._id,
                // avatar: item.avatar,
                username: item.username,
                email: item.email,
                phone: item.phone,
                gender: item.gender,
                status: item.status,
            });
        });

    return (
        <Fragment>

            <div id='header'>
                <Link to={"/create/employee"}><button className='add-employee'>Add Employee</button></Link>
                <FilterEmployee />
            </div>
            <div >
                <div className="employee_table" >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="EmployeeListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default HomeEmployee;