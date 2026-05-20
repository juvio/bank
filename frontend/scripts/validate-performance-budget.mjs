import { existsSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, '..');
const defaultBudgetPath = path.join(rootDir, 'performance-budget.json');
const defaultNextDir = path.join(rootDir, '.next');

const STATIC_PREFIX = 'static/';
const JS_OR_CSS = /\.(js|css)$/;

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function toKb(bytes) {
  return Math.round((bytes / 1024) * 10) / 10;
}

export function getGzipSizeKb(filePath) {
  return toKb(gzipSync(readFileSync(filePath)).byteLength);
}

export function normalizeManifestFile(file) {
  return file.startsWith(STATIC_PREFIX) ? file : file.replace(/^\/_next\//, '');
}

export function isStaticAsset(file) {
  return normalizeManifestFile(file).startsWith(STATIC_PREFIX) && JS_OR_CSS.test(file);
}

export function collectAppManifestFiles(appManifest, routeConfig) {
  const pages = appManifest?.pages ?? {};
  const exactKey = routeConfig.manifestKeys?.find((key) => Array.isArray(pages[key]));

  if (exactKey) {
    return pages[exactKey];
  }

  const suffixKey = Object.keys(pages).find((key) =>
    routeConfig.manifestKeys?.some((manifestKey) => key.endsWith(manifestKey)),
  );

  return suffixKey ? pages[suffixKey] : [];
}

export function collectBuildManifestSharedFiles(buildManifest) {
  const lowPriorityFiles = buildManifest?.lowPriorityFiles ?? [];
  const rootMainFiles = buildManifest?.rootMainFiles ?? [];
  const polyfillFiles = buildManifest?.polyfillFiles ?? [];

  return [...lowPriorityFiles, ...rootMainFiles, ...polyfillFiles];
}

export function uniqueStaticFiles(files) {
  return [...new Set(files.map(normalizeManifestFile).filter(isStaticAsset))];
}

export function calculateFilesSizeKb(files, nextDir) {
  return files.reduce((total, file) => {
    const filePath = path.join(nextDir, file);

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      return total;
    }

    return total + getGzipSizeKb(filePath);
  }, 0);
}

export function validateBudget({ budget, appManifest, buildManifest, nextDir }) {
  const sharedFiles = uniqueStaticFiles(collectBuildManifestSharedFiles(buildManifest));
  const sharedSizeKb = toKb(calculateFilesSizeKb(sharedFiles, nextDir));
  const routeResults = budget.routes.map((routeConfig) => {
    const routeFiles = uniqueStaticFiles([
      ...sharedFiles,
      ...collectAppManifestFiles(appManifest, routeConfig),
    ]);
    const sizeKb = toKb(calculateFilesSizeKb(routeFiles, nextDir));

    return {
      route: routeConfig.route,
      sizeKb,
      maxFirstLoadJsKb: routeConfig.maxFirstLoadJsKb,
      passed: sizeKb <= routeConfig.maxFirstLoadJsKb,
      filesFound: routeFiles.length,
    };
  });

  return {
    shared: {
      sizeKb: sharedSizeKb,
      maxFirstLoadJsKb: budget.sharedMaxFirstLoadJsKb,
      passed: sharedSizeKb <= budget.sharedMaxFirstLoadJsKb,
      filesFound: sharedFiles.length,
    },
    routes: routeResults,
    passed:
      sharedSizeKb <= budget.sharedMaxFirstLoadJsKb &&
      routeResults.every((result) => result.passed && result.filesFound > 0),
  };
}

function loadBuildArtifacts(nextDir) {
  const appManifestPath = path.join(nextDir, 'app-build-manifest.json');
  const buildManifestPath = path.join(nextDir, 'build-manifest.json');

  if (!existsSync(appManifestPath) || !existsSync(buildManifestPath)) {
    throw new Error(
      'Build artifacts not found. Run `npm run build:staging` before `npm run perf:budget`.',
    );
  }

  return {
    appManifest: readJson(appManifestPath),
    buildManifest: readJson(buildManifestPath),
  };
}

function printResult(result) {
  const sharedStatus = result.shared.passed ? 'PASS' : 'FAIL';
  console.log(
    `${sharedStatus} shared static assets: ${result.shared.sizeKb} kB / ${result.shared.maxFirstLoadJsKb} kB`,
  );

  for (const route of result.routes) {
    const status = route.passed && route.filesFound > 0 ? 'PASS' : 'FAIL';
    const filesMessage = route.filesFound > 0 ? '' : ' (no manifest files found)';
    console.log(
      `${status} ${route.route}: ${route.sizeKb} kB / ${route.maxFirstLoadJsKb} kB${filesMessage}`,
    );
  }
}

export function run({ budgetPath = defaultBudgetPath, nextDir = defaultNextDir } = {}) {
  const budget = readJson(budgetPath);
  const { appManifest, buildManifest } = loadBuildArtifacts(nextDir);
  const result = validateBudget({ budget, appManifest, buildManifest, nextDir });

  printResult(result);

  if (!result.passed) {
    process.exitCode = 1;
  }

  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}
