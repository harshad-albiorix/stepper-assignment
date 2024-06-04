import { BrowserRouter, Routes as BaseRoutes, Route } from "react-router-dom";
import { AddEmployee, UserList } from "./Pages";

export const Routes = () => {
  return (
    <BrowserRouter basename="/">
      <BaseRoutes>
        <Route path="/" Component={UserList} />
        <Route path="/add-employee" Component={AddEmployee} />
        <Route path="/edit-employee/:id" Component={AddEmployee} />
      </BaseRoutes>
    </BrowserRouter>
  );
};
