<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
       

        return Product::create($request->all());
    }

    // Update an existing Product
    public function update(Request $request, $id)
    {
        $products = Product::find($id);

        $products->update($request->all());
        return $products;
    }

    // Delete a Product
    public function destroy($id)
    {
        return Product::destroy($id);
       
    }
}
