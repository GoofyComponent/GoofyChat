<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 *
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function save(Message $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Message $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array Return an array
     * @param int $conv_id
     * Return an object with the last message of the conversation
     */
    public function getLastMessage(int $conv_id): array
    {
        //Select the last message in the message table when 'conversation_id' is equal to $conv_id
        
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT * FROM message
            WHERE conversation_id = :conv_id
            ORDER BY id DESC
            LIMIT 1
        ';

        $stmt = $conn->prepare($sql);
        $resNotClean = $stmt->executeQuery(['conv_id' => $conv_id])->fetchAllAssociative();

        //if the conversation has no message, return an empty array
        if (empty($resNotClean)) {
            return [
            'message' => "",
            'author' => "",
            'date' => "",
        ];
        }

        $sqlForUsername = '
            SELECT username FROM user
            WHERE id = :user_id
        ';

        $stmtForUsername = $conn->prepare($sqlForUsername);
        $resNotClean[0]['username'] = $stmtForUsername->executeQuery(['user_id' => $resNotClean[0]['author_id']])->fetchAssociative()['username'];

        $dateUTC = new \DateTime($resNotClean[0]['created_at']);
        $dateUTC->setTimezone(new \DateTimeZone('Europe/Paris'));

        $res = [
            'message' => $resNotClean[0]['content'],
            'author' => $resNotClean[0]['username'],
            'date' => $dateUTC
        ];

        return $res;
    }

//    /**
//     * @return Message[] Returns an array of Message objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Message
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}