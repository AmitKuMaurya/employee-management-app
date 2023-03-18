import * as Types from "./employee.action.types";
import axios from "axios";
// import { BASE_URL } from "../../index";

export const getEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: Types.GET_EMPLOYEE_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/employee`,
      config
    );

    dispatch({
      type: Types.GET_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Types.GET_EMPLOYEE_ERROR,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

export const getEmployeeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.GET_EMPLOYEE_DETAILED_LOADING });

    const { data } = await axios.get(
      `http://localhost:8080/api/employee/${id}`
    );

    dispatch({
      type: Types.GET_EMPLOYEE_DETAILED_SUCCESS,
      payload: data.employee,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: Types.GET_EMPLOYEE_DETAILED_ERROR,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

export const createNewEmployee = (Data) => async (dispatch) => {
  try {
    dispatch({ type: Types.NEW_EMPLOYEE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`http://localhost:8080/api/create/employee`, Data, config);

    dispatch({
      type: Types.NEW_EMPLOYEE_SUCCESS,
      payload: data.employee,
    });
  } catch (error) {
    dispatch({
      type: Types.NEW_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.DELETE_EMPLOYEE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `http://localhost:8080/api/delete/employee/${id}`,
      config
    );

     dispatch({
      type: Types.DELETE_EMPLOYEE_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.DELETE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateEmployee = (id, Data) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_EMPLOYEE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/update/employee/${id}`,
      Data,
      config
    );

    dispatch({
      type: Types.UPDATE_EMPLOYEE_SUCCESS,
      payload: data.success,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: Types.UPDATE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};
