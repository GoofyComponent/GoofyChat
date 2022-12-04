<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;

class GeneralController extends AbstractController
{
    #[Route('/api/search-contact', name: 'search-contact', methods: ['POST'])]
    public function allContacts(UserRepository $UserRepository, Request $request): Response
    {
        $data = $request->getContent();
        $data = json_decode($data, true);
        $search = $data['search'];

        $results = $UserRepository->findUsersBySearch($search);

        //If no results, return null
        if (empty($results)) {
            return $this->json([
                'results' => null,
            ], 200);
        }
        
        return $this->json([
            'results' => $results,
        ], 200);
    }
}