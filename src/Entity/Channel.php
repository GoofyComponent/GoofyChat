<?php

namespace App\Entity;

use App\Repository\ChannelRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
class Channel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]

    private int $id;

    #[ORM\Column(type:"string", length: 255)]

    private string $name;

    #[ORM\OneToMany(mappedBy: "channel", targetEntity: Message::class, orphanRemoval: true)]

    private Collection $messages;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChannel(): ?string
    {
        return $this->Channel;
    }

    public function setChannel(string $Channel): self
    {
        $this->Channel = $Channel;

        return $this;
    }
}
