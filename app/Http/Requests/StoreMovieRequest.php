<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'poster_url' => 'nullable|url|max:500',
            'synopsis' => 'nullable|string|max:5000',
            'trailer_url' => 'nullable|url|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Movie title is required.',
            'poster_url.url' => 'Please provide a valid poster image URL.',
            'trailer_url.url' => 'Please provide a valid trailer URL.',
            'synopsis.max' => 'Synopsis must not exceed 5000 characters.',
        ];
    }
}