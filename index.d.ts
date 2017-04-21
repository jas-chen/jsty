import { CSSProperties } from './types';

interface CSSDeclaration {
  media?: string,
  sel?: string,
  prop?: string,
  value?: string | object
}

declare function d(declaration: CSSProperties): CSSDeclaration;

declare function d(sel: string): (...args: Array<CSSDeclaration | CSSDeclaration[]>) => CSSDeclaration | CSSDeclaration[];

declare function media(media: string): (...args: Array<CSSDeclaration | CSSDeclaration[]>) => CSSDeclaration | CSSDeclaration[];

declare class Keyframes {
    constructor(name: string, keyframesDecl: { [key: string]: CSSProperties });

    name: string;
    type: '@keyframes';
    cssText(): string;
}

declare function createInsertStyle(opts: {
  serverStyles?: object,
  onAtRule: (rule: string) => void,
  onStyleRule: (media: string, sel: string, prop: string, value: string) => void
}): (decls: Array<CSSDeclaration|CSSDeclaration[]>) => void;

declare function createStyleSheet(mediaQueries: string[]): {
  insertAtRule: (rule: string) => boolean,
  insertStyleRule: (rule: string, media: string) => boolean
};

declare function createPrefixer(): {
  prefixDecl: (prop: string, value: string) => string | undefined,
  prefixSel: (sel: string) => string | undefined
}
