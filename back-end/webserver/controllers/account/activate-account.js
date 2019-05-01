'use strict'

const User = require('../../../models/users');

function pageHTML() {
  let html = `<!doctype html>
  <!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Gdi, Gestión de inmovilizado</title>
<base href="/">
<meta name="descritpion" content="Gestiona los bienes de tu empresa en manos de tus empleados">
<meta name="author" content="Ángel Téllez"></meta>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

</head>
<body>
<header class="mt-2">
<div class="container">
    <div class="row">

      <div class="col-12">
         <nav class="nav justify-content-center">
          <a class="nav-link active text-secondary" href="/welcome">HOME</a>
          <a class="nav-link text-secondary" href="/about">SOBRE GDI</a>
        </nav>    
      </div>
    </div>

</div>
</header>

<main class="container mt-5">
<section class="row justify-content-center text-center">
  <article class="col-12 col-md-6">
    <header> 
      <h1 class="font-weigth-light"> GDI </h1> 
      <h2 class="text-muted"> Gestiona de una manera sencilla el inmovilizado de tu empresa</h2>
    </header>
    <main class="text-center mt-3">
      <p class="alert alert-primary">¡Empieza ahora!</p>  
    </main>
  </article>
</section>

<section class="row justify-content-center mt-3">
  <div class="col-12 col-md-6">
    Tu cuenta ha sido activda! Haz <a href="http://localhost:4200/welcome">login</a> para empezar a crear bienes y empleados para tu empresa.

  </div>
</section>

</main>
</body>
</html>
`;
  return html;
}

async function activate(req, res, next) {

  const { verification_code: verificationCode } = req.query;

  if (!verificationCode) {
    return res.status(400).json({
      message: 'invalid verification code',
      target: 'verification_code',
    });
  }


  try {
    const query = { verificationCode: verificationCode };
    const today = new Date();
    const userActivate = await User.findOneAndUpdate(query, { confirmAt: today });
    res.status(200).send(pageHTML());
    //res.status(200).send(`Cuenta activada ${userActivate}`);
  } catch (e) {
    res.status(500).send(`Error, en la base de datos. ${e}`);
  }

}

module.exports = {
  activate
}