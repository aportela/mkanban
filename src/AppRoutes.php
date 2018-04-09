<?php
    declare(strict_types=1);

    use Slim\Http\Request;
    use Slim\Http\Response;

    $this->app->get('/', function (Request $request, Response $response, array $args) {
        $this->logger->info($request->getOriginalMethod() . " " . $request->getUri()->getPath());
        $v = new \mKanban\Database\Version(new \mKanban\Database\DB($this), $this->get('settings')['database']['type']);
        return $this->view->render($response, 'index.html.twig', array(
            'settings' => $this->settings["twigParams"],
            'initialState' => json_encode(
                array(
                    'upgradeAvailable' => $v->hasUpgradeAvailable(),
                    'logged' => \mKanban\UserSession::isLogged(),
                    'allowSignUp' => $this->get('settings')['common']['allowSignUp']
                )
            )
        ));
    });

    $this->app->group("/api", function() {
        $this->group("/user", function() {
            $this->post('/signin', function (Request $request, Response $response, array $args) {
                $u = new \mKanban\User("", $request->getParam("email", ""), $request->getParam("password", ""));
                if ($u->login(new \mKanban\Database\DB($this))) {
                    return $response->withJson(['logged' => true], 200);
                } else {
                    return $response->withJson(['logged' => false], 401);
                }
            });

            $this->post('/signup', function (Request $request, Response $response, array $args) {
                if ($this->get('settings')['common']['allowSignUp']) {
                    $dbh = new \mKanban\Database\DB($this);
                    $u = new \mKanban\User(
                        "",
                        $request->getParam("email", ""),
                        $request->getParam("password", ""),
                        $request->getParam("email", "")
                    );
                    $exists = false;
                    try {
                        $u->get($dbh);
                        $exists = true;
                    } catch (\mKanban\Exception\NotFoundException $e) {
                    }
                    if ($exists) {
                        return $response->withJson([], 409);
                    } else {
                        $u->id = (\Ramsey\Uuid\Uuid::uuid4())->toString();
                        $u->add($dbh);
                        return $response->withJson([], 200);
                    }
                } else {
                    throw new \mKanban\Exception\AccessDeniedException("");
                }
            });

            $this->get('/signout', function (Request $request, Response $response, array $args) {
                \mKanban\User::logout();
                return $response->withJson(['logged' => false], 200);
            });
        });
        $this->group("/boards", function() {
            $this->get("/", function (Request $request, Response $response, array $args) {
                $boards = \mKanban\Board::search();
                return $response->withJson(['success' => true, 'boards' => $boards], 200);
            });
            $this->get("/{id}", function (Request $request, Response $response, array $args) {
                $board = array(
                    "id" => $args["id"],
                    "name" => "default board",
                    "lists" => array()
                );
                return $response->withJson(['success' => true, 'board' => $board], 200);
            });
        });
        $this->get('/poll', function (Request $request, Response $response, array $args) {
            return $response->withJson(['success' => true], 200);
        });
    })->add(new \mKanban\Middleware\APIExceptionCatcher($this->app->getContainer()));

?>