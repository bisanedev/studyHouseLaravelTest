<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\Kategori;
use App\Models\Catatan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(UserTableSeeder::class);
        $this->call(KategoriTableSeeder::class);
        $this->call(CatatanTableSeeder::class);
        $this->command->info('User table seeded!');
    }
}

class UserTableSeeder extends Seeder {
    public function run()
    {
        DB::table('users')->delete();
        User::create([
            'nama' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => Hash::make("password")
        ]);
    }
}

class KategoriTableSeeder extends Seeder {
    public function run()
    {
        DB::table('kategori')->delete();
        Kategori::create([
            'nama' => 'Biologi'
        ]);
        Kategori::create([
            'nama' => 'Fisika'
        ]);
        Kategori::create([
            'nama' => 'Bahasa Inggris'
        ]);
    }
}

class CatatanTableSeeder extends Seeder {
    public function run()
    {
        DB::table('catatan')->delete();
        Catatan::create([
            'title' => 'Coba Catatan 1',
            'text' => 'Apa kabar Dunia !!!!',
            'user_id' => 1,
            'kategori_id' => 1
        ]);
        Catatan::create([
            'title' => 'Coba Catatan 2',
            'text' => 'Apa kabar Kawan !!!!',
            'user_id' => 1,
            'kategori_id' => 2
        ]);
        Catatan::create([
            'title' => 'Coba Catatan 3',
            'text' => 'Apa kabar Tamvan !!!!',
            'user_id' => 1,
            'kategori_id' => 3
        ]);
    }
}
