import { describe, expect, it } from 'vitest';

import {
  collectAppManifestFiles,
  normalizeManifestFile,
  toKb,
  uniqueStaticFiles,
  validateBudget,
} from './validate-performance-budget.mjs';

describe('validate-performance-budget', () => {
  it('normalizes Next asset paths', () => {
    expect(normalizeManifestFile('/_next/static/chunks/app.js')).toBe(
      'static/chunks/app.js',
    );
  });

  it('collects files from exact or suffix app manifest keys', () => {
    const appManifest = {
      pages: {
        '/(operations)/home/page': ['static/chunks/home.js'],
      },
    };

    expect(
      collectAppManifestFiles(appManifest, {
        route: '/home',
        manifestKeys: ['/home/page', '/home'],
      }),
    ).toEqual(['static/chunks/home.js']);
  });

  it('keeps only unique static js and css files', () => {
    expect(
      uniqueStaticFiles([
        '/_next/static/chunks/app.js',
        'static/chunks/app.js',
        'server/app/page.js',
        'static/css/app.css',
      ]),
    ).toEqual(['static/chunks/app.js', 'static/css/app.css']);
  });

  it('marks missing route files as failed', () => {
    const result = validateBudget({
      budget: {
        sharedMaxFirstLoadJsKb: 1,
        routes: [
          {
            route: '/home',
            manifestKeys: ['/home'],
            maxFirstLoadJsKb: 1,
          },
        ],
      },
      appManifest: { pages: {} },
      buildManifest: {},
      nextDir: '.',
    });

    expect(result.passed).toBe(false);
    expect(result.routes[0].filesFound).toBe(0);
  });

  it('rounds byte sizes to one decimal kB', () => {
    expect(toKb(1536)).toBe(1.5);
  });
});
