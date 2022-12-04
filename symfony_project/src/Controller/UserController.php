<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\User;
use App\Repository\ConversationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/user/all-contacts', name: 'user_contacts', methods: ['POST'])]
    public function allContacts(): Response
    {
        $user = $this->getUser();

        //Get from all the conversation of the user, a list of all the contacts
        $contacts = [];

        foreach ($user->getConversations() as $conversation) {
            foreach ($conversation->getMembers() as $member) {
                if ($member->getId() !== $user->getId()) {
                    $contact= [
                        'username' => $member->getUsername(),
                        "lastname" => $member->getLastname(),
                        "firstname" => $member->getFirstname(),
                    ];

                    if(!in_array($contact, $contacts)) {
                        $contacts[] = $contact;
                    };
                    }
                    
                }
            }

        return $this->json([
            'contacts' => $contacts,
        ], 200);
    }

    #[Route('/api/user/all-convs', name: 'user_conversation', methods: ['POST'])]
    public function allConversation(ConversationRepository $ConversationRepository): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }

        return $this->json([
            'conversationList' => $ConversationRepository->getConversations($user),
        ], 200);
    }
}