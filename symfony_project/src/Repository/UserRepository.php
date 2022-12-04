<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);

        $this->save($user, true);
    }

    /**
     * @return Conversation[] Returns an array of Conversation objects
     * Made to get all conversations of a user
     */
    public function findConversationsByUser(User $user): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT `conversation_id` 
            FROM `conversation_user` 
            WHERE `user_id` = :user_id;
        ';

        $stmt = $conn->prepare($sql);
        $resNotClean = $stmt->executeQuery(['user_id' => $user->getId()])->fetchAllAssociative();

        $cleanRes = [];
        foreach ($resNotClean as $res) {
            $cleanRes[] = $res['conversation_id'];
        }
    
        return $cleanRes;
    }

    /**
     * @return User[] Returns an array of User objects
     * Made to find all the users matching the search
     */
    public function findUsersBySearch(string $search): array
    {
        $conn = $this->getEntityManager()->getConnection();

        //Search in username, lastname , firstname and email
        $sql = '
            SELECT * 
            FROM `user` 
            WHERE `username` LIKE :search
            OR `lastname` LIKE :search
            OR `firstname` LIKE :search
            OR `email` LIKE :search;
        ';

        $stmt = $conn->prepare($sql);
        $resNotClean = $stmt->executeQuery(['search' => '%'.$search.'%'])->fetchAllAssociative();

        $cleanRes = [];
        foreach ($resNotClean as $res) {
            $cleanRes[] = [
                'id' => $res['id'],
                'username' => $res['username'],
                'firstname' => $res['firstname'],
                'lastname' => $res['lastname'],
            ];
        }
    
        return $cleanRes;
    }


     

//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}