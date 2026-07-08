// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'

// i18n.use(initReactI18next).init({
//   resources: {
//     ar: {
//       translation: {
//         contact: "اتصل بنا",
//         search: "ابحث هنا...",
//         login: "تسجيل الدخول",

//         hero: {
//           badge: "بوابة ايدسمو المميزة",
//           watch_video: "شاهد الفيديو",
//           slides: {
//             one: {
//               title: "ابتكار صناعي مستدام",
//               subtitle: "نربط العقول البحثية بالفرص الصناعية لبناء مستقبل عربي متطور.",
//               action: "استكشف الخدمات"
//             },
//             two: {
//               title: "قاعدة بيانات متكاملة",
//               subtitle: "أكبر منصة عربية تجمع بين احتياجات المصانع وابتكارات الباحثين.",
//               action: "ابدأ البحث الآن"
//             }
//           }
//         },

//         stats: {
//           title: "البوابة في أرقام",
//           factories: "المصانع المسجلة",
//           researchers: "الباحثين والمبتكرين",
//           countries: "الدول العربية",
//           solutions: "حلول تكنولوجية"
//         },
        
//         about_sections: {
//           goals: {
//             subtitle: "أهدافنا الاستراتيجية",
//             title: "نصيغ المستقبل بخطى ثابتة.",
//             g1: "توطين المعرفة والابتكار الصناعي",
//             g1_desc: "نعمل على دمج أحدث التقنيات في الصناعات المحلية لتعزيز الاكتفاء الذاتي والقدرة التنافسية العربية.",
//             g2: "تحويل البحوث إلى منتجات تجارية",
//             g2_desc: "ندعم رواد الأعمال والمبتكرين لتحويل الأفكار البحثية المختبرية إلى حلول صناعية ملموسة في السوق.",
//             g3: "تحقيق التكامل الاقتصادي العربي",
//             g3_desc: "بناء شبكة تواصل قوية بين المؤسسات البحثية والمصانع لتعزيز النمو المشترك وتبادل الخبرات التقنية."
//           }
//         },
        
//         success_stories: {
//           title: "أثرنا الملموس",
//           subtitle: "مشاريع رائدة صاغت مستقبل الصناعة العربية وحولت الأبحاث إلى واقع ملموس.",
//           tag: "مميزات البوابة",
//           read_more: "اكتشف القصة كاملة",
//           stories: {
//             one: {
//               title: "ثورة النانو في تحلية المياه",
//               partner: "جامعة الملك سعود × شركة نقي",
//               desc: "تطوير أغشية نانوية متطورة ترفع كفاءة التحلية بنسبة 40% وتقلل استهلاك الطاقة بشكل جذري."
//             },
//             two: {
//               title: "الذكاء الاصطناعي في خطوط الإنتاج",
//               partner: "المجموعة العربية للصناعة × مركز ذكاء",
//               desc: "دمج أنظمة الرؤية الحاسوبية للتنبؤ بالأعطال قبل وقوعها، مما خفض تكاليف الصيانة بنسبة 30%."
//             },
//             three: {
//               title: "الوقود الحيوي من المخلفات",
//               partner: "جامعة القاضي عياض × شركة بيو-إنرجي",
//               desc: "تحويل النفايات الزراعية إلى طاقة نظيفة، محققين صفر انبعاثات كربونية في المصانع المشاركة."
//             }
//           }
//         },

//         menu: {
//           home: "الرئيسية",
//           about: "من نحن",
//           services: "خدمات البوابة",
//           database: "قاعدة البيانات",
//           news: "أخبار و فعاليات",
//           communication_cooperation: "التواصل والتعاون",
//           contact: "اتصل بنا"
//         },

//         footer: {
//           download_app: "تحميل التطبيق",
//           support: "الدعم والمساعدة",
//           actions: "روابط سريعة",
//           sitemap: "خريطة الموقع",
//           social_media: "وسائل التواصل",
//           customer_service: "خدمة العملاء",
//           faq: "الأسئلة الأكثر شيوعاً",
//           add_request: "أضف طلبك",
//           add_factory: "أضف مصنعك",
//           add_ad: "أضف إعلانك",
//           login: "تسجيل الدخول",
//           rights_reserved: "جميع الحقوق محفوظة للمنظمة العربية للتنمية الصناعية والتقييس والتعدين",
//           privacy: "سياسة الخصوصية",
//           terms: "شروط الاستخدام",
//           email_us: "راسلنا عبر البريد",
//           call_us: "اتصل بنا هاتفياً",
//           location: "الموقع الجغرافي",
//           need_help: "هل تحتاج إلى مساعدة؟",
//           open_ticket: "فتح تذكرة دعم",
//           description: "نعمل على تعزيز التكامل الصناعي العربي من خلال ربط مراكز البحث العلمي بالمنشآت الصناعية."
//         },

