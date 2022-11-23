<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MessageController extends AbstractController
{
    #[Route('/message/publish/{conv_id}', name: 'app_message_publish')]
    public function publish_message($conv_id, Request $request, ManagerRegistry $doctrine, HubInterface $hub): Response
    {
        $message = $request->request->get('message');
        $user = $this->getUser();

        $message = new Message();
        $message->setCreatedAt(new \DateTimeImmutable());
        $message->setAuthor($user);
        $message->setConversation($conv_id);
        $message->setContent($message);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->flush();

        $update = new Update(
            'http://localhost:8000/conversation/'.$conv_id,
            json_encode([
                'message' => $message,
                'author' => $user,
            ])
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Message published',
        ], 200);
    }

}