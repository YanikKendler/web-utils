const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'dist', 'esm');

function renameDir(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) {
            renameDir(full);
            continue;
        }
        if (entry.isFile() && entry.name.endsWith('.js')) {
            const target = full.slice(0, -3) + '.mjs';
            if (fs.existsSync(target)) fs.unlinkSync(target);
            fs.renameSync(full, target);
            // optional: console.log(`renamed ${full} -> ${target}`);
        }
    }
}

renameDir(dir);
process.exit(0);