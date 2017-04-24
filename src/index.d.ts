import { CSSProperties } from './types';

interface CSSDeclaration {
  media?: string,
  sel?: string,
  prop?: string,
  value?: string | object
}

type CSSDeclarations = CSSDeclaration[];

/**
 * Attach CSS selector to all CSS declarations. It will prepend the selector if one alreay existed.
 */
type attachSelector = (...args: CSSDeclarations[]) => CSSDeclarations;

/**
 * Attach Media query to all CSS declarations.
 */
type attachMediaQuery = (...args: CSSDeclarations[]) => CSSDeclarations;

/**
 * Create CSS declarations.
 * @param declaration CSS declaration object.
 */
declare function d(declaration: CSSProperties): CSSDeclarations;

/**
 * Create `attachSelector`.
 * @param selector CSS selector e.g. ":hover".
 */
declare function d(selector: string): attachSelector;

/**
 * Create `attachMediaQuery`.
 * @param mediaQuery Media query e.g. "(max-width: 1024px)".
 */
declare function media(mediaQuery: string): attachMediaQuery;

/**
 * Create a Keyframes declaration.
 */
declare class Keyframes {
    /**
     * @param name           Name to be used in `animation-name`.
     * @param keyframesDecl  @keyframes body. e.g. `{ from: { top: 0 }, to: { top: 10px } }`
     */
    constructor(name: string, keyframesDecl: { [key: string]: CSSProperties });

    /** Name to be used in `animation-name`. */
    name: string;

    /** The key for cache to use. */
    type: '@keyframes';

    /** Get the CSS string to insert into style element. */
    cssText(): string;
}

declare function createInsertStyle(opts: {
  serverStyles?: object,
  onAtRule: (rule: string) => void,
  onStyleRule: (mediaQuery: string, sel: string, prop: string, value: string) => void
}): (decls: CSSDeclarations) => void;

declare function createStyleSheet(mediaQueries: string[]): {
  insertAtRule: (rule: string) => boolean,
  insertStyleRule: (rule: string, mediaQuery: string) => boolean
};

declare function createPrefixer(): {
  prefixDecl: (prop: string, value: string) => string | undefined,
  prefixSel: (sel: string) => string | undefined
}
