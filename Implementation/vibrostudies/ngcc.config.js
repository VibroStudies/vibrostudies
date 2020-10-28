module.exports = {
    packages: {
        '@nstudio/nativescript-checkbox': {
            entryPoints: {
                angular: {
                    override: {
                    main: './index.js',
                    typings: './index.d.ts',
                    },
                ignoreMissingDependencies: true,
                },
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//,
                /@nativescript\/angular\//
            ],
        },
    }
}