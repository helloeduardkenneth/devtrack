/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPLICATIONS_ITEMS_PER_PAGE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
