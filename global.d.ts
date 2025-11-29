// global.d.ts or types/css.d.ts
declare module '*.css';
declare module '*.scss';

// If using CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
