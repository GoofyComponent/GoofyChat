<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Service\JWTHelper;
use App\Repository\UserRepository;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends AbstractController
{

    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, ManagerRegistry $doctrine): Response
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $email=$data['email'];
        $password= $data['password'];
        $password=password_hash($password, PASSWORD_BCRYPT);
        $username=$data['username'];
        $firstname= $data['firstname'];
        $lastname=$data['lastname'];

        //Check if one of the fields is empty
        if(empty($email) || empty($password) || empty($username) || empty($firstname) || empty($lastname)){
            return $this->json([
                'message' => 'One of the fields is empty',
            ], 400);
        }

        //Check if email already exists
        $ifMailExist = $doctrine->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($ifMailExist) {
            return $this->json([
                'message' => 'Email already exists',
            ], 400);
        }

        //Check if username contains special characters or spaces or blank spaces
        if (!preg_match('/^[a-zA-Z0-9]+$/', $username)) {
            return $this->json([
                'message' => 'Username contains special characters or spaces or blank spaces',
            ], 400);
        }

        //check if username already exists
        $ifUsernameExist = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);

        if ($ifUsernameExist) {
            return $this->json([
                'message' => 'Username already exists',
            ], 400);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($password);
        $user->setLastname($lastname);
        $user->setFirstname($firstname);
        $user->setUsername($username);

        $em = $doctrine->getManager();
        $em->persist($user);
        $em->flush();

        return $this->json([
            'status'=>'success',
            'message' => 'User created'
        ]);
    }

    #[Route('/api/mercureLogin', name: 'mercureLogin', methods: ['POST'])]
    public function mercureLogin(JWTHelper $JWTHelper,CookieHelper $cookieHelper, ConversationRepository $ConversationRepository): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }

        $cookie = $cookieHelper->createMercureCookie($user);
        $mercureJWT = $JWTHelper->createJWT($user);

        $response = new Response();
        //$response->headers->setCookie($cookie);
        $json = json_encode([
            'status' => 'success',
            'mercureAuthorization' => $cookie->getValue(),
            'mercurePersonalJWT' => $mercureJWT,
        ]);
        $response->setContent($json);
        
        return $response;

    }

    #[Route('/api/logout', name: 'logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}