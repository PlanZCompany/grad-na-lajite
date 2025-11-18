import { Client } from 'basic-ftp'
import { stat } from 'fs/promises'

export async function uploadToSuperhosting(localPath: string, filename: string) {
  const client = new Client()

  try {
    await stat(localPath)

    await client.access({
      host: (process.env.SH_FTP_HOST || '').replace(/\.$/, ''),
      user: process.env.SH_FTP_USER!,
      password: process.env.SH_FTP_PASS!,
      secure: false,
    })

    // ВАЖНО: качваме директно в root-а на FTP акаунта
    const remotePath = filename

    await client.uploadFrom(localPath, remotePath)

    const publicUrl = `${process.env.SH_MEDIA_BASE_URL}/${filename}`
    return publicUrl
  } finally {
    client.close()
  }
}
