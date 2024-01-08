import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { logger } from '@/utils/logger';
import { BASE_URL } from '@/config';
import { HttpException } from '@/exceptions/HttpException';

// Define the options interface for the middleware
interface FileUploadMiddlewareOptions {
  minImages: number;
}

// Function to split a Buffer by a delimiter into an array of Buffers
const splitBuffer = (source: Buffer, delimiter: Buffer): Buffer[] => {
  const result: Buffer[] = [];
  let start = 0;
  let end = source.indexOf(delimiter);

  while (end !== -1) {
    result.push(source.slice(start, end));
    start = end + delimiter.length;
    end = source.indexOf(delimiter, start);
  }

  result.push(source.slice(start));
  return result;
};

// Middleware function that takes options as parameters
const fileUploadMiddleware = (options: FileUploadMiddlewareOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const chunks: Buffer[] = [];
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return next(new HttpException(400, 'Invalid content type'));
    }

    const boundary = contentType.split('boundary=')[1];
    const boundaryBuffer = Buffer.from(`\r\n--${boundary}`);
    const endBoundaryBuffer = Buffer.from('\r\n\r\n');

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const dataBuffer = Buffer.concat(chunks);
      const parts = splitBuffer(dataBuffer, boundaryBuffer);
      parts.pop();

      const fileInfos: { fileName: string; content: Buffer; filePath: string }[] = [];
      const otherFields: { [key: string]: string } = {};

      // Process each part to collect file information and other form data
      parts.forEach((part) => {
        const [headerBuffer, content] = splitBuffer(part, endBoundaryBuffer);
        const parsedHeader = headerBuffer.toString('utf-8');

        if (parsedHeader.includes('filename=')) {
          const timestamp = Date.now();
          const [, filename] = parsedHeader.split('filename="');
          const fileName = timestamp + '-' + filename.split('"')[0];
          const filePath = path.join('uploads', fileName);
          fileInfos.push({ fileName, content, filePath });
        } else {
          const fieldName = parsedHeader.split('name=')[1].split('"')[1];
          const fieldValue = content.toString('utf-8');
          otherFields[fieldName] = fieldValue;
        }
      });

      // Validate file extensions before saving any files
      const validExtensions = ['.jpg', '.jpeg', '.png'];
      for (let i = 0; i < fileInfos.length; i++) {
        const fileInfo = fileInfos[i];
        if (!validExtensions.includes(path.extname(fileInfo.fileName).toLowerCase())) {
          return next(new HttpException(400, 'Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
        }
      }

      // Check if the minimum number of images are uploaded
      const imageCount = fileInfos.length;
      if (imageCount < options.minImages) {
        return next(new HttpException(400, 'Insufficient number of images'));
      }

      const imageUrls: string[] = [];

      // Save the files after passing all validations
      fileInfos.forEach((fileInfo) => {
        const fileStream = fs.createWriteStream(fileInfo.filePath);
        const readableStream = Readable.from(fileInfo.content);
        readableStream.pipe(fileStream);
        imageUrls.push(`${BASE_URL}/${fileInfo.filePath}`);
        fileStream.on('close', () => {
          logger.info(`File ${fileInfo.fileName} uploaded successfully.`);
        });
      });

      // Attach the parsed data to the request body
      req.body = { ...otherFields, photos: imageUrls };
      // Call the next middleware
      next();
    });
  };
};

export default fileUploadMiddleware;
