module.exports = {
    preset: 'jest-preset-angular',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!flat)/',
    ],
    globals: {
        'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};
