<?php
namespace App\Http\Controllers;

use App\Models\Center;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class IndustrialPropertyPatentOfficesController extends Controller
{

    // public function index(Request $request)
    // {
    //     $perPage = $request->get('per_page', 10);

    //     $industrialPropertyPatentOffices = Center::with('pays')
    //         ->where('idTypeCenter', 4)
    //         ->latest()
    //         ->paginate($perPage);

    //     return response()->json($industrialPropertyPatentOffices);
    // }


    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        // On ajoute orderBy('idPays') pour que le regroupement soit logique
        $centers = Center::with('pays')
            ->where('idTypeCenter', 4)
            ->orderBy('idPays') 
            ->paginate($perPage);

        return response()->json($centers);
    }

    public function show($id)
    {
        $industrialPropertyPatentOffices = Center::with('pays')
            ->where('idTypeCenter', 4)
            ->find($id);

        if (!$industrialPropertyPatentOffices) {
            return response()->json([
                'success' => false,
                'message' => 'Le centre de propriété industrielle et de brevets demandé est introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $industrialPropertyPatentOffices
        ], 200);
    }
    

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $photoPath = $request->hasFile('photo') 
            ? $request->file('photo')->store('Photos_IndustrialPropertyPatentOffices', 'public') 
            : null;

        $industrialPropertyPatentOffices = Center::create([
            'titre_ar'       => $request->titre_ar,
            'titre_en'       => $request->titre_en,
            'description_ar' => $request->description_ar,
            'description_en' => $request->description_en,
            'url'            => $request->url,
            'idPays'         => $request->idPays,
            'idUtilisateur'  => $user->idUtilisateur, 
            'idTypeCenter'   => 4, 
            'photo'          => $photoPath,
        ]);

        return response()->json(['message' => 'Succès', 'data' => $industrialPropertyPatentOffices], 201);
    }

    /**
     * MISE À JOUR (Update)
     */
    public function update(Request $request, $id)
    {
        $industrialPropertyPatentOffices = Center::where('idTypeCenter', 4)->findOrFail($id);

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'titre_en' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($industrialPropertyPatentOffices->photo) {
                Storage::disk('public')->delete($industrialPropertyPatentOffices->photo);
            }
            // Stocker la nouvelle
            $data['photo'] = $request->file('photo')->store('Photos_IndustrialPropertyPatentOffices', 'public');
        }

        $industrialPropertyPatentOffices->update($data);

        return response()->json(['message' => 'Mise à jour réussie', 'data' => $industrialPropertyPatentOffices]);
    }

    public function destroy($id)
    {
        // On sécurise pour ne supprimer que si c'est un incubateur
        $industrialPropertyPatentOffices = Center::where('idTypeCenter', 4)->findOrFail($id);
        
        if ($industrialPropertyPatentOffices->photo) {
            Storage::disk('public')->delete($industrialPropertyPatentOffices->photo);
        }
        
        $industrialPropertyPatentOffices->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function syncFromAI()
    {
        // Exécution du script Python
        $output = shell_exec('python ' . base_path('my_ai_scraper/aidsmo_sync.py'));
        
        return response()->json([
            'success' => true,
            'message' => 'Scraping process finished',
            'output' => $output
        ]);
    }
}