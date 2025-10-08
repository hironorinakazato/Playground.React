/**
 * CSS Modules (SCSS) を TypeScript から利用するための宣言。
 * `import styles from './X.module.scss'` を可能にする。
 */
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
