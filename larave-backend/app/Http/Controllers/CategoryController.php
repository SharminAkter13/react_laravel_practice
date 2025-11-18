<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
       

        return Category::create($request->all());
    }

    // Update an existing category
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        $category->update($request->all());
        return $category;
    }

    // Delete a category
    public function destroy($id)
    {
        return Category::destroy($id);
       
    }
}
