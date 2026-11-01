//AI

const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '..', 'dist', 'esm');
if (!fs.existsSync(esmDir)) {
    console.error('Directory not found:', esmDir);
    process.exit(1);
}

function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.isFile() && /(\.js|\.mjs|\.d\.ts)$/.test(full)) fixFile(full);
    }
}

// './foo' -> './foo.mjs', './dir' -> './dir/index.mjs'
function withExtension(filePath, rel) {
    if (/\.[a-z0-9]+$/i.test(rel)) return rel; // already has extension
    const abs = path.resolve(path.dirname(filePath), rel);
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
        return rel.replace(/\/$/, '') + '/index.mjs';
    }
    return rel + '.mjs';
}

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;

    // from '...', import('...') and side-effect import '...'
    content = content.replace(
        /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"]+)\2/g,
        (m, prefix, quote, rel) => `${prefix}${quote}${withExtension(filePath, rel)}${quote}`
    );

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched imports in', filePath);
    }

    // .d.ts -> .d.mts, .js -> .mjs
    let dest = null;
    if (filePath.endsWith('.d.ts')) dest = filePath.replace(/\.d\.ts$/, '.d.mts');
    else if (filePath.endsWith('.js')) dest = filePath.replace(/\.js$/, '.mjs');

    if (dest) {
        if (fs.existsSync(dest)) {
            fs.unlinkSync(filePath);
            console.log('Removed original (dest existed):', filePath);
        } else {
            fs.renameSync(filePath, dest);
            console.log('Renamed', filePath, '->', dest);
        }
    }
}

walk(esmDir);
console.log('Done.');