# studyHouseLaravelTest
 test laravel + reactjs + SPA (Single Page Application)
# install dependencies
npm install
composer install
# migration
php artisan migrate
php artisan db:seed
# email and password defaults 
email : admin@admin.com
password : password
# disadvantages
middleware jwt belum sepenuh aman  dan belum di implementasikan fungsi remember me . umur token hanyalah 60 menit , dan fungsi error message untuk api juga tidak sepenuhnya selesai <br />
halaman blade error 404 , sama dengan halaman blade app , karena fungsi error di blade php di arahkan ke halaman page reactjs
