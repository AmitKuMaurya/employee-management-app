import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewEmployee } from "../redux/employee/employee.action";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import * as Types from "../redux/employee/employee.action.types";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../styles/AddEmployee.css";
import FilterEmployee from "../components/FilterEmployee";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const { loading,error, success } = useSelector((state) => state.addEmployee);

  const [user, setUser] = useState({
    username : "",
    email : "",
    phone : ""
  });



  const { username,email, phone } = user;

  const [gender,setGender] = useState("");
  const [status,setStatus] = useState("")
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const navigate = useNavigate();

  const ChooseGender = [
    "male",
    "female",
    "other",
  ];
  const ChooseStatus = [
    "active",
    "inactive"
  ];

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if(success) {
      alert("Employee Created Successfully");
      dispatch({ type: Types.NEW_EMPLOYEE_RESET });
        navigate("/");
    }
  }, [dispatch, error, navigate, success]);


  const createEmployeeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("username", username);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("gender", gender);
    myForm.set("status", status);
    myForm.set("avatar", avatar);
    dispatch(createNewEmployee(myForm));
  };
  console.log(gender);
  console.log(status);

  const createEmployeeImagesChange = (e) => {

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  return (
    <>

      <div className="dashboard">
      
      <div id='header'>
      <Link to={"/"}><button className='add-employee'>Employee Table</button></Link>
      <FilterEmployee />
    </div>
      
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType = "multipart/form-data"
            onSubmit={createEmployeeSubmitHandler}
          >
            <h1>Add Employee</h1>

            <div>
              <SpellcheckIcon  />
              <input
                type="text"
                placeholder="UserName"
                required
                name="username"
                value={username}
                onChange={createEmployeeImagesChange}
              />
            </div>
            <div>
              <AttachMoneyIcon  />
              <input
                maxLength={"10"}
                type="tel"
                placeholder="Phone"
                name="phone"
                required
                onChange={createEmployeeImagesChange}
              />
            </div>

            <div>
              <DescriptionIcon  />

              < input
              type={"email"}
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={createEmployeeImagesChange}
              />
            </div>

            <div>
              <AccountTreeIcon  />
              <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="" >Choose Gender</option>
                {ChooseGender.map((gend) => (
                  <option key={gend} value={gend}>
                    {gend}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon  />
              <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option >Choose Employee Status</option>
                {ChooseStatus.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>

            <div id="registerImage">
            <img src={avatarPreview} alt="Avatar" />
              <input
                type={"file"}
                name="avatar"
                accept="image/*"
                onChange={createEmployeeImagesChange}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false} 
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;