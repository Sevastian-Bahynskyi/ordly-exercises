import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const sizes = [64, 180, 192, 512]
const source = fileURLToPath(new URL('../public/icon.svg', import.meta.url))
const outputDir = fileURLToPath(new URL('../public/icons/', import.meta.url))

await mkdir(outputDir, { recursive: true })

await Promise.all(
  sizes.map((size) =>
    sharp(source)
      .resize(size, size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(`${outputDir}/icon-${size}.png`)
  )
)

console.log(`Generated PWA icons: ${sizes.join(', ')}px`)
