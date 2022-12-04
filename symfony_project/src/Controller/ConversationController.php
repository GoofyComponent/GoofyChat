<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\UserRepository;
use App\Service\JWTHelper;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class ConversationController extends AbstractController
{

    public function __construct(private UserRepository $userRepository, private ConversationRepository $conversationRepository, JWTHelper $jwtHelper, CookieHelper $cookieHelper)
    {
        $this->jwtHelper = $jwtHelper;
        $this->cookieHelper = $cookieHelper;
    }

    
    #[Route('/api/conversation/create', name: 'app_conversation')]
    public function create_conversation(Request $request, ManagerRegistry $doctrine, ConversationRepository $ConversationRepository): Response
    {
        $parameters = json_decode($request->getContent(), true);

        try{
            $conv_name = $parameters['conv_name'];
            $members = $parameters['members'];  

            if($conv_name == null || $members == null || $conv_name == "" || $members == "[]"){
                return $this->json([
                    'status' => 'error',
                    'message' => 'Members or conversation name is empty'
                ],400);
            }
        }
        catch(\Exception $e){
            return $this->json([
                'message' => 'Members or conversation name is empty',
            ], 400);
        }

        if ($ConversationRepository->checkConvName($conv_name)) {
            return $this->json([
                'message' => 'Conversation name already exists',
            ], 400);
        }

        $doesConvExist = $ConversationRepository->conversationExists($members);
        if($doesConvExist) {
            return $this->json([
                'message' => 'Conversation already exists',
                'conv_id' => $doesConvExist,
            ], 400);
        }
        

        $conversation = new Conversation();
        $conversation->setName($conv_name);
        $conversation->setCreatedAt(new \DateTimeImmutable());

        $conversation->addMember($this->getUser());
        foreach ($members as $member) {
            $user = $doctrine->getRepository(User::class)->findOneBy(['username' => $member]);
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


    #[Route('/api/conversation/delete/{id}', name: 'app_conversation_delete')]
    public function delete_conversation(Request $request, ManagerRegistry $doctrine): Response
    {

        $datas = $request->getContent();
        $datas = json_decode($datas, true);
        $id = $datas['conv_id'];
        
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

    #[Route('/api/conversation', name: 'app_conversation_get')]
    public function get_conversation(Request $request, ManagerRegistry $doctrine): Response
    {

        $datas = $request->getContent();
        $datas = json_decode($datas, true);
        $id = $datas['conv_id'];

        if (!$id) {
            return $this->json([
                'message' => 'Please provide a conversation id',
            ], 400);
        }

        try {
            $conversation = $doctrine->getRepository(Conversation::class)->find($id);
        } catch (\Throwable $th) {
            return $this->json([
                'message' => 'Conversation not found',
            ], 400);
        }

        $user=$this->getUser();
        if (!$conversation->getMembers()->contains($user)) {
            return $this->json([
                'message' => 'Not a member of this conversation',
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

            $dateTimeImmutableToString = $message->getCreatedAt()->format('Y-m-d H:i:s');

            $dateUTC = new \DateTime($dateTimeImmutableToString, new \DateTimeZone('UTC'));
            $dateUTC->setTimezone(new \DateTimeZone('Europe/Paris'));

            $messagesList[] = [
                'id' => $conversation->getId(),
                'content' => $message->getContent(),
                'created_at' => $dateUTC,
                'author' => $message->getAuthor()->getUsername(),
            ];
        }

        $cookie = $this->cookieHelper->createMercureCookie($user);

        $rep = new Response();
        //$rep->headers->setCookie($cookie);
        $json = $this->json([
            "conversationData"=>$conversationData,
            "membersList"=>$membersList,
            "messagesList"=>$messagesList,
        ], 200);
        $rep->setContent($json->getContent());
        return $rep;
    }
}