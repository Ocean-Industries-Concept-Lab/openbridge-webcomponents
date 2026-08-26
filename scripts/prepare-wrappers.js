const { execSync } = require("child_process");
const fs = require("fs");

const version = process.argv[2];
if (!version) throw new Error("Version argument required");

const CORE_PACKAGE = "@oicl/openbridge-webcomponents";

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

    // The core dependency is written by fix-generated.cjs during `build:full`,
    // which runs before semantic-release bumps the core version. Left alone it
    // would pin the previous release, so re-point it at the version being
    // published.
    if (pkg.dependencies?.[CORE_PACKAGE]) {
        pkg.dependencies[CORE_PACKAGE] = `^${version}`;
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`Set ${pkg.name} to ${version} (core ^${version})`);

    execSync("npm run build", { cwd: wrapper.path, stdio: "inherit" });

    // For Angular: inject version into the dist package.json too. ng-packagr
    // copies these fields from the source manifest, but patch them here as well
    // so the published manifest is correct regardless of build ordering.
    if (wrapper.publishFrom) {
        const distPkgPath = `${wrapper.path}/${wrapper.publishFrom}/package.json`;
        const distPkg = JSON.parse(fs.readFileSync(distPkgPath, "utf8"));
        distPkg.version = version;
        if (distPkg.dependencies?.[CORE_PACKAGE]) {
            distPkg.dependencies[CORE_PACKAGE] = `^${version}`;
        }
        fs.writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + "\n");
    }
}