declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      PREVIEW_SECRET: string
      SMTP_HOST: string
      SMTP_USER: string
      SMTP_PASS: string
      EMAIL_FROM_NAME: string
      EMAIL_FROM_ADDRESS: string
      NEXT_PUBLIC_PRODUCTION_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
