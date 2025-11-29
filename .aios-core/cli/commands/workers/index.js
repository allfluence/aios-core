/**
 * Workers Command Module
 *
 * Entry point for all workers-related CLI commands.
 * Includes search, list, and info subcommands.
 *
 * @module cli/commands/workers
 * @version 1.0.0
 * @story 2.7 - Discovery CLI Search
 */

const { Command } = require('commander');
const { createSearchCommand } = require('./search');

/**
 * Create the workers command with all subcommands
 * @returns {Command} Commander command instance
 */
function createWorkersCommand() {
  const workers = new Command('workers');

  workers
    .description('Manage and discover workers in the service registry')
    .addHelpText('after', `
Commands:
  search <query>    Search for workers matching a query
  list              List all workers (coming in Story 2.8-2.9)
  info <id>         Show details for a specific worker (coming in Story 2.8-2.9)

Examples:
  $ aios workers search "json transformation"
  $ aios workers search "data" --category=etl
  $ aios workers list --category=testing
  $ aios workers info json-csv-transformer
`);

  // Add search subcommand
  workers.addCommand(createSearchCommand());

  // Placeholder for list command (Story 2.8-2.9)
  const list = new Command('list');
  list
    .description('List all workers in the service registry')
    .option('-c, --category <category>', 'Filter by category')
    .option('-f, --format <format>', 'Output format: table, json, yaml', 'table')
    .action(() => {
      console.log('List command coming in Story 2.8-2.9');
      console.log('Use "aios workers search <query>" for now');
    });
  workers.addCommand(list);

  // Placeholder for info command (Story 2.8-2.9)
  const info = new Command('info');
  info
    .description('Show detailed information about a worker')
    .argument('<id>', 'Worker ID')
    .option('-f, --format <format>', 'Output format: table, json, yaml', 'table')
    .action((id) => {
      console.log(`Info command for "${id}" coming in Story 2.8-2.9`);
      console.log('Use "aios workers search <query>" for now');
    });
  workers.addCommand(info);

  return workers;
}

module.exports = {
  createWorkersCommand
};
