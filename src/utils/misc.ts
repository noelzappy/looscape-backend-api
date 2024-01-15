import * as ffmpeg from 'fluent-ffmpeg';

export async function getVideoDuration(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(url, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const durationSeconds = metadata.format?.duration || 0;
        resolve(parseInt(durationSeconds.toString(), 10));
      }
    });
  });
}
