const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(file, 'utf8');
      
      const regex = /href=(?:\"|\')([^\"\']+)(?:\"|\')/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        results.push(file + ': ' + match[1]);
      }

      const regex2 = /href=\{[`\"\']([^`\"\']+)[`\"\']/g;
      let match2;
      while ((match2 = regex2.exec(content)) !== null) {
        results.push(file + ': ' + match2[1]);
      }
    }
  });
  return results;
}

const all = [...walk('app'), ...walk('components'), ...walk('lib')].sort();
all.forEach(line => console.log(line));
