// import { Routes, Route } from "react-router-dom";
// import UserRoutes from "./Routes/UserRoutes";
// import AdminRoutes from "./Routes/AdminRoutes";

// const App = () => {
//   return (
//     <Routes>
//       {/* On appelle les composants de routes directement */}
//       <Route path="/*" element={<UserRoutes />} />
//       <Route path="/admin/*" element={<AdminRoutes />} />
//     </Routes>
//   );
// };

// export default App;



import { Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import ScrollToTop from './ScrollToTop'; 

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* On appelle les composants de routes directement */}
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
};

export default App;