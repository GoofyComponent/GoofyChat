<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class ConversationController extends AbstractController
{
    #[Route('/conversation/create', name: 'app_conversation')]
    public function create_conversation(Request $request, ManagerRegistry $doctrine): Response
    {
        $conv_name = $request->request->get('conv_name');
        $usersUsername = $request->request->get('usersUsername');

        //Check if conv_name already exists
        $ifConvNameExist = $doctrine->getRepository(Conversation::class)->findOneBy(['name' => $conv_name]);

        if ($ifConvNameExist) {
            return $this->json([
                'message' => 'Conversation name already exists',
            ], 400);
        }

        $conversation = new Conversation();
        $conversation->setName($conv_name);
        $conversation->setCreatedAt(new \DateTimeImmutable());

        //Add the members to the conversation
        $conversation->addMember($this->getUser());
        foreach ($usersUsername as $username) {
            $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $username]);
            $conversation->addMember($user);
        }

        $entityManager = $doctrine->getManager();
        $entityManager->persist($conversation);
        $entityManager->flush();

        return $this->json([
            'message' => 'Conversation created',
            'conv_id' => $conversation->getId(),
        ], 200);
    }


    #[Route('/conversation/delete/{id}', name: 'app_conversation_delete')]
    public function delete_conversation($id, ManagerRegistry $doctrine): Response
    {
        //Check if the conversation exists, if not return 404
        $conversation = $doctrine->getRepository(Conversation::class)->findOneBy(['id' => $id]);
        if (!$conversation) {
            return $this->json([
                'message' => 'Conversation not found',
            ], 404);
        }

        //Delete the conversation and the messages
        $entityManager = $doctrine->getManager();
        $entityManager->remove($conversation);
        $entityManager->flush();

        return $this->json([
            'message' => 'Conversation deleted',
        ], 200);
    }

    #[Route('/conversation/{id}', name: 'app_conversation_get')]
    public function get_conversation($id, ManagerRegistry $doctrine): Response
    {
        try {
            $conversation = $doctrine->getRepository(Conversation::class)->find($id);
        } catch (\Throwable $th) {
            return $this->json([
                'message' => 'Conversation not found',
            ], 400);
        }

        if (!$conversation) {
            return $this->json([
                'message' => 'Conversation not found',
            ], 400);
        }

        $conversationData= [
            'id' => $conversation->getId(),
            'name' => $conversation->getName(),
            'createdAt' => $conversation->getCreatedAt()
        ];

        $members = $conversation->getMembers();
        $membersList = [];
        foreach ($members as $member) {
            $membersList[] = [
                'id' => $member->getId(),
                'username' => $member->getUsername(),
                'last_name' => $member->getLastName(),
                'first_name' => $member->getFirstName(),
                'email' => $member->getEmail(),
            ];
        }

        $messages = $doctrine->getRepository(Message::class)->findBy(['conversation' => $conversation]);
        $messagesList = [];
        foreach ($messages as $message) {
            $messagesList[] = [
                'content' => $message->getContent(),
                'created_at' => $message->getCreatedAt(),
                'author' => $message->getAuthor()->getUsername(),
            ];
        }

        return $this->json([
            "conversationData"=>$conversationData,
            "membersList"=>$membersList,
            "messagesList"=>$messagesList,
        ], 200);
    }
}