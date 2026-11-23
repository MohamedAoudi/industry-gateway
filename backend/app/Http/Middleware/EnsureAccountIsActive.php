<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureAccountIsActive
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if (! $user || ($user->registration_status !== 'pending' && $user->is_active !== false)) {
            return $next($request);
        }

        $pending = $user->registration_status === 'pending';
        $message = $pending ? 'حسابك بانتظار موافقة الإدارة.' : 'هذا الحساب معطل. تواصل مع الإدارة لإعادة تفعيله.';
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['code' => $pending ? 'ACCOUNT_PENDING_APPROVAL' : 'ACCOUNT_DEACTIVATED', 'message' => $message], 403);
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login')->withErrors(['email' => $message]);
    }
}
