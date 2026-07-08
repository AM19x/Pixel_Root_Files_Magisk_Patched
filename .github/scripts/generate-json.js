const fs = require('fs');
const path = require('path');

// ─── CONFIGURATION ──────────────────────────────────────────────────────
const SOURCE_URL = 'https://gsm6.com/gsm6-pixel-tool-pro/';
const SOURCE_NAME = 'GSM6 Pixel Tool Pro';
const REPO_URL = 'https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched';
const COMMUNITY_PAGE = 'https://gsm6.com/gsm6-pixel-tool-pro/#server-backup-feature';

// ─── SCAN THE REPO ──────────────────────────────────────────────────────

function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const result = {};

    for (const item of items) {
        if (item.name === '.git' || item.name === '.github' || item.name === 'pixel-root-files.json') continue;
        if (item.name.startsWith('.')) continue;

        const fullPath = path.join(dir, item.name);
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
            const subItems = scanDirectory(fullPath, relativePath);
            if (Object.keys(subItems).length > 0) {
                result[item.name] = subItems;
            }
        } else if (item.isFile() && (item.name.endsWith('.zip') || item.name.endsWith('.img'))) {
            const stats = fs.statSync(fullPath);
            const parentFolder = basePath.split('/').pop();
            const grandParent = basePath.split('/')[0];

            if (basePath && basePath.includes('/')) {
                const downloadUrl = `https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/${relativePath}`;
                
                if (!result[grandParent]) result[grandParent] = {};
                if (!result[grandParent][parentFolder]) result[grandParent][parentFolder] = [];
                result[grandParent][parentFolder].push({
                    filename: item.name,
                    url: downloadUrl,
                    size: stats.size,
                    size_mb: (stats.size / 1024 / 1024).toFixed(2)
                });
            }
        }
    }

    return result;
}

// ─── SCAN UPLOADS FOLDER (if exists) ──────────────────────────────────

const uploadsDir = './uploads';
let devices = {};

if (fs.existsSync(uploadsDir)) {
    const topLevel = fs.readdirSync(uploadsDir, { withFileTypes: true });
    for (const item of topLevel) {
        if (item.isDirectory() && !item.name.startsWith('.')) {
            const devicePath = path.join(uploadsDir, item.name);
            const builds = fs.readdirSync(devicePath, { withFileTypes: true });
            devices[item.name] = {};
            for (const build of builds) {
                if (build.isDirectory() && !build.name.startsWith('.')) {
                    const buildPath = path.join(devicePath, build.name);
                    const files = fs.readdirSync(buildPath);
                    const zipFiles = files.filter(f => f.endsWith('.zip') || f.endsWith('.img'));
                    if (zipFiles.length > 0) {
                        devices[item.name][build.name] = [];
                        for (const file of zipFiles) {
                            const filePath = path.join(buildPath, file);
                            const stats = fs.statSync(filePath);
                            const downloadUrl = `https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/uploads/${item.name}/${build.name}/${file}`;
                            devices[item.name][build.name].push({
                                filename: file,
                                url: downloadUrl,
                                size: stats.size,
                                size_mb: (stats.size / 1024 / 1024).toFixed(2)
                            });
                        }
                    }
                }
            }
        }
    }
} else {
    // Fallback: scan root directories
    const rootItems = fs.readdirSync('.', { withFileTypes: true });
    for (const item of rootItems) {
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'uploads' && item.name !== '.git' && item.name !== '.github') {
            const devicePath = path.join('.', item.name);
            const builds = fs.readdirSync(devicePath, { withFileTypes: true });
            devices[item.name] = {};
            for (const build of builds) {
                if (build.isDirectory() && !build.name.startsWith('.')) {
                    const buildPath = path.join(devicePath, build.name);
                    const files = fs.readdirSync(buildPath);
                    const zipFiles = files.filter(f => f.endsWith('.zip') || f.endsWith('.img'));
                    if (zipFiles.length > 0) {
                        devices[item.name][build.name] = [];
                        for (const file of zipFiles) {
                            const filePath = path.join(buildPath, file);
                            const stats = fs.statSync(filePath);
                            const downloadUrl = `https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/${item.name}/${build.name}/${file}`;
                            devices[item.name][build.name].push({
                                filename: file,
                                url: downloadUrl,
                                size: stats.size,
                                size_mb: (stats.size / 1024 / 1024).toFixed(2)
                            });
                        }
                    }
                }
            }
        }
    }
}

// ─── BUILD THE JSON ────────────────────────────────────────────────────

let totalDevices = 0;
let totalBuilds = 0;
let totalFiles = 0;

for (const device of Object.keys(devices)) {
    const builds = Object.keys(devices[device]);
    totalDevices++;
    totalBuilds += builds.length;
    for (const build of builds) {
        totalFiles += devices[device][build].length;
    }
}

const jsonData = {
    source: {
        name: SOURCE_NAME,
        url: SOURCE_URL,
        repo: REPO_URL
    },
    community: {
        contribute_url: COMMUNITY_PAGE,
        tool_name: SOURCE_NAME,
        tool_download: SOURCE_URL,
        how_to_contribute: [
            "1. Download and install GSM6 Pixel Tool Pro",
            "2. Root your Pixel device using the Direct Root method",
            "3. After successful root, the tool will ask to upload the file",
            "4. Click 'Yes' to share your root file with the community",
            "5. Your file will be available for everyone within a few hours"
        ],
        magisk_version: "30.7",
        support_link: "https://gsm6.com/support/"
    },
    generated_at: new Date().toISOString(),
    total_devices: totalDevices,
    total_builds: totalBuilds,
    total_files: totalFiles,
    devices: devices
};

// ─── WRITE THE JSON FILE ───────────────────────────────────────────────

fs.writeFileSync('pixel-root-files.json', JSON.stringify(jsonData, null, 2));
console.log(`✅ Generated pixel-root-files.json`);
console.log(`   📱 ${totalDevices} devices`);
console.log(`   📦 ${totalBuilds} builds`);
console.log(`   📄 ${totalFiles} files`);
console.log(`   🔗 Source: ${SOURCE_URL}`);
