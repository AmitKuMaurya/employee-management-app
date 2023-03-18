import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { persistReducer,persistStore} from "redux-persist"
// import storage from "redux-persist/lib/storage";
import { employeeDetailsReducer, employeeReducer, employeeUpdateAndDeleteReducer, newEmployeeReducer } from "./employee/employee.reducer";

const rootReducer = combineReducers({
  employees : employeeReducer,
  employeeDetails : employeeDetailsReducer,
  addEmployee : newEmployeeReducer,
  updateAndDeleteEmployee : employeeUpdateAndDeleteReducer
});

// const persistConfig = {
//   key : 'persist-employee',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig,);

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// export const persistor = persistStore(store);
export default store