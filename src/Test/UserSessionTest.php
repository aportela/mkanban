<?php

    declare(strict_types=1);

    namespace mKanban\Test;

    require_once dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

    final class UserSessionTest extends \PHPUnit\Framework\TestCase
    {
        static private $app = null;
        static private $container = null;
        static private $dbh = null;

        /**
         * Called once just like normal constructor
         */
        public static function setUpBeforeClass () {
            self::$app = (new \mKanban\App())->get();
            self::$container = self::$app->getContainer();
            self::$dbh = new \mKanban\Database\DB(self::$container);
        }

        /**
         * Initialize the test case
         * Called for every defined test
         */
        public function setUp() {
            self::$dbh->beginTransaction();
        }

        /**
         * Clean up the test case, called for every defined test
         */
        public function tearDown() {
            self::$dbh->rollBack();
        }

        /**
         * Clean up the whole test class
         */
        public static function tearDownAfterClass() {
            self::$dbh = null;
            self::$container = null;
            self::$app = null;
        }

        public function testIsLoggedWithoutSession(): void {
            \mKanban\User::logout();
            $this->assertFalse(\mKanban\UserSession::isLogged());

        }

        public function testIsLogged(): void {
            $id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
            $u = new \mKanban\User($id, $id . "@server.com", "secret", $id, "");
            $u->add(self::$dbh);
            $u->login(self::$dbh);
            $this->assertTrue(\mKanban\UserSession::isLogged());
        }

        public function testGetUserIdWithoutSession(): void {
            \mKanban\User::logout();
            $this->assertNull(\mKanban\UserSession::getUserId());

        }

        public function testGetUserId(): void {
            \mKanban\User::logout();
            $id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
            $u = new \mKanban\User($id, $id . "@server.com", "secret", $id, "");
            $u->add(self::$dbh);
            $u->login(self::$dbh);
            $this->assertEquals($u->id, \mKanban\UserSession::getUserId());
        }

        public function testGetEmailWithoutSession(): void {
            \mKanban\User::logout();
            $this->assertNull(\mKanban\UserSession::getEmail());

        }

        public function testGetEmail(): void {
            \mKanban\User::logout();
            $id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
            $u = new \mKanban\User($id, $id . "@server.com", "secret", $id, "");
            $u->add(self::$dbh);
            $u->login(self::$dbh);
            $this->assertEquals($u->email, \mKanban\UserSession::getEmail());
        }

        public function testGetNickWithoutSession(): void {
            \mKanban\User::logout();
            $this->assertNull(\mKanban\UserSession::getNick());

        }

        public function testGetNick(): void {
            \mKanban\User::logout();
            $id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
            $u = new \mKanban\User($id, $id . "@server.com", "secret", $id, "");
            $u->add(self::$dbh);
            $u->login(self::$dbh);
            $this->assertEquals($u->nick, \mKanban\UserSession::getNick());
        }

        public function testGetAvatarWithoutSession(): void {
            \mKanban\User::logout();
            $this->assertNull(\mKanban\UserSession::getAvatarUrl());
        }

        public function testGetAvatar(): void {
            \mKanban\User::logout();
            $id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
            $u = new \mKanban\User($id, $id . "@server.com", "secret", $id, "http://avat.ar");
            $u->add(self::$dbh);
            $u->login(self::$dbh);
            $this->assertEquals($u->avatarUrl, \mKanban\UserSession::getAvatarUrl());
        }

    }
?>