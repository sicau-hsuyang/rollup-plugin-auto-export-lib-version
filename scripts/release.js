const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const execa = require("execa");

// 检查工作区是否干净
async function checkCleanWorkspace() {
  const { stdout } = await execa("git", ["status", "--porcelain"]);
  if (stdout.trim() !== "") {
    throw new Error("Your working directory is not clean. Please commit or stash changes before running this script.");
  }
}

// 版本号更新函数
function incrementVersion(version, type) {
  const [major, minor, patch] = version.split(".").map(Number);

  // 根据类型更新版本号
  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    case "pre-major":
      return `${major + 1}.0.0-alpha.${getTimestamp()}`;
    case "pre-minor":
      return `${major}.${minor + 1}.0-alpha.${getTimestamp()}`;
    case "pre-patch":
      return `${major}.${minor}.${patch + 1}-alpha.${getTimestamp()}`;
    default:
      throw new Error(`Unknown version type: ${type}`);
  }
}

// 获取时间戳
function getTimestamp() {
  return new Date().toISOString().replace(/[-:T.Z]/g, "");
}

// 主函数
(async function main() {
  try {
    // 检查工作区是否干净
    await checkCleanWorkspace();

    const pkgPath = path.resolve(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    console.log(`Current version: ${pkg.version}`);

    // 询问用户选择版本类型
    const { versionType } = await inquirer.prompt([
      {
        type: "list",
        name: "versionType",
        message: "Select the type of version bump:",
        choices: ["major", "minor", "patch", "pre-major", "pre-minor", "pre-patch"],
      },
    ]);

    // 计算新的版本号
    const newVersion = incrementVersion(pkg.version, versionType);

    // 更新版本号
    pkg.version = newVersion;

    // 写回 package.json
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf-8");
    console.log(`Updated version to ${newVersion}`);

    // 提交更改到 Git
    console.log("Staging and committing changes...");
    await execa("git", ["add", "package.json"]);
    await execa("git", ["commit", "-m", `chore: bump version to ${newVersion}`]);
    await execa("git", ["push"]);
    console.log("Changes pushed to remote repository.");

    // 发布到 npm
    console.log("Publishing to npm...");
    await execa("npm", ["publish"], { stdio: "inherit" });

    console.log(`🎉 Successfully published version ${newVersion} to npm!`);
  } catch (error) {
    console.error("❌ An error occurred:", error.message);

    // 撤销未提交的更改
    console.log("Reverting changes...");
    try {
      await execa("git", ["checkout", "."]);
      console.log("Changes reverted.");
    } catch (revertError) {
      console.error("❌ Failed to revert changes:", revertError.message);
    }

    process.exit(1);
  }
})();
