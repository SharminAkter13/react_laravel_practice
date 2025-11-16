<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure categories exist
        $electronics = Category::firstOrCreate(['name' => 'Electronics']);
        $clothing    = Category::firstOrCreate(['name' => 'Clothing']);
        $books       = Category::firstOrCreate(['name' => 'Books']);
        $furniture   = Category::firstOrCreate(['name' => 'Furniture']);

        $products = [
            [
                'name' => 'Smartphone',
                'price' => 699,
                'description' => 'A high-end smartphone with advanced features.',
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'Laptop',
                'price' => 1299,
                'description' => 'Powerful laptop for work and gaming.',
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'T-Shirt',
                'price' => 19,
                'description' => 'Comfortable cotton T-shirt.',
                'category_id' => $clothing->id,
            ],
            [
                'name' => 'Novel Book',
                'price' => 15,
                'description' => 'A best-selling fiction novel.',
                'category_id' => $books->id,
            ],
            [
                'name' => 'Office Chair',
                'price' => 120,
                'description' => 'Ergonomic office chair with lumbar support.',
                'category_id' => $furniture->id,
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']], // Prevent duplicates
                $product
            );
        }
    }
}
