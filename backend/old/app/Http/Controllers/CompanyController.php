<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    // جلب الشركات التي تم قبولها فقط (Status = approved)
    public function index() {
        $companies = Company::where('status', 'approved')->get();
        return response()->json(['status' => 'success', 'data' => $companies]);
    }

    // جلب طلبات الانضمام المعلقة فقط (Status = pending)
    public function getPendingRequests() {
        $requests = Company::where('status', 'pending')->orderBy('created_at', 'desc')->get();
        return response()->json(['status' => 'success', 'data' => $requests]);
    }

    public function updateStatus(Request $request, $id) {
        // نبحث باستخدام العمود idCompany يدوياً للتأكد
        $company = Company::where('idCompany', $id)->first();

        if (!$company) {
            return response()->json([
                'status' => 'error',
                'message' => 'الشركة غير موجودة في قاعدة البيانات برقم: ' . $id
            ], 404);
        }

        $company->update([
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'تم تحديث الحالة بنجاح'
        ]);
    }

    // حذف شركة نهائياً
    public function destroy($id) {
        $company = Company::where('idCompany', $id)->firstOrFail();
        $company->delete();
        return response()->json(['message' => 'تم حذف الشركة بنجاح']);
    }
}