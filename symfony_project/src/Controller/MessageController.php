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


        $conversation = $doctrine->getRepository(Conversation::class)->find($conv_id);

        if (!$conversation) {
            return $this->json([
                'message' => 'Conversation not found',
            ], 400);
        }

        //check if user is in conversation
        if (!$conversation->getMembers()->contains($user)) {
            return $this->json([
                'message' => 'You are not in this conversation',
            ], 400);
        }


        $message = new Message();
        $message->setCreatedAt(new \DateTimeImmutable());
        $message->setAuthor($user);
        $message->setConversation($conversation);
        $message->setContent($messageReceived);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->flush();


        $members = $conversation->getMembers();

        foreach ($members as $member) {

            $dateUTC = new \DateTime('now', new \DateTimeZone('UTC'));
            $dateUTC->setTimezone(new \DateTimeZone('Europe/Paris'));

            
            $update = new Update(
                ["goofychat_caddy/personnal/". $member->getUsername()],
                json_encode([
                    'id' => $conv_id,
                    'content' => $messageReceived,
                    'author' => $user->getUsername(),
                    'created_at' => $dateUTC,
                    'type' => 'message',
                ]),
                true
            );
            $hub->publish($update);
        }

        return $this->json([
            'message' => 'Message published',
        ], 200);
    }

}