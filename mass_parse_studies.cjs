const fs = require('fs');
const path = require('path');

const PENDING_DIR = path.join('processed-studies');
const YOES_JSON_PATH = path.join('src', 'data', 'yoes.json');

// Read existing yoes
let yoes = [];
try {
    yoes = JSON.parse(fs.readFileSync(YOES_JSON_PATH, 'utf8'));
} catch (e) {
    console.error('Error reading yoes.json:', e);
    process.exit(1);
}

// Function to generate a slug from a filename
function getSlug(filename) {
    return filename
        .toLowerCase()
        .replace(/\.txt$/, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
}

// Function to clean title
function cleanTitle(title) {
    return title
        .replace(/^Estudio estructural y causal del agregado psicológico:\s+/i, '')
        .replace(/^Estudio estructural y causal del\s+/i, '')
        .replace(/^Estudio estructural del\s+/i, '')
        .replace(/^Manual de estudio profundo del\s+/i, '')
        .replace(/^Estudio del\s+/i, '')
        .replace(/^agregado:\s+/i, '')
        .replace(/^El\s+/i, '')
        .replace(/\s+$/g, '')
        .trim();
}

// Function to parse a study file
function parseStudyFile(filePath) {
    const filename = path.basename(filePath);
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.split('\n').map(l => l.trim());
    
    const content = [];
    let currentList = null;
    let title = filename.replace(/\.txt$/, '');
    let summary = '';

    function flushList() {
        if (currentList && currentList.length > 0) {
            content.push({ type: 'list', items: currentList });
            currentList = null;
        }
    }

    lines.forEach((line, index) => {
        if (!line) return;

        // Extract title from first line if it's a heading
        if (index === 0 && (line.startsWith('#') || line.startsWith('Estudio'))) {
            title = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
            title = cleanTitle(title);
            return;
        }

        // Detect main parts (Markdown or text markers)
        if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('---') || line.startsWith('##')) {
            flushList();
            if (line.startsWith('---')) return;
            const headingText = line.replace(/^#+\s*/, '').replace(/\*+/g, '').replace(/^[🔹\d\.\s]+/, '').trim();
            if (headingText) {
                content.push({ type: 'heading', level: 2, text: headingText });
            }
        } 
        // Detect subheadings
        else if (line.startsWith('### ') || (line.includes(':') && line.length < 60 && !line.startsWith('*'))) {
            flushList();
            const headingText = line.replace(/^#+\s*/, '').replace(/\*+/g, '').replace(/^[🔹\d\.\s]+/, '').trim();
            if (headingText) {
                content.push({ type: 'heading', level: 3, text: headingText });
            }
        } 
        // Detect list items
        else if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('') || line.startsWith(' ')) {
            if (!currentList) currentList = [];
            currentList.push(line.replace(/^[*\-]\s*/, '').replace(/\*+/g, '').trim());
        } 
        // Detect quotes
        else if (line.startsWith('> ')) {
            flushList();
            content.push({ type: 'quote', text: line.replace(/^>\s*/, '').replace(/\*+/g, '').trim() });
        } 
        // Default to paragraph
        else {
            flushList();
            // Try to extract summary from first long paragraph
            if (!summary && line.length > 50 && line.length < 300) {
                summary = line.replace(/\*+/g, '').trim();
            }
            content.push({ type: 'paragraph', text: line.replace(/\*+/g, '').trim() });
        }
    });
    flushList();

    if (!summary) summary = `Estudio profundo sobre el ${title}.`;

    return {
        id: getSlug(filename),
        collection: 'yoes',
        title: title,
        summary: summary,
        tags: [title.toLowerCase().replace('yo de la ', '').replace('yo de ', ''), 'psicología', 'ego'],
        related: [],
        status: 'completo',
        source: filename,
        missingSource: false,
        content: content
    };
}

// Process all files in the pending directory
const files = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.txt'));

files.forEach(file => {
    console.log(`Processing ${file}...`);
    const filePath = path.join(PENDING_DIR, file);
    const study = parseStudyFile(filePath);
    
    // Add or update
    const index = yoes.findIndex(y => y.id === study.id);
    if (index !== -1) {
        yoes[index] = study;
        console.log(`Updated ${study.id}`);
    } else {
        yoes.push(study);
        console.log(`Added ${study.id}`);
    }
});

// Write back to yoes.json
fs.writeFileSync(YOES_JSON_PATH, JSON.stringify(yoes, null, 2), 'utf8');
console.log('Successfully updated yoes.json with all pending studies.');
