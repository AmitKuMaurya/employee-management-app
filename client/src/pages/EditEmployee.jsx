// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//     updateEmployee,getEmployeeDetails
// } from "../redux/employee/employee.action";
// import { Button } from "@material-ui/core";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import StorageIcon from "@material-ui/icons/Storage";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import * as Types from "../redux/employee/employee.action.types";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/AddEmployee.css"

// const EditEmployee = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const {id} = useParams();
//     console.log(id);
//     const { error, employee } = useSelector((state) => state.employeeDetails);
//     console.log(employee);
//     const {
//         loading,
//         error: updateError,
//         isUpdated,
//     } = useSelector((state) => state.updateAndDeleteEmployee);

//     const [username, setUserName] = useState("");
//     const [phone, setPrice] = useState("");
//     const [email, setEmail] = useState("");
//     const [avatar, setAvatar] = useState("");
//     const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
//     const [images, setImages] = useState([]);
//     const [oldImages, setOldImages] = useState([]);
//     const [imagesPreview, setImagesPreview] = useState([]);

//     const categories = [
//         "Laptop",
//         "grocery",
//         "cloths",
//         "Tops",
//         "Camera",
//         "SmartPhones",
//         "Suit",
//         "Book",
//         "Electronics",
//         "Shoes",
//         "Furniture",
//         "Music",
//     ];


//     useEffect(() => {
//         if (employee && employee._id !== id) {
//             dispatch(getEmployeeDetails(id));
//         } else {
//             setName(employee.username);
//             setDescription(employee.email);
//             setPrice(employee.status);
//             setCategory(employee.gender);
//             setStock(employee.phone);
//             setOldImages(employee.avatar);
//         }
//         if (error) {
//             alert(error);
//         }

//         if (updateError) {
//             alert(updateError);
//         }

//         if (isUpdated) {
//             alert("Product Updated Successfully");
//             // navigate("/admin/products");
//             dispatch({ type: Types.UPDATE_EMPLOYEE_RESET });
//         }
//     }, [
//         dispatch,
//         error,
//         isUpdated,
//         id,
//         employee,
//         updateError,
//         navigate
//     ]);

//     const updateProductSubmitHandler = (e) => {
//         e.preventDefault();

//         const myForm = new FormData();

//         myForm.set("name", name);
//         myForm.set("price", price);
//         myForm.set("description", description);
//         myForm.set("category", category);
//         myForm.set("stock", stock);

//         images.forEach((image) => {
//             myForm.append("images", image);
//         });
//         dispatch(updateEmployee(id,myForm));
//     };

//     const updateProductImagesChange = (e) => {
//         const files = Array.from(e.target.files);

//         setImages([]);
//         setImagesPreview([]);
//         setOldImages([]);

//         files.forEach((file) => {
//             const reader = new FileReader();

//             reader.onload = () => {
//                 if (reader.readyState === 2) {
//                     setImagesPreview((old) => [...old, reader.result]);
//                     setImages((old) => [...old, reader.result]);
//                 }
//             };

//             reader.readAsDataURL(file);
//         });
//     };

//     return (
//         <Fragment>

//             <div className="dashboard">
//                 <div className="newProductContainer">
//                     <form
//                         className="createProductForm"
//                         encType="multipart/form-data"
//                         onSubmit={updateProductSubmitHandler}
//                     >
//                         <h1>Update Employee</h1>

//                         <div>
//                             <SpellcheckIcon />
//                             <input
//                                 type="text"
//                                 placeholder="UserName"
//                                 required
//                                 value={username}
//                                 onChange={(e) => setUserName(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <AttachMoneyIcon />
//                             <input
//                                 type="number"
//                                 placeholder="Price"
//                                 required
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 value={price}
//                             />
//                         </div>

//                         <div>
//                             <DescriptionIcon />

//                             <textarea
//                                 placeholder="Product Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 cols="30"
//                                 rows="1"
//                             ></textarea>
//                         </div>

//                         <div>
//                             <AccountTreeIcon />
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                             >
//                                 <option value="">Choose Category</option>
//                                 {categories.map((cate) => (
//                                     <option key={cate} value={cate}>
//                                         {cate}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <StorageIcon />
//                             <input
//                                 type="number"
//                                 placeholder="Stock"
//                                 required
//                                 onChange={(e) => setStock(e.target.value)}
//                                 value={stock}
//                             />
//                         </div>

//                         <div id="createProductFormFile">
//                             <input
//                                 type="file"
//                                 name="avatar"
//                                 accept="image/*"
//                                 onChange={updateProductImagesChange}
//                                 multiple
//                             />
//                         </div>

//                         <div id="createProductFormImage">
//                             {/* {oldImages &&
//                                 oldImages.map((image, index) => (
//                                     <img key={index} src={image.url} alt="Old Product Preview" />
//                                 ))} */}
//                         </div>

//                         <div id="createProductFormImage">
//                             {imagesPreview.map((image, index) => (
//                                 <img key={index} src={image} alt="Product Preview" />
//                             ))}
//                         </div>

//                         <Button
//                             id="createProductBtn"
//                             type="submit"
//                             disabled={loading ? true : false}
//                         >
//                             Create
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default EditEmployee;