<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Conversation;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MessageController extends AbstractController
{

    #[Route('/api/message/publish', name: 'app_message_publish', methods: ['POST'] )]
    public function publish_message(Request $request, ManagerRegistry $doctrine, HubInterface $hub): Response
    {
        
        $data = $request->getContent();
        $data = json_decode($data, true);
        $messageReceived = $data['content'];
        $conv_id = $data['conv_id'];
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

        $update = new Update(
            'https://goofychat-mercure/conversation/'.$conv_id,
            json_encode([
                'message' => $messageReceived,
                'author_username' => $user->getUsername(),
                'author_id' => $user->getId(),
            ])
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Message published',
        ], 200);
    }

}