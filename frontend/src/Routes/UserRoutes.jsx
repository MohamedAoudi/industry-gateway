import { Routes, Route } from "react-router-dom";
import UserLayout from "../User/UserLayout";
import Home from '../User/pages/Home/Home';
import AboutSection from '../User/pages/About/AboutSection';
import LinkingResearchers from '../User/pages/LinkingResearchers/LinkingResearchers';
import ResearchDatabase from '../User/pages/ResearchDatabase/ResearchDatabase'; 
import WorkshopsSeminars from '../User/pages/WorkshopsSeminars/WorkshopsSeminars'; 
import LinkingResearchersCompanies from '../User/pages/LinkingResearchersCompanies/LinkingResearchersCompanies';
import CentersExcellenceAI from '../User/pages/Database/CentersExcellenceAI';
import ScientificResearchInnovationCenters from '../User/pages/Database/ScientificResearchInnovationCenters';
import MinistriesHigherEducationScientificResearch from '../User/pages/Database/MinistriesHigherEducationScientificResearch';
import MediaCenterSection from '../User/pages/MediaCenter/MediaCenterSection';
import ContactPage from '../User/pages/Contact/ContactPage';
import FaqPage from '../User/pages/Faq/FaqPage';
import ProfilePage from '../User/pages/Profile/ProfilePage';
import SiteSearchPage from '../User/pages/Search/SiteSearchPage';
import CountryDatabase from '../User/pages/CountryDatabase/CountryDatabase';
import ProtectedRoute from '../Authentification/ProtectedRoute';

import Login from '../Authentification/Login'; 
import Register from '../Authentification/Register';



const UserRoutes = () => (
  <Routes>
    <Route element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<AboutSection />} />
      <Route path="linkingresearchersindustrial" element={<LinkingResearchers />} />
      <Route path="researchDatabase" element={<ResearchDatabase />} />
      <Route path="workshopsseminars" element={<WorkshopsSeminars />} />
      <Route path="linkingresearcherscompanies" element={<LinkingResearchersCompanies />} />
      <Route path="centersExcellenceAI" element={<CentersExcellenceAI />} />
      <Route path="scientificResearchInnovationCenters" element={<ScientificResearchInnovationCenters />} />
      <Route path="ministriesHigherEducationScientificResearch" element={<MinistriesHigherEducationScientificResearch />} />
      <Route path="mediaCenter" element={<MediaCenterSection />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="search" element={<SiteSearchPage />} />
      <Route path="countryDatabase" element={<CountryDatabase />} />
      <Route element={<ProtectedRoute allowedRoles={['user', 'superviseur']} />}>
        <Route path="profile" element={<ProfilePage />} />
      </Route>



      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
);

export default UserRoutes;
