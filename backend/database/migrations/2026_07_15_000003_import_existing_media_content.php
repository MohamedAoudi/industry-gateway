<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();
        $items = [
            ['category' => 'news', 'title_ar' => 'إطلاق المبادرة العربية لدعم ابتكارات الذكاء الاصطناعي في الصناعة', 'title_en' => 'Launch of the Arab Initiative to Support AI Innovations in Industry', 'description_ar' => 'مبادرة جديدة تهدف إلى تمويل الشراكات بين مراكز الأبحاث والمصانع لتبني حلول الذكاء الاصطناعي.', 'description_en' => 'A new initiative aims to fund partnerships between research centers and factories adopting AI solutions.', 'event_date' => '2026-06-15 10:00:00', 'image' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1200'],
            ['category' => 'news', 'title_ar' => 'توقيع اتفاقية تعاون لنقل التكنولوجيا بين الجامعات والمنشآت الصناعية', 'title_en' => 'Technology Transfer Agreement Between Universities and Industrial Plants', 'description_ar' => 'اتفاقية تضمن حماية الملكية الفكرية وتسهيل انتقال أبحاث الحلول التقنية إلى خطوط الإنتاج.', 'description_en' => 'An agreement protecting intellectual property and moving technical research to production lines.', 'event_date' => '2026-05-28 14:30:00', 'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1200'],
            ['category' => 'news', 'title_ar' => 'ندوة افتراضية حول مستقبل الطاقة المستدامة في القطاع الصناعي العربي', 'title_en' => 'Virtual Webinar on Sustainable Energy in the Arab Industrial Sector', 'description_ar' => 'خبراء ومستثمرون يناقشون تقليل الانبعاثات الكربونية بالاعتماد على الابتكارات الهندسية المحلية.', 'description_en' => 'Experts discuss reducing carbon emissions through locally developed engineering innovations.', 'event_date' => '2026-05-10 09:15:00', 'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=85&w=1200'],
            ['category' => 'events', 'title_ar' => 'الملتقى العربي الأول للابتكار الصناعي ونقل التكنولوجيا', 'title_en' => 'The 1st Arab Forum for Industrial Innovation and Technology Transfer', 'description_ar' => 'ملتقى يجمع نخبة من العلماء والمصنعين لبحث فرص الاستثمار والتعاون المشترك.', 'description_en' => 'A forum bringing together scientists and manufacturers to discuss joint investment opportunities.', 'event_date' => '2026-07-12 08:00:00', 'location_ar' => 'المملكة العربية السعودية', 'location_en' => 'Saudi Arabia'],
            ['category' => 'events', 'title_ar' => 'ورشة عمل: صياغة براءات الاختراع وحماية الملكية الفكرية', 'title_en' => 'Workshop: Patent Drafting and Intellectual Property Protection', 'description_ar' => 'دورة مكثفة للباحثين والمبتكرين حول الخطوات القانونية لتسجيل براءات الاختراع.', 'description_en' => 'An intensive course for researchers on the legal steps for patent registration.', 'event_date' => '2026-08-05 09:00:00', 'location_ar' => 'جمهورية مصر العربية', 'location_en' => 'Egypt'],
            ['category' => 'releases', 'title_ar' => 'التقرير السنوي لواقع البحث العلمي والابتكار في العالم العربي 2025', 'title_en' => 'Annual Report on Scientific Research and Innovation in the Arab World 2025', 'description_ar' => 'دراسة إحصائية شاملة تستعرض مؤشرات التطور وأعداد براءات الاختراع المسجلة.', 'description_en' => 'A comprehensive statistical study of development indicators and registered patents.', 'content_type' => 'PDF'],
            ['category' => 'releases', 'title_ar' => 'دليل المصنعين للوصول إلى مراكز التميز والذكاء الاصطناعي', 'title_en' => 'Manufacturers Guide to Centers of Excellence and AI', 'description_ar' => 'خطوات مبسطة لكيفية طرح المشكلات التقنية والوصول إلى الحلول البحثية المناسبة.', 'description_en' => 'Simplified steps for submitting technical challenges and accessing research solutions.', 'content_type' => 'PDF'],
            ['category' => 'competitions', 'title_ar' => 'جائزة أفضل ابتكار صناعي مستدام لعام 2026', 'title_en' => 'Best Sustainable Industrial Innovation Award 2026', 'description_ar' => 'مسابقة مفتوحة للباحثين العرب لتقديم حلول مبتكرة في ترشيد استهلاك الطاقة بالمصانع.', 'description_en' => 'An open competition for Arab researchers presenting innovative factory energy solutions.', 'location_ar' => 'دولة الإمارات العربية المتحدة', 'location_en' => 'United Arab Emirates'],
            ['category' => 'competitions', 'title_ar' => 'هاكاثون الذكاء الاصطناعي لحلول خطوط الإنتاج المعقدة', 'title_en' => 'AI Hackathon for Complex Production Line Solutions', 'description_ar' => 'تحدٍ تقني لفرق المطورين لابتكار خوارزميات الصيانة التنبؤية للآلات.', 'description_en' => 'A technical challenge to create predictive maintenance algorithms for machinery.', 'location_ar' => 'المملكة المغربية', 'location_en' => 'Morocco'],
            ['category' => 'stories', 'title_ar' => 'د. أحمد السعيد — مركز أبحاث وتطوير المياه', 'title_en' => 'Dr. Ahmed Al-Saeed — Water R&D Center', 'description_ar' => 'نجح فريقنا في تحويل براءة اختراع لتنقية المياه العادمة إلى نظام تشغيلي تبنته ثلاثة مصانع كبرى.', 'description_en' => 'Our team converted a wastewater purification patent into an operational system adopted by three factories.'],
            ['category' => 'stories', 'title_ar' => 'المهندس خالد منصور — الشركة العربية للصناعات المتقدمة', 'title_en' => 'Eng. Khaled Mansour — Arab Advanced Industries Co.', 'description_ar' => 'طرحنا مشكلة الهدر الحراري وتلقينا أربعة حلول بحثية من جامعات مختلفة، ثم نفذنا أفضلها بنجاح.', 'description_en' => 'We submitted a thermal waste challenge, received four university solutions and deployed the best one.'],
        ];

        foreach ($items as $item) {
            DB::table('media_items')->updateOrInsert(
                ['category' => $item['category'], 'title_ar' => $item['title_ar']],
                [...$item, 'is_published' => true, 'created_at' => $now, 'updated_at' => $now]
            );
        }
    }

    public function down(): void
    {
        DB::table('media_items')->whereIn('title_en', [
            'Launch of the Arab Initiative to Support AI Innovations in Industry',
            'Technology Transfer Agreement Between Universities and Industrial Plants',
            'Virtual Webinar on Sustainable Energy in the Arab Industrial Sector',
            'The 1st Arab Forum for Industrial Innovation and Technology Transfer',
            'Workshop: Patent Drafting and Intellectual Property Protection',
            'Annual Report on Scientific Research and Innovation in the Arab World 2025',
            'Manufacturers Guide to Centers of Excellence and AI',
            'Best Sustainable Industrial Innovation Award 2026',
            'AI Hackathon for Complex Production Line Solutions',
            'Dr. Ahmed Al-Saeed — Water R&D Center',
            'Eng. Khaled Mansour — Arab Advanced Industries Co.',
        ])->delete();
    }
};
