import { useSelector } from "react-redux";
import { selectUser } from "../store/auth/selectors";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default PrivateRoute;