//         submenu: {
//           services: {
//             linking_researchers_industrial_companies: "ربط الباحثين مع الشركات الصناعية",
//             database_research_technologies_available_industrial_application: "قاعدة بيانات للأبحاث والتقنيات",
//             joint_workshops_seminars: "ورش عمل وندوات مشتركة",
//             supporting_marketing_investment_scientific_research_outputs: "تسويق مخرجات البحث العلمي",
//             technical_details_how_use_services: "كيفية استخدام الخدمات",
//             subscription_prices_terms: "أسعار وشروط الاشتراك",
//             success_stories_from_portal_users: "قصص نجاح المستخدمين"
//           },
//           database: {
//             scientific_research_database: "قاعدة بيانات البحث العلمي",
//             industry_database: "قاعدة بيانات الصناعة",
//           },
//           news: {
//             regular_updates_workshops: "تحديثات ورش العمل",
//             articles_analyses: "مقالات و تحليلات",
//           },
//           communication_cooperation: {
//             direct_communication_between_researchers_manufacturers: "تواصل مباشر",
//             discussion_exchange_ideas: "تبادل الافكار",
//             joint_work_teams: "فرق عمل مشتركة"
//           },
//         },
//         sub_submenu: {
//           scientific_research_database: {
//             advanced_search_engine: "محرك بحث متقدم للأبحاث",
//             classifying_research_industry_field: "تصنيف حسب المجال الصناعي",
//             download_summaries_research_files: "تحميل ملخصات الأبحاث",
//           },
//           industry_database: {
//             participating_companies_industrial_institutions: "المؤسسات الصناعية المشاركة",
//             industry_needs_research_technological_solutions: "احتياجات الصناعة التقنية",
//             availabl_opportunities_cooperation_partnership: "فرص الشراكة المتاحة",
//           }
//         }
//       }
//     },

//     en: {
//       translation: {
//         contact: "Contact Us",
//         search: "Search...",
//         login: "Login",

//         // --- Hero Section ---
//         hero: {
//           badge: "AIDSMO Premium Portal",
//           watch_video: "Watch Video",
//           slides: {
//             one: {
//               title: "Sustainable Industrial Innovation",
//               subtitle: "Connecting research minds with industrial opportunities for a developed Arab future.",
//               action: "Explore Services"
//             },
//             two: {
//               title: "Integrated Database",
//               subtitle: "The largest Arab platform combining factory needs with researcher innovations.",
//               action: "Start Searching Now"
//             }
//           }
//         },

//         // --- Stats ---
//         stats: {
//           title: "Portal in Numbers",
//           factories: "Registered Factories",
//           researchers: "Researchers & Innovators",
//           countries: "Arab Countries",
//           solutions: "Tech Solutions"
//         },
//         about_sections: {
//           goals: {
//             subtitle: "Our Strategic Goals",
//             title: "We are shaping the future with steady steps.",
//             g1: "Localizing Knowledge & Innovation",
//             g1_desc: "Integrating the latest technologies into local industries to enhance self-sufficiency and Arab competitiveness.",
//             g2: "Commercializing Scientific Research",
//             g2_desc: "Supporting entrepreneurs to transform lab research into tangible industrial solutions in the market.",
//             g3: "Achieving Arab Economic Integration",
//             g3_desc: "Building a strong network between research institutions and factories for joint growth and tech exchange."
//           }
//         },
//         // --- Success Stories (Kinetic 3D Edition) ---
//         success_stories: {
//           title: "Visible Impact",
//           subtitle: "Pioneering projects that bridged the gap between lab research and industrial reality.",
//           tag: "Achievement Lab",
//           read_more: "Explore Full Story",
//           stories: {
//             one: {
//               title: "Nano-Tech Water Desalination",
//               partner: "KSU × Naqi Company",
//               desc: "Developing advanced nano-membranes increasing efficiency by 40% while drastically cutting energy costs."
//             },
//             two: {
//               title: "AI in Production Lines",
//               partner: "Arab Industrial Group × Thakaa Center",
//               desc: "Computer vision systems predicting failures, reducing maintenance costs by 30%."
//             },
//             three: {
//               title: "Biofuel from Waste",
//               partner: "UCA × Bio-Energy Corp",
//               desc: "Converting agricultural waste into clean energy, achieving zero carbon emissions."
//             }
//           }
//         },

//         menu: {
//           home: "Home",
//           about: "About Us",
//           services: "Services",
//           database: "Database",
//           news: "News & Events",
//           communication_cooperation: "Cooperation",
//           contact: "Contact Us"
//         },

