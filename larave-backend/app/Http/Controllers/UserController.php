<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
      public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
       

        return User::create($request->all());
    }

    // Update an existing User
    public function update(Request $request, $id)
    {
        $User = User::find($id);

        $User->update($request->all());
        return $User;
    }

    // Delete a User
    public function destroy($id)
    {
        return User::destroy($id);
       
    }
}
