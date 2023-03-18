import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateEmployee, getEmployeeDetails
} from "../redux/employee/employee.action";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import * as Types from "../redux/employee/employee.action.types";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/AddEmployee.css"
import FilterEmployee from "../components/FilterEmployee";
import Skeleton from "../components/Skeleton";

const EditEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, employee } = useSelector((state) => state.employeeDetails);
    console.log('employee ', employee);
    const {
        loading,
        error: updateError,
        isItUpdated,
    } = useSelector((state) => state.updateAndDeleteEmployee);

    console.log('updateError :', updateError);
    console.log('isItUpdated :', isItUpdated);

    const [username, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const ChooseGender = [
        "male",
        "female",
        "other",
    ];
    const ChooseStatus = [
        "active",
        "inactive"
    ];

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("username", username);
        myForm.set("phone", phone);
        myForm.set("email", email);
        myForm.set("gender", gender);
        myForm.set("status", status);
        myForm.set("avatar", avatar);
        dispatch(updateEmployee(id, myForm));
    };

    const updateEmployeeImagesChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (employee && employee._id !== id) {
            dispatch(getEmployeeDetails(id));
        } else {
            setUserName(employee.username);
            setPhone(employee.phone);
            setEmail(employee.email);
            setGender(employee.gender);
            setStatus(employee.status);
            setAvatarPreview(employee.avatar.url);
        }
        if (error) {
            alert(error);
        }

        if (updateError) {
            alert(updateError);
        }

        if (isItUpdated) {
            alert("Employee Updated Successfully.");
            navigate("/");
            dispatch({ type: Types.UPDATE_EMPLOYEE_RESET });
        }
    }, [dispatch, error, isItUpdated, id, employee, updateError, navigate]);

    return (
        <>
        {
            loading ? (<Skeleton/>) : (<>

                <div id='header'>
                    <Link to={"/"}><button className='add-employee'>Employee Table</button></Link>
                    <FilterEmployee />
                </div>
                <div className="newEmployeeContainer">
                    <form
                        className="createEmployeeForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Employee</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type={"text"}
                                placeholder="UserName"
                                required
                                onChange={(e) => setUserName(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type={"tel"}
                                placeholder="Phone"
                                required
                                maxLength={"10"}
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            < input
                                type={"email"}
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {ChooseGender.map((gend) => (
                                    <option key={gend} value={gend}>
                                        {gend}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Choose Status</option>
                                {ChooseStatus.map((stat) => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateEmployeeImagesChange}
                            />
                        </div>

                        <Button
                            id="createEmployeeBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
        </>)
        }
        </>
    );
};

export default EditEmployee;