import { Injectable } from '@nestjs/common';
import { UserWordCountDto } from './dto/user-word-count.dto';

@Injectable()
export class UploadService {
  async processFiles(files): Promise<UserWordCountDto[]> {
    const wordCounts = new Map<string, number>();

    const processFile = async (file) => {
      const readline = require('readline');
      const fs = require('fs');

      const fileStream = fs.createReadStream(file.path);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        const match = line.match(/<(.+?)>/);
        if (match) {
          const username = match[1];
          const words = line.split(' ').length - 1;

          if (wordCounts.has(username)) {
            wordCounts.set(username, wordCounts.get(username) + words);
          } else {
            wordCounts.set(username, words);
          }
        }
      }
    };

    const processFilesPromises = files.map(processFile);
    await Promise.all(processFilesPromises);

    const userWordCounts: UserWordCountDto[] = Array.from(wordCounts.entries()).map(([username, wordCount]) => ({
      username,
      wordCount,
    }));

    userWordCounts.sort((a, b) => b.wordCount - a.wordCount);

    return userWordCounts;
  }
}
