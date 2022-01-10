import sharp, { FormatEnum } from "sharp"

interface CreateOptions {
  width: number
  height: number
  format: keyof FormatEnum
  test?: boolean
}

// Helper function to process and save requested image using sharp
const createThumbnail = async (name: string, image: Buffer, options: CreateOptions): Promise<boolean> => {
  // Process and resize the image according to the size and format provided
  try {
    // Check if test is passed into options, save image to test folder if true
    if (options.test) {
      await sharp(image)
        .resize(+options.width, +options.height)
        .toFormat(options.format)
        .toFile(`./src/tests/images/thumbnails/${name}_${options.width}x${options.height}.${options.format}`)

      return true
    }

    // Save image to public folder if test is not passed into options
    await sharp(image)
      .resize(+options.width, +options.height)
      .toFormat(options.format)
      .toFile(`./public/images/thumbnails/${name}_${options.width}x${options.height}.${options.format}`)

    return true
  } catch (err) {
    console.log("Cannot process image", err)
    return false
  }
}

export default createThumbnail
