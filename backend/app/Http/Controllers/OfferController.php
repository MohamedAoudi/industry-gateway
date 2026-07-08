<?php

namespace App\Http\Controllers;

use App\Models\CollaborationOffer;
use App\Models\Company;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index() {
        try {
            $offers = CollaborationOffer::with('company')->orderBy('created_at', 'desc')->get();
            return response()->json(['status' => 'success', 'data' => $offers]);
        } catch (\Exception $e) {
            // هذا سيطبع الخطأ الحقيقي في Log الخاص بـ Laravel بدلاً من مجرد 500
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required',
            'field'       => 'required',
            'idCompany'   => 'required|exists:companies,idCompany',
            'deadline'    => 'required|date',
            'budget'      => 'nullable|numeric', // <--- أضف هذا السطر هنا
        ]);

        $offer = CollaborationOffer::create($validated);
        return response()->json([
            'status' => 'success', 
            'message' => 'تم إضافة العرض بنجاح', 
            'data' => $offer
        ]);
    }

    public function updateStatus(Request $request, $id) {
        try {
            // التحقق من صحة الحالة المرسلة
            $validated = $request->validate([
                'status' => 'required|in:open,closed,pending'
            ]);

            // البحث عن العرض باستخدام المفتاح الأساسي idCollaborationOffer
            $offer = CollaborationOffer::findOrFail($id);
            
            // تحديث الحالة
            $offer->status = $request->status;
            $offer->save();

            return response()->json([
                'status' => 'success',
                'message' => 'تم تحديث حالة العرض بنجاح',
                'data' => $offer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'حدث خطأ أثناء التحديث: ' . $e->getMessage()
            ], 500);
        }
    }


    // حذف عرض
    public function destroy($id) {
        $offer = CollaborationOffer::findOrFail($id);
        $offer->delete();
        return response()->json(['message' => 'تم حذف العرض']);
    }
}
