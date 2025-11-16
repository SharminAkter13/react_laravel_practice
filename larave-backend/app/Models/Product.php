<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    // 💡 Set the table name to match your migration exactly
    protected $table = 'products'; 

    // Define fillable attributes for mass assignment protection
    protected $fillable = [
        'name',
        'price',
        'description',
        'category_id',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}