<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;

class Authenticate implements AuthenticatesRequests
{
    /**
     * The authentication factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$guards
     * @return mixed
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function handle($request, Closure $next, ...$guards)
    {
      
        try {
            // prevent multiple tokens per user
            $cekAuth = User::where([
                ['id', auth()->payload()["uid"]],
                ['expiredToken', auth()->payload()["expiredToken"]]
            ])->exists();     
            
            if(!$cekAuth){
                abort(response()->json(['error' => "user tak dikenal"], 401));
            }      
            
            // prevent fake jwt from another server jwt issued
            if(auth()->payload()["domain"] != $_SERVER['SERVER_NAME']){
                abort(response()->json(['error' => "token tak dikenal"], 401));
            }

            $this->authenticate($request, $guards);
            return $next($request);
        
        } catch (TokenExpiredException $e) {
        
            abort(response()->json(['error' => 'token was expired.'], 401));           
        
        }                                

    }

    /**
     * Determine if the user is logged in to any of the given guards.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }        

        foreach ($guards as $guard) {
            
            if ($this->auth->guard($guard)->check()) {
                return $this->auth->shouldUse($guard);
            }
        }

        $this->unauthenticated($request, $guards);
    }

    /**
     * Handle an unauthenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */

    // protected function unauthenticated($request, array $guards)
    // {
    //     throw new AuthenticationException(
    //         'Unauthenticated.', $guards, $this->redirectTo($request)
    //     );
    // }

    protected function unauthenticated($request, array $guards)
    {        
        abort(response()->json(['error' => 'Unauthenticated.'], 401));
    }
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        //
    }
}
