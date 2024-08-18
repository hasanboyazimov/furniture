import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import SingleProudct from "./pages/SingleProduct.jsx";

//layouts
import RootLayout from "./layout/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage";

// componet
import Protect from "./components/Protect";
import About from "./pages/About.jsx";
import ProductsList from "./components/ProdcutList.jsx";

function App() {
  const user = true;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protect user={user}>
          <RootLayout />
        </Protect>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/products",
          element: <ProductsList />,
        },
        {
          path: `/products/:productId`,
          element: <SingleProudct />,
        },
      ],
    },
    {
      path: "/login",
      element: user,
    },
    {
      path: "/register",
      element: user,
    },
  ]);

  return <>{<RouterProvider router={routes} />}</>;
}

export default App;
