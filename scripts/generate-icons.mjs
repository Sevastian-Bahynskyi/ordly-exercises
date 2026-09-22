import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const sizes = [64, 180, 192, 512]
const source = new URL('../public/icon.svg', import.meta.url)
const output = new URL('../public/icons/', import.meta.url)

await mkdir(output, { recursive: true })

await Promise.all(
  sizes.map((size) =>
    sharp(source)
      .resize(size, size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(new URL(`icon-${size}.png`, output))
  )
)

console.log(`Generated PWA icons: ${sizes.join(', ')}px`)
