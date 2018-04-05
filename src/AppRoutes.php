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
                    'upgradeAvailable' => $v->hasUpgradeAvailable()
                )
            )
        ));
    });

    $this->app->group("/api", function() {
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