//         footer: {
//           download_app: "Download App",
//           support: "Support & Help",
//           actions: "Quick Links",
//           sitemap: "Sitemap",
//           social_media: "Social Media",
//           customer_service: "Customer Service",
//           faq: "FAQ",
//           add_request: "Add Request",
//           add_factory: "Add Factory",
//           add_ad: "Add Ad",
//           login: "Login",
//           rights_reserved: "All rights reserved to AIDSMO",
//           privacy: "Privacy Policy",
//           terms: "Terms of Use",
//           email_us: "Email Us",
//           call_us: "Call Us",
//           location: "Location",
//           need_help: "Need Help?",
//           open_ticket: "Open Support Ticket",
//           description: "Enhancing Arab industrial integration by linking research centers with industry."
//         },

//         submenu: {
//           services: {
//             linking_researchers_industrial_companies: "Linking Researchers with Industry",
//             database_research_technologies_available_industrial_application: "Tech & Research Database",
//             joint_workshops_seminars: "Workshops & Seminars",
//             supporting_marketing_investment_scientific_research_outputs: "Marketing Research Outputs",
//             technical_details_how_use_services: "How to Use Services",
//             subscription_prices_terms: "Pricing & Terms",
//             success_stories_from_portal_users: "Success Stories"
//           },
//           database: {
//             scientific_research_database: "Scientific Research DB",
//             industry_database: "Industry DB",
//           },
//           news: {
//             regular_updates_workshops: "Regular Updates",
//             articles_analyses: "Articles & Analyses",
//           },
//           communication_cooperation: {
//             direct_communication_between_researchers_manufacturers: "Direct Communication",
//             discussion_exchange_ideas: "Ideas Exchange",
//             joint_work_teams: "Joint Work Teams"
//           },
//         },
//         sub_submenu: {
//           scientific_research_database: {
//             advanced_search_engine: "Advanced Search Engine",
//             classifying_research_industry_field: "Classification by Industry",
//             download_summaries_research_files: "Download Summaries",
//           },
//           industry_database: {
//             participating_companies_industrial_institutions: "Participating Companies",
//             industry_needs_research_technological_solutions: "Industry Needs",
//             availabl_opportunities_cooperation_partnership: "Partnership Opportunities",
//           }
//         }
//       }
//     }
//   },
//   lng: "ar",
//   fallbackLng: "en",
//   interpolation: { escapeValue: false }
// })

// export default i18n;



















