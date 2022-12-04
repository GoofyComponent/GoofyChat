<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CookieHelper
{

    private string $mercureSecret;
    private JWTHelper $JWTHelper;

    public function __construct(string $mercureSecret, JWTHelper $JWTHelper)
    {
        $this->mercureSecret = $mercureSecret;
        $this->JWTHelper = $JWTHelper;
    }

    public function createMercureCookie(User $user): Cookie
    {
        $jwt = $this->JWTHelper->createJWT($user);
        $cookie = Cookie::create(
            'mercureAuthorization',
            $jwt,
            new \DateTime("10 minutes"),
            null,
            null,
            null,
            true,
            false,
            Cookie::SAMESITE_STRICT
        );
        return  $cookie;
    }

    public function setMercureCookie(User $user): JsonResponse
    {
        $res = new JsonResponse();
        $res->headers->setCookie($this->createMercureCookie($user));
        return $res;
    }
}