import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { PsychologistsPage } from "./Pages/PsychologistsPage/PsychologistsPage";
import { FavoritesPage } from "./Pages/FavoritesPage/FavoritesPage";
import { Layout } from "./components/Layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./store/auth/authSlice";
import firebase from "firebase/compat/app";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  useEffect(() => {
    const auth = getAuth();
    console.log(firebase.storage);
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
        // User is signed out
        // ...
      }
    });
  }, [dispatch]);
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
