<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;


class registerCompanyController extends Controller
{
    public function registerCompany(Request $request) {
        $data = $request->validate([
            'company_name' => 'required|string',
            'industry_sector' => 'required|string',
            'email' => 'required|email|unique:companies,email',
        ]);

        Company::create($data);

        return response()->json(['status' => 'success', 'message' => 'تم تسجيل شركتكم بنجاح']);
    }
}
