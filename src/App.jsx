import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { PsychologistsPage } from "./Pages/PsychologistsPage/PsychologistsPage";
import { FavoritesPage } from "./Pages/FavoritesPage/FavoritesPage";
import { Layout } from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./store/auth/authSlice";
import { selectUser } from "./store/auth/selectors";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("current");
          dispatch(
            setUser({
              user: {
                email: user.email,
                id: user.uid,
                name: user.displayName,
              },
              token: user.accessToken,
            })
          );
          // ...
        } else {
          toast.info("User is signed out");
          // User is signed out
          // ...
        }
      });
    }
  }, [dispatch, user]);
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* <Route path="/login" element={<LoginForm />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
