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













import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Authentification/ProtectedRoute";
import AdminLayout from "../Admin/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard/Dashboard";
import ResearchersList from "../Admin/pages/Reasearchs/ResearchersList";
import ScientificResearchInnovationCentersList from "../Admin/pages/DatabaseCenters/ScientificResearchInnovationCenters/ScientificResearchInnovationCentersList";
import ScientificResearchInnovationCentersForm from "../Admin/pages/DatabaseCenters/ScientificResearchInnovationCenters/ScientificResearchInnovationCentersForm";
import CentersExcellenceArtificialIntelligenceList from "../Admin/pages/DatabaseCenters/CentersExcellenceArtificialIntelligence/CentersExcellenceArtificialIntelligenceList";
import CentersExcellenceArtificialIntelligenceForm from "../Admin/pages/DatabaseCenters/CentersExcellenceArtificialIntelligence/CentersExcellenceArtificialIntelligenceForm";
import MinistriesHigherEducationScientificResearchList from "../Admin/pages/DatabaseCenters/MinistriesHigherEducationScientificResearch/MinistriesHigherEducationScientificResearchList";
import MinistriesHigherEducationScientificResearchForm from "../Admin/pages/DatabaseCenters/MinistriesHigherEducationScientificResearch/MinistriesHigherEducationScientificResearchForm";
import IndustrialPropertyPatentOfficesList from "../Admin/pages/DatabaseCenters/IndustrialPropertyPatentOffices/IndustrialPropertyPatentOfficesList";
import IndustrialPropertyPatentOfficesForm from "../Admin/pages/DatabaseCenters/IndustrialPropertyPatentOffices/IndustrialPropertyPatentOfficesForm";
import SupportingBodiesScientificResearchList from "../Admin/pages/DatabaseCenters/SupportingBodiesScientificResearch/SupportingBodiesScientificResearchList";
import SupportingBodiesScientificResearchForm from "../Admin/pages/DatabaseCenters/SupportingBodiesScientificResearch/SupportingBodiesScientificResearchForm";
import CompaniesList from "../Admin/pages/Companies/CompaniesList";
import CompanyRequests from "../Admin/pages/Companies/CompanyRequests";
import ManageOffers from "../Admin/pages/Offer/ManageOffers";
import ManageFaq from "../Admin/pages/Faq/ManageFaq";


const AdminRoutes = () => (
  <Routes>
    {/* On protège tout le groupe admin */}
    <Route element={<ProtectedRoute allowedRoles={['superviseur']} />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> 
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="researchers" element={<ResearchersList />} />
        <Route path="scientificResearchInnovationCentersList" element={<ScientificResearchInnovationCentersList />} />
        <Route path="scientificResearchInnovationCentersForm" element={<ScientificResearchInnovationCentersForm />} />
        <Route path="ministriesHigherEducationScientificResearchList" element={<MinistriesHigherEducationScientificResearchList />} />
        <Route path="ministriesHigherEducationScientificResearchForm" element={<MinistriesHigherEducationScientificResearchForm />} />
        <Route path="centersExcellenceArtificialIntelligenceList" element={<CentersExcellenceArtificialIntelligenceList />} />
        <Route path="centersExcellenceArtificialIntelligenceForm" element={<CentersExcellenceArtificialIntelligenceForm />} />
        <Route path="industrialPropertyPatentOfficesList" element={<IndustrialPropertyPatentOfficesList />} />
        <Route path="industrialPropertyPatentOfficesForm" element={<IndustrialPropertyPatentOfficesForm />} />
        <Route path="supportingBodiesScientificResearchList" element={<SupportingBodiesScientificResearchList />} />
        <Route path="supportingBodiesScientificResearchForm" element={<SupportingBodiesScientificResearchForm />} />


        <Route path="companies" element={<CompaniesList />} />
        <Route path="companies/requests" element={<CompanyRequests />} />
        <Route path="offers" element={<ManageOffers />} />
        <Route path="faq" element={<ManageFaq />} />

      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
