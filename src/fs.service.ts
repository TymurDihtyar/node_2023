import fs from 'fs/promises'
import path from 'path'
const pathToFile = path.join(process.cwd(), 'users.json')

const read = async () => {
  const json = await fs.readFile(pathToFile, {encoding: 'utf-8'});
  return JSON.parse(json)
}

const write = async (users) => {
  await fs.writeFile(pathToFile, JSON.stringify(users));
}

export {read, write}