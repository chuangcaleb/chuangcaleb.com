import {type FlatXoConfig} from 'xo';

export const xoConfig: FlatXoConfig = [
	{
		rules: {
			// Turn it off until i fix it
			'@typescript-eslint/naming-convention': 'off',
			'capitalized-comments': [
				'error',
				'always',
				{
					// Matches all comments, disables the check in effect
					ignorePattern: '.*',
					ignoreInlineComments: true,
				},
			],
			// Fix conflict between XO(import/extensions) and XO(n/file-extension-in-import)."never".
			// 'import/extensions': [
			// 	'error',
			// 	'never',
			// 	{png: 'always'},
			// ],
		},
		prettier: true,
	},
];

export default xoConfig;
