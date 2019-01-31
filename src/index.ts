/**
 * Copyright (c) 2018 kevinpollet <pollet.kevin@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import chalk from "chalk";
import program from "commander";
import inquirer from "inquirer";
import { join } from "path";
import { renderTemplates } from "./renderTemplates";

program.usage("[destination]").parse(process.argv);

const destination = program.args.length
  ? join(process.cwd(), program.args.shift()!)
  : process.cwd();

const templatesDir = join(__dirname, "../templates");

inquirer
  .prompt({
    message: "Name:",
    name: "name",
    type: "input"
  })
  .then(answers => renderTemplates(templatesDir, destination, answers))
  .then(() => {
    const message = chalk.green(`Project generated\n`);
    process.stdout.write(message);
    process.exit(0);
  })
  .catch((err: Error) => {
    const message = chalk.red(err.message + "\n");
    process.stderr.write(message);
    process.exit(1);
  });
