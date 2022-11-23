<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class SecurityController extends AbstractController
{

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, ManagerRegistry $doctrine): Response
    {
        $email=$request->request->get('email');
        $password=$request->request->get('password');
        $password = password_hash($password, PASSWORD_BCRYPT);
        $username=$request->request->get('username');
        $firstname= $request->request->get('firstname');
        $lastname= $request->request->get('lastname');

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

    /**
     * @Route("/login", name="app_login")
     */
    public function login(JWTHelper $helper, CookieHelper $cookieHelper): Response
    {
        /** @var $user User */
        if ($user = $this->getUser()) {
            return $this->json([
                'JWT' => $helper->createJWT($user),
                'status' => 'success',
            ], 200, [
                'set-cookie' => $cookieHelper->createMercureCookie($user)
            ]);
        }

        return $this->json([
            'status' => 'error',
            'message' => 'Bad credentials',
            'Authorization' => 'Basic'
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}