import { FormatEnum } from "sharp"
import { promises as fsPromises } from "fs"

interface ReadOptions {
  width: number
  height: number
  format: keyof FormatEnum
  test?: boolean
}

// Helper function to read from the thumbnails folder
const readThumbnail = async (name: string, options: ReadOptions): Promise<Buffer | boolean> => {
  try {
    let thumbRequested: Buffer

    if (options?.test) {
      thumbRequested = await fsPromises.readFile(
        `./src/tests/images/thumbnails/${name}_${options.width}x${options.height}.${options.format}`
      )
    } else {
      thumbRequested = await fsPromises.readFile(
        `./public/images/thumbnails/${name}_${options.width}x${options.height}.${options.format}`
      )
    }

    return thumbRequested
  } catch (err) {
    console.log("Image not found, attempting to process one")
    return false
  }
}

export default readThumbnail
