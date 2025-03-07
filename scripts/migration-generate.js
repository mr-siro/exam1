const { execSync } = require('child_process');

const migrationName = process.argv[2];
if (!migrationName) {
  console.error(
    '❌ Vui lòng nhập tên migration!\nVí dụ: npm run migration:generate CreateUsersTable',
  );
  process.exit(1);
}

const command = `npx typeorm migration:generate -d dist/data-source.js src/migrations/${migrationName}`;
console.log(`🚀 Running: ${command}`);

execSync(command, { stdio: 'inherit' });
