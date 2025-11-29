/**
 * AIOS CLI Entry Point
 *
 * Main entry point for the AIOS CLI with Commander.js integration.
 * Registers all subcommands including workers, agents, etc.
 *
 * @module cli
 * @version 1.0.0
 * @story 2.7 - Discovery CLI Search
 */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

// Import command modules
const { createWorkersCommand } = require('./commands/workers');

// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
let packageVersion = '0.0.0';
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageVersion = packageJson.version;
} catch (error) {
  // Fallback version if package.json not found
}

/**
 * Create the main CLI program
 * @returns {Command} Commander program instance
 */
function createProgram() {
  const program = new Command();

  program
    .name('aios')
    .version(packageVersion)
    .description('AIOS-FullStack: AI-Orchestrated System for Full Stack Development')
    .addHelpText('after', `
Commands:
  workers           Manage and discover workers
  install           Install AIOS in current project
  init <name>       Create new AIOS project
  info              Show system information
  doctor            Run system diagnostics

For command help:
  $ aios <command> --help

Examples:
  $ aios workers search "json transformation"
  $ aios workers list --category=data
  $ aios install
  $ aios doctor
`);

  // Add workers command
  program.addCommand(createWorkersCommand());

  return program;
}

/**
 * Run the CLI
 * @param {string[]} args - Command line arguments
 * @returns {Promise<void>}
 */
async function run(args = process.argv) {
  const program = createProgram();

  try {
    await program.parseAsync(args);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  createProgram,
  run
};