import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        contact: "اتصل بنا",
        search: "ابحث هنا...",
        login: "تسجيل الدخول",

        // --- About Page Section ---
        about_page: {
          main_title: "عن البوابة",
          vision_title: "رؤيتنا ورسالتنا",
          description_p1: "في ظل التطورات التكنولوجية والتحول الكبير نحو الاقتصاد القائم على المعرفة، تأتي هذه البوابة كضرورة استراتيجية لتحقيق التنمية الصناعية الشاملة والمستدامة في العالم العربي.",
          description_p2: "نعمل على تعزيز الروابط والشراكات بين مؤسسات البحث العلمي وقطاع الصناعة، لتسهيل نقل التكنولوجيا وتطوير المعرفة واكتشاف حلول ابتكارية تلبي احتياجات السوق.",
          why_us: "لماذا البوابة؟",
          features: {
            f1: "ربط البحث العلمي بالصناعة كخيار استراتيجي لا غنى عنه.",
            f2: "تحويل الاكتشافات البحثية إلى منتجات صناعية قابلة للاستثمار.",
            f3: "بناء علاقة تكاملية بين المبتكرين والوحدات الإنتاجية العربية."
          }
        },

        hero: {
          badge: "بوابة ايدسمو المميزة",
          watch_video: "شاهد الفيديو",
          slides: {
            one: {
              title: "ابتكار صناعي مستدام",
              subtitle: "نربط العقول البحثية بالفرص الصناعية لبناء مستقبل عربي متطور.",
              action: "استكشف الخدمات"
            },
            two: {
              title: "قاعدة بيانات متكاملة",
              subtitle: "أكبر منصة عربية تجمع بين احتياجات المصانع وابتكارات الباحثين.",
              action: "ابدأ البحث الآن"
            }
          }
        },

        stats: {
          title: "البوابة في أرقام",
          factories: "المصانع المسجلة",
          researchers: "الباحثين والمبتكرين",
          countries: "الدول العربية",
          solutions: "حلول تكنولوجية"
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
          }
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

        // --- New Section: Linking Researchers & Industry ---
        linking_researchers_page: {
          title: "ربط الباحثين مع الشركات الصناعية",
          subtitle: "منصة ذكية لبناء جسور التعاون بين المعرفة الأكاديمية والتطبيق الصناعي.",
          description: "تتيح هذه الخدمة للشركات الصناعية طرح تحدياتها التقنية، وللباحثين تقديم حلولهم المبتكرة، مما يسرع عجلة التطوير الصناعي العربي.",
          
          sections: {
            for_researchers: {
              title: "للـباحـثين",
              point1: "عرض المشاريع البحثية القابلة للتطبيق.",
              point2: "الوصول إلى تمويل صناعي للأبحاث.",
              point3: "اختبار الابتكارات في بيئة تصنيع حقيقية."
            },
            for_industry: {
              title: "للـشركات الصناعية",
              point1: "إيجاد حلول علمية للمشاكل التقنية.",
              point2: "خفض تكاليف البحث والتطوير (R&D).",
              point3: "استقطاب أفضل الكفاءات العلمية العربية."
            }
          },

          process_steps: {
            title: "كيفية العمل",
            step1: "التسجيل وتحديد الهوية (باحث أو مصنع).",
            step2: "نشر التحدي الصناعي أو المشروع البحثي.",
            step3: "المطابقة الذكية بين الطرفين وبدء التعاون."
          }
        },

        menu: {
          home: "الرئيسية",
          about: "من نحن",
          services: "خدمات البوابة",
          database: "قاعدة البيانات",
          news: "أخبار و فعاليات",
          communication_cooperation: "التواصل والتعاون",
          contact: "اتصل بنا"
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
            scientific_research_database: "قاعدة بيانات البحث العلمي",
            industry_database: "قاعدة بيانات الصناعة",
          },
          news: {
            regular_updates_workshops: "تحديثات ورش العمل",
            articles_analyses: "مقالات و تحليلات",
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

        // --- About Page Section ---
        about_page: {
          main_title: "About the Portal",
          vision_title: "Our Vision & Mission",
          description_p1: "In light of technological developments and the shift toward a knowledge-based economy, this portal emerges as a strategic necessity for comprehensive and sustainable industrial development in the Arab world.",
          description_p2: "We aim to strengthen links between scientific research institutions and the industrial sector, facilitating technology transfer and discovering innovative solutions for the market.",
          why_us: "Why the Portal?",
          features: {
            f1: "Linking scientific research with industry as an indispensable strategic choice.",
            f2: "Transforming research discoveries into marketable industrial products.",
            f3: "Building an integrative relationship between innovators and Arab production units."
          }
        },

        hero: {
          badge: "AIDSMO Premium Portal",
          watch_video: "Watch Video",
          slides: {
            one: {
              title: "Sustainable Industrial Innovation",
              subtitle: "Connecting research minds with industrial opportunities for a developed Arab future.",
              action: "Explore Services"
            },
            two: {
              title: "Integrated Database",
              subtitle: "The largest Arab platform combining factory needs with researcher innovations.",
              action: "Start Searching Now"
            }
          }
        },

        stats: {
          title: "Portal in Numbers",
          factories: "Registered Factories",
          researchers: "Researchers & Innovators",
          countries: "Arab Countries",
          solutions: "Tech Solutions"
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

        // --- New Section: Linking Researchers & Industry ---
        linking_researchers_page: {
          title: "Linking Researchers with Industrial Companies",
          subtitle: "A smart platform bridging the gap between academic knowledge and industrial application.",
          description: "This service allows industrial companies to post their technical challenges and researchers to offer innovative solutions, accelerating Arab industrial development.",
          
          sections: {
            for_researchers: {
              title: "For Researchers",
              point1: "Showcase applicable research projects.",
              point2: "Access industrial funding for research.",
              point3: "Test innovations in real manufacturing environments."
            },
            for_industry: {
              title: "For Industry",
              point1: "Find scientific solutions for technical problems.",
              point2: "Reduce R&D costs.",
              point3: "Attract top-tier Arab scientific talent."
            }
          },

          process_steps: {
            title: "How it Works",
            step1: "Register and identify as a researcher or factory.",
            step2: "Post an industrial challenge or research project.",
            step3: "Smart matching and start of collaboration."
          }
        },

        menu: {
          home: "Home",
          about: "About Us",
          services: "Services",
          database: "Database",
          news: "News & Events",
          communication_cooperation: "Cooperation",
          contact: "Contact Us"
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
          database: {
            scientific_research_database: "Scientific Research DB",
            industry_database: "Industry DB",
          },
          news: {
            regular_updates_workshops: "Regular Updates",
            articles_analyses: "Articles & Analyses",
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