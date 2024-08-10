const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configurar o diretório estático para servir as imagens
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Configurar o EJS como motor de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para listar e visualizar imagens e pastas
app.get('/', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/images');
  const currentPath = req.query.path || ''; // Obter o caminho atual
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 20; // Número de itens por página
  const offset = (page - 1) * limit;

  fs.readdir(path.join(directoryPath, currentPath), { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).send('Não foi possível listar os arquivos.');
    }

    // Separar arquivos e pastas
    const directories = files.filter(file => file.isDirectory()).slice(offset, offset + limit).map(file => file.name);
    const imageFiles = files.filter(file => file.isFile() && /\.(svg|jpg|jpeg|png)$/i.test(file.name)).slice(offset, offset + limit).map(file => file.name);

    // Preparar URLs de navegação
    const parentPath = currentPath ? path.dirname(currentPath) : '';
    const imageUrls = imageFiles.map(image => `/images/${path.join(currentPath, image)}`);
    const directoryUrls = directories.map(directory => `?path=${encodeURIComponent(path.join(currentPath, directory))}`);

    res.render('index', {
      directories: directoryUrls,
      images: imageUrls,
      currentPath: encodeURIComponent(currentPath),
      parentPath: encodeURIComponent(parentPath),
      page,
      totalPages: Math.ceil((directories.length + imageFiles.length) / limit)
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
