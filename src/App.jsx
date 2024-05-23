import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { PsychologistsPage } from "./Pages/PsychologistsPage/PsychologistsPage";
import { FavoritesPage } from "./Pages/FavoritesPage/FavoritesPage";
import { Layout } from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./store/auth/authSlice";
import { selectUser } from "./store/auth/selectors";
// import { toast } from "react-toastify";
import PrivateRoute from "./routes/PrivateRoute";
import { selectFavorites } from "./store/psychologists/selectors";
import { Loader } from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const [location, setLocation] = useState(pathname);
  const favorites = useSelector(selectFavorites);
  const [countFavorites, setCountFavorites] = useState(favorites.length);
  const [loading, setLoading] = useState(false);

  const setCount = () => {
    setCountFavorites(favorites.length);
  };

  useEffect(() => {
    setLocation(pathname);
  }, [pathname, location]);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      const auth = getAuth();
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
          setLoading(false);
        } else {
          setLoading(false);
          // toast.info("User is signed out");
        }
      });
    }
  }, [dispatch, user]);
  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/psychologists"
            element={
              <PsychologistsPage
                location={location}
                countFavorites={countFavorites}
                setCount={setCount}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage
                  location={location}
                  countFavorites={countFavorites}
                  setCount={setCount}
                />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
