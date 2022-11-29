<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Repository\UserRepository;

class JWTHelper
{
    private string $mercureSecret;

    public function __construct(string $mercureSecret)
    {
        $this->mercureSecret = $mercureSecret;
    }

    public function createJWT(User $user, UserRepository $UserRepository): string
    {

        //Get the list of the conversation the user is in
        $convs = $UserRepository->findConversationsByUser($user);

        $subscribe=[];
        $publish=[];
        foreach ($convs as $conv) {
            //$subscribe[] = "https://example.com/user/{$user->getId()}/{?topic}";
            $subscribe[] = "https://goofychat-mercure/conversation/{$conv}";
            $publish[] = "https://goofychat-mercure/conversation/{$conv}";
        }
        

        $payload = ["mercure" => [
            "subscribe" => $subscribe,
            "publish" => $publish,
            "payload" => [
                "email" => $user->getEmail(),
                "userid" => $user->getId()
            ]
        ]];

        return JWT::encode($payload, $this->mercureSecret, 'HS256');
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