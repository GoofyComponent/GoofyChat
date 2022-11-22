<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use symfony\component\security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]

    private int $id;

    #[ORM\Column(type:"string", length: 255)]

    private string $content;

    #[ORM\ManyToOne(targetEntity:User::class, inversedBy:"messages")]
    #[ORM\JoinColumn(nullable: false)]

    private UserInterface $author;

    #[ORM\Column(type:"datetime_immutable")]

    private \DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(targetEntity:Channel::class, inversedBy:"messages")]
    #[ORM\JoinColumn(nullable: false)]

    private Channel $channel;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->Message;
    }

    public function setMessage(string $Message): self
    {
        $this->Message = $Message;

        return $this;
    }
}
