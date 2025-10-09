/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleNameMapper: {
    // CSS Modules / SCSS をモック
    '\\.(module\\.scss|module\\.css)$': 'identity-obj-proxy',
    // 通常の CSS も一応無視
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  testMatch: ['**/?(*.)+(test|spec).(ts|tsx)'],
  // Vite の ESM 環境でも CJS の設定で動かす
  extensionsToTreatAsEsm: [],
  cacheDirectory: '<rootDir>/.jest-cache',
};
