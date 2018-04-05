<?php
    declare(strict_types=1);

    use Slim\Http\Request;
    use Slim\Http\Response;

    $this->app->get('/', function (Request $request, Response $response, array $args) {
        $this->logger->info($request->getOriginalMethod() . " " . $request->getUri()->getPath());
        return $this->view->render($response, 'index.html.twig', array(
            'settings' => $this->settings["twigParams"],
            'initialState' => json_encode(array())
        ));
    });

    $this->app->get('/api/poll', function (Request $request, Response $response, array $args) {
        return $response->withJson(['success' => true], 200);
    })->add(new \mKanban\Middleware\APIExceptionCatcher($this->app->getContainer()));

?>