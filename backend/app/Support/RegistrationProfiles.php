<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class RegistrationProfiles
{
    public const REQUIRED = [
        'research_center' => ['organization_name', 'country', 'research_fields', 'phone'],
        'patent_office' => ['organization_name', 'entity_type', 'phone'],
        'industrial_company' => ['organization_name', 'activity_field', 'legal_form', 'registration_number', 'authorized_person', 'responsible_position', 'address', 'country', 'city', 'phone'],
        'academic_institution' => ['organization_name', 'country', 'academic_fields', 'phone'],
        'organization' => ['organization_name', 'entity_type', 'activity_field', 'country', 'authorized_person'],
        'supporting_entity' => ['organization_name', 'country', 'authorized_person'],
        'expert' => ['full_name', 'phone', 'country'],
        'visitor' => ['full_name', 'phone', 'user_category', 'address', 'country', 'city'],
        'other' => [],
        // Keep existing accounts editable without changing their stored type.
        'regular' => [],
        'factory' => ['organization_name', 'activity_field', 'products', 'country'],
        'production_company' => ['organization_name', 'products', 'production_capacity', 'country'],
        'funding_entity' => ['organization_name', 'funding_scope', 'funding_programs', 'country'],
    ];

    public const FIELDS = [
        'organization_name', 'country', 'address', 'research_fields', 'website', 'phone',
        'authorized_person', 'entity_type', 'activity_field', 'academic_fields', 'work_scope',
        'sectors', 'full_name', 'specialty', 'years_experience', 'current_position', 'other_type',
        'legal_form', 'registration_number', 'license_number', 'license_type', 'license_expiry',
        'responsible_position', 'city', 'landline', 'fax', 'facebook', 'linkedin', 'twitter',
        'instagram', 'referral_source', 'user_category', 'products', 'production_capacity',
        'funding_scope', 'funding_programs',
        'branch', 'classification', 'service_type', 'provided_services',
    ];

    public static function prepare(Request $request): void
    {
        if (is_string($request->input('profile_data'))) {
            $decoded = json_decode($request->input('profile_data'), true);
            if (is_array($decoded)) {
                $request->merge(['profile_data' => $decoded]);
            }
        }
    }

    public static function rules(Request $request): array
    {
        $rules = [];
        foreach (self::FIELDS as $field) {
            $rules['profile_data.'.$field] = ['nullable', 'string', in_array($field, ['research_fields', 'academic_fields', 'activity_field', 'sectors', 'products', 'funding_programs'], true) ? 'max:2000' : 'max:255'];
        }
        foreach (self::REQUIRED[$request->input('account_type')] ?? [] as $field) {
            $rules['profile_data.'.$field][0] = 'required';
        }
        foreach (['website', 'facebook', 'linkedin', 'twitter', 'instagram'] as $field) {
            $rules['profile_data.'.$field] = ['nullable', 'url:http,https', 'max:2048'];
        }
        $rules['profile_data.years_experience'] = ['nullable', 'integer', 'min:0', 'max:100'];
        $rules['profile_data.phone'] = [in_array('phone', self::REQUIRED[$request->input('account_type')] ?? [], true) ? 'required' : 'nullable', 'string', 'max:45'];
        $rules['profile_data.license_expiry'] = ['nullable', 'date'];
        $rules['profile_data.work_scope'] = ['nullable', Rule::in(['national', 'regional', 'arab', 'international'])];
        $rules['cv_file'] = ['nullable', Rule::prohibitedIf($request->input('account_type') !== 'expert'), 'file', 'mimes:pdf', 'max:5120'];
        $rules['organization_logo'] = ['nullable', Rule::prohibitedIf($request->input('account_type') !== 'industrial_company'), 'image', 'max:4096'];
        $rules['organization_attachment'] = ['nullable', Rule::prohibitedIf($request->input('account_type') !== 'industrial_company'), 'file', 'mimes:pdf', 'max:5120'];
        return $rules;
    }

    public static function profile(Request $request, array $data, array $existing = []): array
    {
        $profile = Arr::only($data['profile_data'] ?? [], self::FIELDS);
        foreach (['cv_file' => 'cv', 'organization_logo' => 'logo', 'organization_attachment' => 'attachment'] as $field => $prefix) {
            // Preserve stored files when an administrator edits an existing profile.
            if (! $request->hasFile($field)) {
                foreach ([$prefix.'_path', $prefix.'_name'] as $key) {
                    if (isset($existing[$key])) $profile[$key] = $existing[$key];
                }
                continue;
            }
            $file = $request->file($field);
            $profile[$prefix.'_path'] = $file->store('registration/'.$prefix, 'local');
            $profile[$prefix.'_name'] = $file->getClientOriginalName();
        }
        return $profile;
    }
}
