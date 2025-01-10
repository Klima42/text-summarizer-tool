/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUGGING_FACE_TOKEN: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 