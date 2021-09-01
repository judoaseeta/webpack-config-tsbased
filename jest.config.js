/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
        '\\.module.(c|sc|sa)ss$': 'identity-obj-proxy',
        '\\.(c|sc|sa)ss$': '<rootDir>/testconfigs/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/testconfigs/fileMock.js',
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'css', 'scss'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
        },
    },
}
