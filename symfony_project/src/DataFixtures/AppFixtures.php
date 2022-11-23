<?php

namespace App\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Factory\UserFactory;
use App\Factory\ConversationFactory;
use App\Factory\MessageFactory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(5);
        ConversationFactory::createMany(10);
        MessageFactory::createMany(50);

        $manager->flush();
    }
}