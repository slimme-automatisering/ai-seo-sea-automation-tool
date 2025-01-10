module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nieuwe feature
        'fix',      // Bug fix
        'docs',     // Documentatie
        'style',    // Code style aanpassingen
        'refactor', // Code refactoring
        'perf',     // Performance verbeteringen
        'test',     // Tests toevoegen/updaten
        'chore',    // Onderhoudstaken
        'ci',       // CI configuratie
        'build',    // Build systeem
        'revert',   // Commit terugdraaien
      ],
    ],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
