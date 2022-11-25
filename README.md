# studyHouseLaravelTest
 test laravel + reactjs + SPA (Single Page Application)
# install dependencies
npm install <br />
composer install
# migration
php artisan migrate <br />
php artisan db:seed
# login email and password 
email : admin@admin.com <br />
password : password
# disadvantages
middleware jwt belum sepenuh aman  dan belum di implementasikan fungsi remember me . umur token hanyalah 60 menit , dan fungsi error message untuk api juga tidak sepenuhnya selesai <br />
halaman blade error 404 , sama dengan halaman blade app , karena fungsi error di blade php di arahkan ke halaman page reactjs
