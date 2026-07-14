import AuthController from './AuthController'
import PaysController from './PaysController'
import PortalStatsController from './PortalStatsController'
import FaqQuestionController from './FaqQuestionController'
import ScientificResearchInnovationCentersController from './ScientificResearchInnovationCentersController'
import CentersExcellenceArtificialIntelligenceController from './CentersExcellenceArtificialIntelligenceController'
import MinistriesHigherEducationScientificResearchController from './MinistriesHigherEducationScientificResearchController'
import IndustrialPropertyPatentOfficesController from './IndustrialPropertyPatentOfficesController'
import SupportingBodiesScientificResearchController from './SupportingBodiesScientificResearchController'
import registerResearcherController from './registerResearcherController'
import registerCompanyController from './registerCompanyController'
import ResearcherController from './ResearcherController'
import CompanyController from './CompanyController'
import OfferController from './OfferController'
import AIResearcherController from './AIResearcherController'
import AICompanieController from './AICompanieController'
import Settings from './Settings'
const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
PaysController: Object.assign(PaysController, PaysController),
PortalStatsController: Object.assign(PortalStatsController, PortalStatsController),
FaqQuestionController: Object.assign(FaqQuestionController, FaqQuestionController),
ScientificResearchInnovationCentersController: Object.assign(ScientificResearchInnovationCentersController, ScientificResearchInnovationCentersController),
CentersExcellenceArtificialIntelligenceController: Object.assign(CentersExcellenceArtificialIntelligenceController, CentersExcellenceArtificialIntelligenceController),
MinistriesHigherEducationScientificResearchController: Object.assign(MinistriesHigherEducationScientificResearchController, MinistriesHigherEducationScientificResearchController),
IndustrialPropertyPatentOfficesController: Object.assign(IndustrialPropertyPatentOfficesController, IndustrialPropertyPatentOfficesController),
SupportingBodiesScientificResearchController: Object.assign(SupportingBodiesScientificResearchController, SupportingBodiesScientificResearchController),
registerResearcherController: Object.assign(registerResearcherController, registerResearcherController),
registerCompanyController: Object.assign(registerCompanyController, registerCompanyController),
ResearcherController: Object.assign(ResearcherController, ResearcherController),
CompanyController: Object.assign(CompanyController, CompanyController),
OfferController: Object.assign(OfferController, OfferController),
AIResearcherController: Object.assign(AIResearcherController, AIResearcherController),
AICompanieController: Object.assign(AICompanieController, AICompanieController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers