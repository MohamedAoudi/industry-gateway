# Backend

Requires PHP 8.5.12 or a later PHP 8.5 patch release, with Composer.
`.php-version` records the target runtime; it does not change Wamp or Windows PATH.

On this Windows development machine, run from `backend` in PowerShell:

```powershell
$env:Path = "C:\wamp64\bin\php\php8.5.12;" + $env:Path
php -v
composer install
composer check-platform-reqs
php artisan serve
```

The PATH change applies to the current terminal and its child processes.
For Apache hosting, select PHP 8.5.12 in Wamp separately and restart its services.
Point the web server document root at `backend/public`.

Run the backend tests with:

```powershell
php artisan test
```
