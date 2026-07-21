// import { Routes, Route } from "react-router-dom";
// import AdminLayout from "../Admin/AdminLayout";
// import Dashboard from "../Admin/pages/Dashboard/Dashboard";
// import ResearchersList from "../Admin/pages/Reasearchs/ResearchersList";
// import CompaniesList from "../Admin/pages/Companies/CompaniesList";
// import CompanyRequests from "../Admin/pages/Companies/CompanyRequests";
// import ManageOffers from "../Admin/pages/Offer/ManageOffers";



// const AdminRoutes = () => (
//   <Routes>
//     <Route element={<AdminLayout />}>
//       {/* <Route index element={<Dashboard />} />  */}
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="researchers" element={<ResearchersList />} />
//       <Route path="companies" element={<CompaniesList />} />
//       <Route path="companies/requests" element={<CompanyRequests />} />
//       <Route path="offers" element={<ManageOffers />} />



//     </Route>
//   </Routes>
// );

// export default AdminRoutes;













import { Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Authentification/ProtectedRoute";
import AdminLayout from "../Admin/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard/DashboardOverview";
import ResearchersList from "../Admin/pages/Reasearchs/ResearchersList";
import CompaniesList from "../Admin/pages/Companies/CompaniesList";
import CompanyRequests from "../Admin/pages/Companies/CompanyRequests";
import ManageOffers from "../Admin/pages/Offer/ManageOffers";
import ManageFaq from "../Admin/pages/Faq/ManageFaq";
import ManageResearchDatabase from "../Admin/pages/ResearchDatabase/ManageResearchDatabase";
import ManageUsers from "../Admin/pages/Users/ManageUsers";
import ManageMediaCenter from "../Admin/pages/MediaCenter/ManageMediaCenter";
import ProfilePage from "../User/pages/Profile/ProfilePage";


const AdminRoutes = () => (
  <Routes>
    {/* On protège tout le groupe admin */}
    <Route element={<ProtectedRoute allowedRoles={['superviseur']} />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> 
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="media-center/news" element={<ManageMediaCenter lockedCategory="news" />} />
        <Route path="media-center" element={<Navigate to="/admin/media-center/news" replace />} />
        <Route path="media-center/events" element={<ManageMediaCenter lockedCategory="events" />} />
        <Route path="media-center/releases" element={<ManageMediaCenter lockedCategory="releases" />} />
        <Route path="media-center/competitions" element={<ManageMediaCenter lockedCategory="competitions" />} />
        <Route path="media-center/stories" element={<ManageMediaCenter lockedCategory="stories" />} />
        <Route path="researchers" element={<ResearchersList />} />
        <Route path="research-database/research-innovation-ai" element={<ManageResearchDatabase lockedCategory="research-innovation-ai" />} />
        <Route path="research-database/universities" element={<ManageResearchDatabase lockedCategory="universities" />} />
        <Route path="research-database/incubators-technology-labs" element={<ManageResearchDatabase lockedCategory="incubators-technology-labs" />} />
        <Route path="research-database/programs-initiatives-strategies" element={<ManageResearchDatabase lockedCategory="programs-initiatives-strategies" />} />
        <Route path="research-database/industrial-property-patents" element={<ManageResearchDatabase lockedCategory="industrial-property-patents" />} />
        <Route path="research-database/experts-specialists" element={<ManageResearchDatabase lockedCategory="experts-specialists" />} />
        <Route path="research-database/supporting-bodies" element={<ManageResearchDatabase lockedCategory="supporting-bodies" />} />
        <Route path="research-database/industrial-institutions" element={<ManageResearchDatabase lockedCategory="industrial-institutions" />} />


        <Route path="companies" element={<CompaniesList />} />
        <Route path="companies/requests" element={<CompanyRequests />} />
        <Route path="offers" element={<ManageOffers />} />
        <Route path="faq" element={<ManageFaq />} />

      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
