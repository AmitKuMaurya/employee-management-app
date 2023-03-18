import * as Types from "./employee.action.types";

export const employeeReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
      case Types.GET_EMPLOYEE_LOADING:
        return { loading: true, employees: [] };
  
      case Types.GET_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          employees: action.payload.employees,
        //   employeesCount: action.payload.employeesCount,
        //   resultPerPage : action.payload.resultPerPage,
        //   filteredemployeesCount: action.payload.filteredemployeesCount,
        };

  
      case Types.GET_EMPLOYEE_ERROR:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const employeeDetailsReducer = (state =  { employee: {} } , action) => {
    switch (action.type) {
      case Types.GET_EMPLOYEE_DETAILED_LOADING:
        return {  ...state,loading: true };
  
      case Types.GET_EMPLOYEE_DETAILED_SUCCESS:
        return {
          loading: false,
          employee: action.payload
        };
  
      case Types.GET_EMPLOYEE_DETAILED_ERROR:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const newEmployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
      case Types.NEW_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case Types.NEW_EMPLOYEE_SUCCESS:
        return {
          loading: false,
          employee: action.payload,
          success: action.payload,
        };
      case Types.NEW_EMPLOYEE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case Types.NEW_EMPLOYEE_RESET:
        return {
          ...state,
          success: false,
        };
        
      default:
        return state;
    }
  };
  
  export const employeeUpdateAndDeleteReducer = (state = {}, action) => {
    switch (action.type) {

      case Types.DELETE_EMPLOYEE_REQUEST:
      case Types.UPDATE_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true
        };

      case Types.DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          isItDeleted: action.payload.success,
        };
  
      case Types.UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          isItUpdated: action.payload,
        };

      case Types.DELETE_EMPLOYEE_FAIL:
      case Types.UPDATE_EMPLOYEE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case Types.DELETE_EMPLOYEE_RESET:
        return {
          ...state,
          isItDeleted: false,
        };
        
      case Types.UPDATE_EMPLOYEE_RESET:
        return {
          ...state,
          isItUpdated: false,
        };
  
      default:
        return state;
    }
  };