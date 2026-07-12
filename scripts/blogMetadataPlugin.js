import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { normalizePostMetadata } from '../src/utils/blogFrontmatter.js'

const VIRTUAL_MODULE_ID = 'virtual:blog-metadata'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`
const BLOG_DIRECTORY = path.join('src', 'content', 'blog')

const findMarkdownFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) return findMarkdownFiles(entryPath)
    if (entry.isFile() && entry.name.endsWith('.md')) return [entryPath]

    return []
  }))

  return nestedFiles.flat()
}

const toSourcePath = (blogRoot, filePath) => {
  const relativePath = path.relative(blogRoot, filePath).split(path.sep).join('/')

  return `../content/blog/${relativePath}`
}

export const blogMetadataPlugin = () => {
  let projectRoot = process.cwd()

  const isBlogMarkdownFile = (filePath) => {
    const blogRoot = path.resolve(projectRoot, BLOG_DIRECTORY)
    const relativePath = path.relative(blogRoot, filePath)

    return !relativePath.startsWith('..') && !path.isAbsolute(relativePath) && filePath.endsWith('.md')
  }

  const refreshMetadata = (server) => {
    const metadataModule = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)

    if (metadataModule) {
      server.moduleGraph.invalidateModule(metadataModule)
    }

    server.ws.send({ type: 'full-reload' })
  }

  return {
    name: 'aningdesign-blog-metadata',
    configResolved(config) {
      projectRoot = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID

      return null
    },
    async load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return null

      const blogRoot = path.resolve(projectRoot, BLOG_DIRECTORY)
      const files = await findMarkdownFiles(blogRoot)
      const metadata = await Promise.all(files.map(async (filePath) => {
        const sourcePath = toSourcePath(blogRoot, filePath)
        const raw = await readFile(filePath, 'utf8')

        return normalizePostMetadata({ sourcePath, raw })
      }))

      return `export default ${JSON.stringify(metadata)}`
    },
    configureServer(server) {
      const blogRoot = path.resolve(projectRoot, BLOG_DIRECTORY)
      server.watcher.add(blogRoot)

      const handleStructureChange = (filePath) => {
        if (isBlogMarkdownFile(filePath)) {
          refreshMetadata(server)
        }
      }

      server.watcher.on('add', handleStructureChange)
      server.watcher.on('unlink', handleStructureChange)
    },
    handleHotUpdate({ file, server }) {
      if (!isBlogMarkdownFile(file)) return undefined

      refreshMetadata(server)
      return []
    }
  }
}
