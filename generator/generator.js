const fs = require('fs');

const type = process.argv[2];
const name = process.argv[3];
const cName = name[0].toUpperCase() + name.slice(1);

function copyFile(origin, dest) {
  const aux = origin.split('.');
  const extension = aux[aux.length - 1];

  const data = fs.readFileSync(origin).toString();
  fs.writeFileSync(dest + 'index.' + extension, data, 'utf8');
}

if (type === 'page') {
  let data = fs.readFileSync('src/js/router.js').toString();

  // import component
  data = data.replace(/(\/\/ Pages)/, `$1\nimport ${cName} from './pages/${name}/index.js';`);

  // add route
  const route = `  {
    path: '/${name}',
    name: '${name}',
    component: ${cName}
  },`;
  data = data.replace(/(const routes = \[)/, `$1\n${route}`);

  fs.writeFileSync('src/js/router.js', data, 'utf8');
  const path = `src/js/pages/${name}/`;
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  copyFile('generator/templates/component.js', path);
  copyFile('generator/templates/component.pug', path);

  console.log('Página generada!!\n');
}
else if (type === 'component') {
  const path = `src/js/components/${name}/`;
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  copyFile('generator/templates/component.js', path);
  copyFile('generator/templates/component.pug', path);

  console.log('Component generado!!\n');
  console.log(`Importalo utilizando: import ${cName} from 'js/components/${name}';\n`);
}
else {
  console.log('Tipo no soportado!!\n');
}
