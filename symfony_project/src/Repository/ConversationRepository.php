<?php

namespace App\Repository;

use App\Entity\Conversation;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Conversation>
 *
 * @method Conversation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Conversation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Conversation[]    findAll()
 * @method Conversation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConversationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Conversation::class);
    }

    public function save(Conversation $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Conversation $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return boolean Return a boolean
     * @param string $conv_name
     * Return true if the conversation name already exists
     */
    public function checkConvName(string $conv_name): bool
    {
        $result = $this->createQueryBuilder('c')
            ->andWhere('c.name = :val')
            ->setParameter('val', $conv_name)
            ->getQuery()
            ->getResult()
        ;

        if (empty($result)) {
            return false;
        }

        return true;
    }

    /**
     * @return int Return an int equivalent to the conversation id or 0 if not found
     * @param array $listOfUsers
     * Return true if a conversation exists between every users, else return false
     */
    public function conversationExists(array $listOfUsers): int
    {
        //Get all the conversations of the first user
        $firstUser = $listOfUsers[0];
        $firstUser = $this->getEntityManager()->getRepository(User::class)->findOneBy(['username' => $firstUser]);
        $conversations = $firstUser->getConversations();

        $isExisting = 0;

        //For each conversation, extract the members
        foreach ($conversations as $conversation) {
            if($isExisting) {
                break;
            }
            $members = $conversation->getMembers();

            $arrayOfConv = [];
            foreach ($members as $member) {
                $arrayOfConv[] = $member->getUsername();
            }

            if(count($arrayOfConv) === count($listOfUsers)) {
                foreach ($listOfUsers as $user) {
                    if(!in_array($user, $arrayOfConv)) {
                        $isExisting = 0;
                        break;
                    }
                    $isExisting = $conversation->getId();
                }
            }
        }

        return $isExisting;
    }

//    /**
//     * @return Conversation[] Returns an array of Conversation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Conversation
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}