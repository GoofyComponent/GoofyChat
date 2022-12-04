<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// security.token_storage
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class JWTHelper
{
    private string $mercureSecret;

    public function __construct(string $mercureSecret, TokenStorageInterface $tokenStorage)
    {
        $this->mercureSecret = $mercureSecret;
        $this->tokenStorage = $tokenStorage;
    }

    public function createJWT(User $user): string
    {

        $username = $user->getUsername();

        $subscribe=[];
        //$publish=[];
        
        //$subscribe[] = "https://example.com/user/{$user->getId()}/{?topic}";
        $subscribe[] = "https://goofychat-mercure/personnal/{$username}";
        //$publish[] = "https://goofychat-mercure/personnal/{$username}";
  

        $payload = ["mercure" => [
            "subscribe" => $subscribe,
            //"publish" => $publish,
            "payload" => [
                "email" => $user->getEmail(),
                "userid" => $user->getId()
            ]
        ]];

        $jwt = JWT::encode($payload, $this->mercureSecret, 'HS256');
        return $jwt;
    }

    public function isJwtValid(string $jwt): bool
    {
        try {
            return (bool)JWT::decode($jwt, new Key($this->mercureSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }
}