import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { register } from 'swiper/element';

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        contact: "اتصل بنا",
        search: "ابحث هنا...",
        login: "تسجيل الدخول",

        common: {
          innovation_portal: "بوابة الابتكار",
          join_network: "انضم إلى الشبكة",
          no_fees_required: "لا توجد رسوم مطلوبة",
          confirm_registration: "تأكيد التسجيل"
        },

        about_platform: {
          subtitle: "رؤية طموحة لمستقبل صناعي عربي متكامل",
          about: {
            title: "من نحن",
            description_about: " بوابة ربط الصناعة بمؤسسات البحث العلمي والابتكار",
            description_about1: " هي مبادرة",
            description_about2: " من المنظمة العربية للتنمية الصناعية والتقييس والتعدين",
            description_about3: "، لتعزيز التكامل بين القطاع الصناعي ومؤسسات البحث العلمي ومراكز الابتكار، ولتسد الفجوة بين المعرفة العلمية والتطبيق الصناعي، من خلال اعداد فضاء معرفي يوفر المعلومات ويربط بين الفاعلين في مجالات الصناعة، والتكنولوجيا، والبحث والتطوير.",
          },
          vision: {
            title: "رؤيتنا",
            description_vision: "أن تكون البوابة العربية المرجع الإقليمي الأول لربط قطاع الصناعة بمؤسسات البحث العلمي والابتكار، ومحورًا فاعلًا في دعم التحول الرقمي، وبناء منظومة عربية متكاملة للابتكار الصناعي قائمة على التعاون والشراكات الاستراتيجية بين مختلف الفاعلين.",
          },
          mission: {
            title: "رسالتنا",
            description_mission: "تعزيز تنمية تعاون المؤسسات الصناعية وتنسيقها مع مراكز البحث العلمي والابتكار والجامعات، عبر تأسيس منصة رقمية متكاملة توفر البيانات والمعارف وفرص الشراكة، وتسهل التواصل بين الفاعلين في المنظومة الابتكارية، بما يساهم في رفع تنافسية الصناعة العربية، وتسريع التحول نحو اقتصاد قائم على المعرفة المستدامة.",
          },
          goals: {
            title:"أهدافنا",
            g1: "مواكبة التحول الرقمي وتعزيز تبني التقنيات الحديثة في القطاع الصناعي العربي.",
            g2: "دعم نقل التكنولوجيا وتطوير البحث التطبيقي مع تعزيز الشراكات بين القطاعين العام والخاص في مجالات الابتكار.",
            g3: "ربط مخرجات التعليم والبحوث والتطوير بنظم الإنتاج للوحدات الصناعية وتطوير منظومة الابتكار الصناعي.",
            g4: "ربط الصناعة بمؤسسات البحث العلمي والجامعات ومراكز التميز ومراكز الذكاء الاصطناعي.",
            g5: "تعزيز التحول الرقمي للمؤسسات الصناعية والتركيز على ريادة الاعمال الرقمية والتجارة الالكترونية.",
            g6: "إنشاء قاعدة بيانات موحدة للمشاريع البحثية والابتكارات الصناعية مع اليات الربط الالكتروني بين المستثمرين ومؤسسات التمويل.",
          },
          contact: {
            title:"اتصل بنا",
            description: "نرحب بجميع الاستفسارات والمقترحات من المؤسسات الصناعية، ومراكز البحث العلمي، والجامعات، والباحثين، ورواد الابتكار.",
            info:{
              email: "id@aidsmo.org",
              phone: "+212 537274500",
              adress: "تقاطع شارع فرنسا وزنقة الخطوات ص.ب. 8019 – الأمم المتحدة – أكدال الرباط 10102 المملكة المغربية"
            }
          }
        },

        hero: {
          title: "بوابة ربط الصناعة",
          title1: "بمؤسسات البحث العلمي والابتكار",
          description:"منصة عربية متكاملة لتعزيز التعاون بين الصناعة ومؤسسات البحث العلمي والإبتكار،",
          description1:"لدعم التنمية الصناعية المستدامة والإقتصاد القائم على المعرفة.",
        },

        stats: {
          title: "البوابة في أرقام",
          subtitle: "بيانات حية تعكس منظومة البحث العلمي والابتكار في الوطن العربي",
          live_data: "بيانات مباشرة من المنصة",
          entries: "سجل",
          load_error: "تعذر تحميل الإحصائيات حاليًا",
          factories: "المصانع المسجلة",
          researchers: "الباحثين والمبتكرين",
          countries: "الدول العربية",
          solutions: "حلول تكنولوجية",
          research_innovation_ai: "مراكز البحث العلمي والإبتكار والذكاء الصناعي",
          universities_academic_institutions: "الجامعات والمؤسسات الأكاديمية والعلمية",
          incubators_technology_labs: "الحاضنات والأقطاب التكنولوجية والمختبرات",
          programs_initiatives_strategies: "البرامج والمبادرات والاستراتيجيات",
          industrial_property_patents: "مكاتب الملكية الصناعية وبراءات الإختراع",
          experts_specialists: "قاعدة الخبراء والمختصين"
        },
        
        about_sections: {
          goals: {
            subtitle: "أهدافنا الاستراتيجية",
            title: "نصيغ المستقبل بخطى ثابتة.",
            g1: "توطين المعرفة والابتكار الصناعي",
            g1_desc: "نعمل على دمج أحدث التقنيات في الصناعات المحلية لتعزيز الاكتفاء الذاتي والقدرة التنافسية العربية.",
            g2: "تحويل البحوث إلى منتجات تجارية",
            g2_desc: "ندعم رواد الأعمال والمبتكرين لتحويل الأفكار البحثية المختبرية إلى حلول صناعية ملموسة في السوق.",
            g3: "تحقيق التكامل الاقتصادي العربي",
            g3_desc: "بناء شبكة تواصل قوية بين المؤسسات البحثية والمصانع لتعزيز النمو المشترك وتبادل الخبرات التقنية."
          },
        },
        
        success_stories: {
          title: "أثرنا الملموس",
          subtitle: "مشاريع رائدة صاغت مستقبل الصناعة العربية وحولت الأبحاث إلى واقع ملموس.",
          tag: "مميزات البوابة",
          read_more: "اكتشف القصة كاملة",
          stories: {
            one: {
              title: "ثورة النانو في تحلية المياه",
              partner: "جامعة الملك سعود × شركة نقي",
              desc: "تطوير أغشية نانوية متطورة ترفع كفاءة التحلية بنسبة 40% وتقلل استهلاك الطاقة بشكل جذري."
            },
            two: {
              title: "الذكاء الاصطناعي في خطوط الإنتاج",
              partner: "المجموعة العربية للصناعة × مركز ذكاء",
              desc: "دمج أنظمة الرؤية الحاسوبية للتنبؤ بالأعطال قبل وقوعها، مما خفض تكاليف الصيانة بنسبة 30%."
            },
            three: {
              title: "الوقود الحيوي من المخلفات",
              partner: "جامعة القاضي عياض × شركة بيو-إنرجي",
              desc: "تحويل النفايات الزراعية إلى طاقة نظيفة، محققين صفر انبعاثات كربونية في المصانع المشاركة."
            }
          }
        },


        linking_researchers_page: {
          title: "جسر الابتكار بين البحث والصناعة",
          subtitle: "منصة ذكية لبناء جسور التعاون بين المعرفة الأكاديمية والتطبيق الصناعي.",
          description: "نحن لا نربط الجهات فحسب، بل نصنع بيئة متكاملة لتحويل التحديات الصناعية المعقدة إلى فرص ابتكارية تعزز السيادة التكنولوجية العربية.",
          
          sections: {
            for_researchers: {
              title: "للباحثين والعقول المبتكرة",
              point1: "تسويق الأبحاث وبراءات الاختراع للشركات الكبرى.",
              point2: "الحصول على تمويل صناعي مباشر للمشاريع التطويرية.",
              point3: "اختبار النماذج الأولية في خطوط إنتاج حقيقية.",
              point4: "الوصول إلى بيانات تقنية دقيقة من قلب المصانع."
            },
            for_industry: {
              title: "للقطاعات والشركات الصناعية",
              point1: "حل المشكلات التقنية المعقدة بخبرات أكاديمية.",
              point2: "تقليل تكاليف البحث والتطوير (R&D) عبر التعهيد الذكي.",
              point3: "استباق السوق بحلول تقنية حصرية ومبتكرة.",
              point4: "بناء شراكات مستدامة مع أفضل مراكز الأبحاث."
            }
          },

          extra: {
            db_title: "قاعدة بيانات ذكية",
            db_desc: "محرك بحث متقدم يعتمد على الذكاء الاصطناعي للمطابقة بين التخصص البحثي والاحتياج الصناعي.",
            secure_title: "حماية الملكية الفكرية",
            secure_desc: "بيئة عمل آمنة تضمن حقوق الباحث والمصنع من خلال بروتوكولات قانونية رقمية مشفرة."
          },

          process_steps: {
            title: "مسار التعاون الذكي",
            label1: "التحليل",
            step1: "تحديد الهوية الرقمية ونشر ملف الكفاءات أو التحديات.",
            label2: "المطابقة",
            step2: "خوارزميات ذكية تقترح أفضل شريك بناءً على الجدارة التقنية.",
            label3: "التنفيذ",
            step3: "توقيع اتفاقيات التعاون وبدء مرحلة التطوير المشترك."
          }
        },

        menu: {
          home: "الرئيسية",
          about: "من نحن",
          services: "خدمات البوابة",
          database: "قاعدة البيانات",
          media_center: "المركز الإعلامي",
          communication_cooperation: "التواصل والتعاون",
          contact: "اتصل بنا",
          login: "تسجيل الدخول", 
          register: "إنشاء حساب", 
          profile: "الملف الشخصي",
          logout: "تسجيل الخروج"
        },

        companies: {
          industrial_companies: "الشركات الصناعية",
          business_directory: "دليل الشركات",
          applications_to_join: "طلبات الانضمام"
        },

        footer: {
          download_app: "تحميل التطبيق",
          support: "الدعم والمساعدة",
          actions: "روابط سريعة",
          sitemap: "خريطة الموقع",
          social_media: "وسائل التواصل",
          customer_service: "خدمة العملاء",
          faq: "الأسئلة الأكثر شيوعاً",
          add_request: "أضف طلبك",
          add_factory: "أضف مصنعك",
          add_ad: "أضف إعلانك",
          login: "تسجيل الدخول",
          rights_reserved: "جميع الحقوق محفوظة للمنظمة العربية للتنمية الصناعية والتقييس والتعدين",
          privacy: "سياسة الخصوصية",
          terms: "شروط الاستخدام",
          email_us: "راسلنا عبر البريد",
          call_us: "اتصل بنا هاتفياً",
          location: "الموقع الجغرافي",
          site:"الموقع الرسمي",
          need_help: "هل تحتاج إلى مساعدة؟",
          open_ticket: "فتح تذكرة دعم",
          description: "نعمل على تعزيز التكامل الصناعي العربي من خلال ربط مراكز البحث العلمي بالمنشآت الصناعية."
        },

        submenu: {
          services: {
            linking_researchers_industrial_companies: "ربط الباحثين مع الشركات الصناعية",
            database_research_technologies_available_industrial_application: "قاعدة بيانات للأبحاث والتقنيات",
            joint_workshops_seminars: "ورش عمل وندوات مشتركة",
            supporting_marketing_investment_scientific_research_outputs: "تسويق مخرجات البحث العلمي",
            technical_details_how_use_services: "كيفية استخدام الخدمات",
            subscription_prices_terms: "أسعار وشروط الاشتراك",
            success_stories_from_portal_users: "قصص نجاح المستخدمين"
          },
          database: {
            scientific_research_innovation_centers: "مراكز البحث العلمي و الإبتكار",
            centers_excellence_artificial_intelligence: "مراكز التميز والذكاء الإصطناعي",
            ministries_higher_education_scientific_research: "وزارات التعليم العالي والبحث العلمي",
            industrial_property_patent_offices: "مكاتب الملكية الصناعية وبراءات الإختراع",
            supporting_bodies_scientific_research: "الجهات الداعمة للبحث العلمي",
            research_innovation_ai_centers: "مراكز البحث العلمي والإبتكار والذكاء الصناعي",
            universities_academic_scientific_institutions: "الجامعات والمؤسسات الأكاديمية والعلمية",
            incubators_technology_poles_laboratories: "الحاضنات والأقطاب التكنولوجية والمختبرات",
            programs_initiatives_strategies: "البرامج والمبادرات والاستراتيجيات",
            experts_specialists_database: "قاعدة الخبراء والمختصين",
          },
          media_center: {
            news: "أخبار",
            events: "فعاليات",
            releases: 'اصدارات',
            competitions_prizes: "مسابقات وجوائز",
            success_stories: "قصص نجاح",
          },
          communication_cooperation: {
            direct_communication_between_researchers_manufacturers: "تواصل مباشر",
            discussion_exchange_ideas: "تبادل الافكار",
            joint_work_teams: "فرق عمل مشتركة"
          },
        },
        sub_submenu: {
          scientific_research_database: {
            advanced_search_engine: "محرك بحث متقدم للأبحاث",
            classifying_research_industry_field: "تصنيف حسب المجال الصناعي",
            download_summaries_research_files: "تحميل ملخصات الأبحاث",
          },
          industry_database: {
            participating_companies_industrial_institutions: "المؤسسات الصناعية المشاركة",
            industry_needs_research_technological_solutions: "احتياجات الصناعة التقنية",
            availabl_opportunities_cooperation_partnership: "فرص الشراكة المتاحة",
          }
        }
      }
    },

    en: {
      translation: {
        contact: "Contact Us",
        search: "Search...",
        login: "Login",

        common: {
          innovation_portal: "Innovation Portal",
          join_network: "Join the Network",
          no_fees_required: "No fees required",
          confirm_registration: "Confirm Registration"
        },

        // --- About Page Section ---
        about_platform: {
          title: "About Us",
          subtitle: "An Ambitious Vision for an Integrated Arab Industrial Future",
          description_platform: "The Industry-to-Research and Innovation Portal is an initiative of the Arab Industrial Development, Standardization and Mining Organization (AIDMO) to enhance integration between the industrial sector and scientific research institutions and innovation centers, and to bridge the gap between scientific knowledge and industrial application. This is achieved by creating a knowledge space that provides information and connects stakeholders in the fields of industry, technology, and research and development.",
          description_vision: "To be the leading regional reference for linking the industrial sector with scientific research and innovation institutions, and an active hub for supporting digital transformation and building an integrated Arab system for industrial innovation based on cooperation and strategic partnerships among various stakeholders.",
          description_mission: "To promote the development and coordination of cooperation between industrial institutions and scientific research and innovation centers and universities, through the establishment of an integrated digital platform that provides data, knowledge, and partnership opportunities, and facilitates communication among stakeholders in the innovation ecosystem. This contributes to enhancing the competitiveness of Arab industry and accelerating the transition towards a sustainable knowledge-based economy.",
          goals: {
            g1: "Keeping pace with digital transformation and promoting the adoption of modern technologies in the Arab industrial sector.",
            g2: "Supporting technology transfer and developing applied research while strengthening public-private partnerships in innovation.",
            g3: "Linking education, research, and development outputs to industrial production systems and developing the industrial innovation ecosystem.",
            g4: "Connecting industry with scientific research institutions, universities, centers of excellence, and artificial intelligence centers.",
            g5: "Promoting the digital transformation of industrial institutions and focusing on digital entrepreneurship and e-commerce.",
            g6: "Establishing a unified database for research projects and industrial innovations with electronic linking mechanisms between investors and funding institutions.",
          },
          contact: {
            title: "Contact Us",
            description: "We welcome all inquiries and suggestions from industrial institutions, scientific research centers, universities, researchers, and innovation leaders.",
            info:{
              email: "id@aidsmo.org",
              phone: "+212 537274500",
              address: "Intersection of France Street and Steps Alley, P.O. Box 8019 – United Nations – Agdal, Rabat 10102, Kingdom of Morocco",
            }
          }
        },

        hero: {
          title: "A gateway connecting industry",
          title1: " with research and innovation institutions.",
          description:"An integrated Arab platform to enhance cooperation between industry and scientific research and innovation institutions,",
          description1:"to support sustainable industrial development and a knowledge-based economy.",
        },

        stats: {
          title: "Portal in Numbers",
          subtitle: "Live data reflecting the scientific research and innovation ecosystem across the Arab world",
          live_data: "Live platform data",
          entries: "records",
          load_error: "Statistics are temporarily unavailable",
          factories: "Registered Factories",
          researchers: "Researchers & Innovators",
          countries: "Arab Countries",
          solutions: "Tech Solutions",
          research_innovation_ai: "Scientific Research, Innovation and AI Centers",
          universities_academic_institutions: "Universities and Academic and Scientific Institutions",
          incubators_technology_labs: "Incubators, Technology Poles and Laboratories",
          programs_initiatives_strategies: "Programs, Initiatives and Strategies",
          industrial_property_patents: "Industrial Property and Patent Offices",
          experts_specialists: "Experts and Specialists Database"
        },
        about_sections: {
          goals: {
            subtitle: "Our Strategic Goals",
            title: "We are shaping the future with steady steps.",
            g1: "Localizing Knowledge & Innovation",
            g1_desc: "Integrating the latest technologies into local industries to enhance self-sufficiency and Arab competitiveness.",
            g2: "Commercializing Scientific Research",
            g2_desc: "Supporting entrepreneurs to transform lab research into tangible industrial solutions in the market.",
            g3: "Achieving Arab Economic Integration",
            g3_desc: "Building a strong network between research institutions and factories for joint growth and tech exchange."
          }
        },
        success_stories: {
          title: "Visible Impact",
          subtitle: "Pioneering projects that bridged the gap between lab research and industrial reality.",
          tag: "Achievement Lab",
          read_more: "Explore Full Story",
          stories: {
            one: {
              title: "Nano-Tech Water Desalination",
              partner: "KSU × Naqi Company",
              desc: "Developing advanced nano-membranes increasing efficiency by 40% while drastically cutting energy costs."
            },
            two: {
              title: "AI in Production Lines",
              partner: "Arab Industrial Group × Thakaa Center",
              desc: "Computer vision systems predicting failures, reducing maintenance costs by 30%."
            },
            three: {
              title: "Biofuel from Waste",
              partner: "UCA × Bio-Energy Corp",
              desc: "Converting agricultural waste into clean energy, achieving zero carbon emissions."
            }
          }
        },

        linking_researchers_page: {
          title: "The Innovation Bridge",
          subtitle: "A smart platform bridging academic knowledge and industrial application.",
          description: "We don't just connect parties; we create an ecosystem to transform complex industrial challenges into innovation opportunities.",
          
          sections: {
            for_researchers: {
              title: "For Researchers & Innovators",
              point1: "Market research and patents to major corporations.",
              point2: "Access direct industrial funding for dev projects.",
              point3: "Test prototypes in real production environments.",
              point4: "Access precise technical data from industrial cores."
            },
            for_industry: {
              title: "For Industrial Sectors",
              point1: "Solve complex technical issues with academic expertise.",
              point2: "Reduce R&D costs through smart outsourcing.",
              point3: "Stay ahead with exclusive innovative solutions.",
              point4: "Build sustainable partnerships with top research centers."
            }
          },

          extra: {
            db_title: "Smart Database",
            db_desc: "AI-driven search engine matching research expertise with industrial needs.",
            secure_title: "IP Protection",
            secure_desc: "Secure environment guaranteeing IP rights through encrypted digital protocols."
          },

          process_steps: {
            title: "Smart Collaboration Path",
            label1: "Analysis",
            step1: "Define digital identity and post expertise or challenges.",
            label2: "Matching",
            step2: "Smart algorithms suggest the best partner based on merit.",
            label3: "Execution",
            step3: "Sign collaboration agreements and start joint development."
          }
        },

        menu: {
          home: "Home",
          about: "About Us",
          services: "Services",
          database: "Database",
          media_center: "Media Center",
          communication_cooperation: "Cooperation",
          contact: "Contact Us",
          login: "Login", 
          register: "Register",
          profile: "Profile",
          logout: "Logout"
        },

        footer: {
          download_app: "Download App",
          support: "Support & Help",
          actions: "Quick Links",
          sitemap: "Sitemap",
          social_media: "Social Media",
          customer_service: "Customer Service",
          faq: "FAQ",
          add_request: "Add Request",
          add_factory: "Add Factory",
          add_ad: "Add Ad",
          login: "Login",
          rights_reserved: "All rights reserved to AIDSMO",
          privacy: "Privacy Policy",
          terms: "Terms of Use",
          email_us: "Email Us",
          call_us: "Call Us",
          location: "Location",
          site:"Official Site",
          need_help: "Need Help?",
          open_ticket: "Open Support Ticket",
          description: "Enhancing Arab industrial integration by linking research centers with industry."
        },

        submenu: {
          services: {
            linking_researchers_industrial_companies: "Linking Researchers with Industry",
            database_research_technologies_available_industrial_application: "Tech & Research Database",
            joint_workshops_seminars: "Workshops & Seminars",
            supporting_marketing_investment_scientific_research_outputs: "Marketing Research Outputs",
            technical_details_how_use_services: "How to Use Services",
            subscription_prices_terms: "Pricing & Terms",
            success_stories_from_portal_users: "Success Stories"
          },
          // database: {
          //   scientific_research_database: "Scientific Research DB",
          //   industry_database: "Industry DB",
          // },
          database: {
            scientific_research_innovation_centers: "Scientific research and innovation centers",
            centers_excellence_artificial_intelligence: "Centers of Excellence and Artificial Intelligence",
            ministries_higher_education_scientific_research: "Ministries of Higher Education and Scientific Research",
            industrial_property_patent_offices: "Industrial Property and Patent Offices",
            supporting_bodies_scientific_research: "Supporting bodies for scientific research",
            research_innovation_ai_centers: "Scientific Research, Innovation and AI Centers",
            universities_academic_scientific_institutions: "Universities and Academic and Scientific Institutions",
            incubators_technology_poles_laboratories: "Incubators, Technology Poles and Laboratories",
            programs_initiatives_strategies: "Programs, Initiatives and Strategies",
            experts_specialists_database: "Experts and Specialists Database",

          },
          media_center: {
            news: "News",
            events: "Events",
            releases: 'Releases',
            competitions_prizes: "Competitions and Prizes",
            success_stories: "Success Stories",
          },
          communication_cooperation: {
            direct_communication_between_researchers_manufacturers: "Direct Communication",
            discussion_exchange_ideas: "Ideas Exchange",
            joint_work_teams: "Joint Work Teams"
          },
        },
        sub_submenu: {
          scientific_research_database: {
            advanced_search_engine: "Advanced Search Engine",
            classifying_research_industry_field: "Classification by Industry",
            download_summaries_research_files: "Download Summaries",
          },
          industry_database: {
            participating_companies_industrial_institutions: "Participating Companies",
            industry_needs_research_technological_solutions: "Industry Needs",
            availabl_opportunities_cooperation_partnership: "Partnership Opportunities",
          }
        }
      }
    }
  },
  lng: "ar",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
})

export default i18n;








