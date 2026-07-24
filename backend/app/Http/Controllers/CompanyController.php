<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    // جلب الشركات التي تم قبولها فقط (Status = approved)
    public function index()
    {
        $companies = Company::where('status', 'approved')->get();

        return response()->json(['status' => 'success', 'data' => $companies]);
    }

    // جلب طلبات الانضمام المعلقة فقط (Status = pending)
    public function getPendingRequests()
    {
        $requests = Company::where('status', 'pending')->orderBy('created_at', 'desc')->get();

        return response()->json(['status' => 'success', 'data' => $requests]);
    }

    public function updateStatus(Request $request, $id)
    {
        // نبحث باستخدام العمود idCompany يدوياً للتأكد
        $company = Company::where('idCompany', $id)->first();

        if (! $company) {
            return response()->json([
                'status' => 'error',
                'message' => 'الشركة غير موجودة في قاعدة البيانات برقم: '.$id,
            ], 404);
        }

        $company->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'تم تحديث الحالة بنجاح',
        ]);
    }

    public function update(Request $request, $id)
    {
        abort_unless($request->user()?->role === 'superviseur', 403);

        $company = Company::where('idCompany', $id)->firstOrFail();
        $data = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'industry_sector' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer', 'min:1', 'max:999999'],
        ]);

        $company->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'تم تحديث المؤسسة الصناعية بنجاح',
            'data' => $company->fresh(),
        ]);
    }

    // حذف شركة نهائياً
    public function destroy($id)
    {
        $company = Company::where('idCompany', $id)->firstOrFail();
        $company->delete();

        return response()->json(['message' => 'تم حذف الشركة بنجاح']);
    }
}
