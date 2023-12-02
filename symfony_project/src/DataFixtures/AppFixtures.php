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
        
        $user = UserFactory::createOne([
            'email' => 'test@test.fr',
            'roles' => [],
            'password' => password_hash('test', PASSWORD_BCRYPT),
            'lastname' => 'test',
            'firstname' => 'test',
            'username' => 'test',
        ]);

        UserFactory::createMany(5);
        ConversationFactory::createMany(10);
        MessageFactory::createMany(50);

        $manager->flush();
    }
}