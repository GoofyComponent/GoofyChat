<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Conversation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MessageController extends AbstractController
{

    #[Route('/api/message/publish/{conv_id}', name: 'app_message_publish', methods: ['POST'] )]
    public function publish_message($conv_id, Request $request, ManagerRegistry $doctrine, HubInterface $hub): Response
    {
        
        $data = $request->getContent();
        $data = json_decode($data, true);
        $messageReceived = $data['message'];
        
        $user = $this->getUser();

        //find cnversation by id
        $conversation = $doctrine->getRepository(Conversation::class)->find($conv_id);

        $message = new Message();
        $message->setCreatedAt(new \DateTimeImmutable());
        $message->setAuthor($user);
        $message->setConversation($conversation);
        $message->setContent($messageReceived);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->flush();

        $userUsername = $this->getUser()->getUsername();

        $update = new Update(
            'http://localhost:9090/conversation/'.$userUsername.'/'.$conv_id,
            json_encode([
                'message' => $messageReceived,
                'author' => $user,
            ])
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Message published',
        ], 200);
    }

}