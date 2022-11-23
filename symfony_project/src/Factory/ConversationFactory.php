<?php

namespace App\Factory;

use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @extends ModelFactory<Conversation>
 *
 * @method static Conversation|Proxy createOne(array $attributes = [])
 * @method static Conversation[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Conversation[]|Proxy[] createSequence(array|callable $sequence)
 * @method static Conversation|Proxy find(object|array|mixed $criteria)
 * @method static Conversation|Proxy findOrCreate(array $attributes)
 * @method static Conversation|Proxy first(string $sortedField = 'id')
 * @method static Conversation|Proxy last(string $sortedField = 'id')
 * @method static Conversation|Proxy random(array $attributes = [])
 * @method static Conversation|Proxy randomOrCreate(array $attributes = [])
 * @method static Conversation[]|Proxy[] all()
 * @method static Conversation[]|Proxy[] findBy(array $attributes)
 * @method static Conversation[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static Conversation[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static ConversationRepository|RepositoryProxy repository()
 * @method Conversation|Proxy create(array|callable $attributes = [])
 */
final class ConversationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();

        // TODO inject services if required (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services)
    }

    protected function getDefaults(): array
    {
        return [
            // TODO add your default values here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories)
            'name' => self::faker()->text(),
            'createdAt' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'members' => UserFactory::randomRange(3, 3)
        ];
    }

    protected function initialize(): self
    {
        // see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
        return $this
            // ->afterInstantiate(function(Conversation $conversation): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Conversation::class;
    }
}