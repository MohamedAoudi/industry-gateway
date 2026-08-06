<?php

namespace App\Http\Controllers;

use App\Models\FaqQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FaqQuestionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 10);

        $questions = FaqQuestion::query()
            ->where('is_published', true)
            ->where('status', 'answered')
            ->whereNotNull('answer')
            ->latest('answered_at')
            ->paginate($perPage);

        return response()->json($questions);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'question' => 'required|string|max:1000',
        ]);

        $question = FaqQuestion::create([
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'question' => $data['question'],
            'status' => 'pending',
            'is_published' => false,
        ]);

        return response()->json([
            'message' => 'Question sent successfully',
            'data' => $question,
        ], 201);
    }

    public function adminIndex(Request $request)
    {
        $perPage = (int) $request->get('per_page', 10);
        $status = $request->get('status');

        $questions = FaqQuestion::with('answeredBy')
            ->when(in_array($status, ['pending', 'answered', 'hidden'], true), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate($perPage);

        return response()->json($questions);
    }

    public function adminStore(Request $request)
    {
        abort_unless($request->user()?->role === 'superviseur', 403);

        $data = $request->validate([
            'question' => ['required', 'string', 'max:1000'],
            'answer' => ['required', 'string'],
            'is_published' => ['required', 'boolean'],
        ]);

        $user = $request->user();
        $question = FaqQuestion::create([
            'name' => trim(($user->prenomUtilisateur ?? '').' '.($user->nomUtilisateur ?? '')) ?: 'الإدارة',
            'email' => $user->email,
            'question' => trim($data['question']),
            'answer' => trim($data['answer']),
            'status' => 'answered',
            'is_published' => (bool) $data['is_published'],
            'answered_by' => $user->getKey(),
            'answered_at' => now(),
        ]);

        return response()->json([
            'message' => 'FAQ created successfully',
            'data' => $question->load('answeredBy'),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $question = FaqQuestion::findOrFail($id);

        $data = $request->validate([
            'answer' => 'nullable|string',
            'status' => 'nullable|in:pending,answered,hidden',
            'is_published' => 'nullable|boolean',
        ]);

        $answer = array_key_exists('answer', $data) ? trim((string) $data['answer']) : $question->answer;
        $status = $data['status'] ?? $question->status;
        $isPublished = array_key_exists('is_published', $data)
            ? (bool) $data['is_published']
            : $question->is_published;

        if ($answer === '') {
            $answer = null;
        }

        if ($answer === null) {
            $status = $status === 'answered' ? 'pending' : $status;
            $isPublished = false;
        } elseif ($status === 'pending') {
            $status = 'answered';
        }

        if ($status !== 'answered') {
            $isPublished = false;
        }

        $question->fill([
            'answer' => $answer,
            'status' => $status,
            'is_published' => $isPublished,
        ]);

        if ($answer !== null && ($question->isDirty('answer') || !$question->answered_at)) {
            $question->answered_by = Auth::id();
            $question->answered_at = now();
        }

        $question->save();

        return response()->json([
            'message' => 'Question updated successfully',
            'data' => $question->load('answeredBy'),
        ]);
    }

    public function destroy($id)
    {
        FaqQuestion::findOrFail($id)->delete();

        return response()->json(['message' => 'Question deleted successfully']);
    }
}
