const { execSync } = require("child_process");
const fs = require("fs");

const version = process.argv[2];
if (!version) throw new Error("Version argument required");

const wrappers = [
    { path: "packages/openbridge-webcomponents-vue" },
    { path: "packages/openbridge-webcomponents-svelte" },
    { path: "packages/openbridge-webcomponents-react" },
    { path: "packages/openbridge-webcomponents-ng", publishFrom: "dist" },
];

for (const wrapper of wrappers) {
    const pkgPath = `${wrapper.path}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.version = version;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`Set ${pkg.name} to ${version}`);

    execSync("npm run build", { cwd: wrapper.path, stdio: "inherit" });

    // For Angular: inject version into the dist package.json too
    if (wrapper.publishFrom) {
        const distPkgPath = `${wrapper.path}/${wrapper.publishFrom}/package.json`;
        const distPkg = JSON.parse(fs.readFileSync(distPkgPath, "utf8"));
        distPkg.version = version;
        fs.writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + "\n");
    }
}