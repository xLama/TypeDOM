declare class TypeDOM {
    private uuid;
    constructor();
    public getClassName(): string;
    public getUUID(): string;
}
declare class EventDispatcher extends TypeDOM implements IEventDispatcher {
    constructor();
    public addEventListener(type: string, listener: Function, scope: any, capture: boolean): EventDispatcher;
    public addEventListenerXTimes(type: string, listener: Function, scope: any, capture: boolean, times: number): EventDispatcher;
    public removeEventListener(type: string, listener: Function, capture: boolean): EventDispatcher;
    public dispatchEvent(event: BaseEvent): EventDispatcher;
    public getUUID(): string;
}
declare class DOMElement extends EventDispatcher implements ICloneable<DOMElement>, IDOMElement {
    private element;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: any, tag: string);
    public getVisualHierarchy(): ICollection<IDOMElement>;
    public getUUID(): string;
    public setElement(element: HTMLElement): DOMElement;
    public getElement(): HTMLElement;
    private returnFunction();
    public addTo(container: Container): DOMElement;
    public removeFromParent(): void;
    public getParent(): DOMElement;
    public hasParent(): boolean;
    /**
    * Equivalent to innerText or textContent
    **/
    public getText(): string;
    /**
    * Equivalent to innerText or textContent
    **/
    public setText(text: string): DOMElement;
    public getAttribute(attr: string): string;
    public setAttribute(name: string, value: string): DOMElement;
    public hasAttribute(name: string): boolean;
    public hasAttributes(): boolean;
    public removeAttribute(attributeName: string): void;
    public setId(id: string): DOMElement;
    public getId(): string;
    public setStyleClassName(className: string): DOMElement;
    public getStyleClassName(): string;
    public getTagName(): string;
    public getNodeName(): string;
    public getNodeType(): number;
    public getNodeValue(): string;
    public setNodeValue(nodeValue: string): DOMElement;
    public getCss(property: string): string;
    public setCss(properties: Object): DOMElement;
    public setCss(property: string, value: string): DOMElement;
    public getInnerHTML(): string;
    public setInnerHTML(innerHTML: string): DOMElement;
    public isSupported(feature: string, version: string): boolean;
    /**
    * The isSameNode() method is supported in all major browsers, except Firefox.
    **/
    public isSameNode(DOMElement: DOMElement): boolean;
    public isEqualNode(DOMElement: DOMElement): boolean;
    public compareDocumentPosition(DOMElement: DOMElement): number;
    /**
    * 	Returns the previous element at the same node tree level
    **/
    public getPreviousSibling(): DOMElement;
    /**
    * Returns the next node at the same node tree level
    **/
    public getNextSibling(): DOMElement;
    public dispatchEvent(event: BaseEvent): DOMElement;
    public clone(): DOMElement;
}
declare class Container extends DOMElement {
    public addChild(child: DOMElement): DOMElement;
    public addChildren(children: ICollection<DOMElement>): DOMElement;
    public addChildren(children: DOMElement[]): DOMElement;
    public removeChild(child: DOMElement): void;
    public removeAllChildren(): void;
    public contains(child: DOMElement): boolean;
    public removeChildAt(index: number): void;
    public getChildren(): ArrayCollection<DOMElement>;
    public getChildrenNumber(): number;
    public hasChild(): boolean;
    public insertBefore(newElement: DOMElement, oldElement: DOMElement): void;
    public replaceChild(newElement: DOMElement, oldElement: DOMElement): void;
    public getLastChild(): DOMElement;
    public getFirstChild(): DOMElement;
    public sort(comparator: Comparator<DOMElement>): void;
    public filter(func: (value: DOMElement) => boolean): void;
    private childCheck(child);
    private indexCheck(index);
}
declare class NoVisual extends EventDispatcher {
    constructor();
}
/**
*Defines an abbreviation
**/
declare class Abbr extends Container implements ICloneable<Abbr> {
    static ABBR: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Abbr;
    public getElement(): HTMLElement;
    public clone(): Abbr;
}
/**
*Not supported in HTML5. Use abbr instead. Defines an acronym
**/
declare class Acronym extends Container implements ICloneable<Acronym>, IDeprecated {
    static ACRONYM: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Acronym;
    public getElement(): HTMLElement;
    public clone(): Acronym;
}
/**
*Defines contact information for the author/owner of a document
**/
declare class Address extends Container implements ICloneable<Address> {
    static ADDRESS: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Address;
    public getElement(): HTMLElement;
    public clone(): Address;
}
/**
*Defines an article
**/
declare class Article extends Container implements ICloneable<Article>, IHtml5 {
    static ARTICLE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Article;
    public getElement(): HTMLElement;
    public clone(): Article;
}
/**
*Defines content aside from the page content
**/
declare class Aside extends Container implements ICloneable<Aside>, IHtml5 {
    static ASIDE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Aside;
    public getElement(): HTMLElement;
    public clone(): Aside;
}
/**
*Defines bold text
**/
declare class B extends Container implements ICloneable<B> {
    static B: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): B;
    public getElement(): HTMLElement;
    public clone(): B;
}
/**
*Isolates a part of text that might be formatted in a different direction from other text outside it
**/
declare class Bdi extends Container implements ICloneable<Bdi>, IHtml5 {
    static BDI: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Bdi;
    public getElement(): HTMLElement;
    public clone(): Bdi;
}
/**
*Overrides the current text direction
**/
declare class Bdo extends Container implements ICloneable<Bdo> {
    static BDO: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Bdo;
    public getElement(): HTMLElement;
    public clone(): Bdo;
}
/**
*Not supported in HTML5. Use CSS instead.Defines big text
**/
declare class Big extends Container implements ICloneable<Big>, IDeprecated {
    static BIG: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Big;
    public getElement(): HTMLElement;
    public clone(): Big;
}
/**
*Defines a section that is quoted from another source
**/
declare class Blockquote extends Container implements ICloneable<Blockquote> {
    static BLOCKQUOTE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Blockquote;
    public getElement(): HTMLElement;
    public clone(): Blockquote;
}
/**
*Not supported in HTML5. Use CSS instead.Defines centered text
**/
declare class Center extends Container implements ICloneable<Center>, IDeprecated {
    static CENTER: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Center;
    public getElement(): HTMLElement;
    public clone(): Center;
}
/**
*Defines the title of a work
**/
declare class Cite extends Container implements ICloneable<Cite> {
    static CITE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Cite;
    public getElement(): HTMLElement;
    public clone(): Cite;
}
/**
*Defines a piece of computer code
**/
declare class Code extends Container implements ICloneable<Code> {
    static CODE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Code;
    public getElement(): HTMLElement;
    public clone(): Code;
}
/**
*Defines a description/value of a term in a description list
**/
declare class Dd extends Container implements ICloneable<Dd> {
    static DD: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Dd;
    public getElement(): HTMLElement;
    public clone(): Dd;
}
/**
*Defines additional details that the user can view or hide
**/
declare class Details extends Container implements ICloneable<Details>, IHtml5 {
    static DETAILS: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Details;
    public getElement(): HTMLElement;
    public clone(): Details;
}
/**
*Defines a definition term
**/
declare class Dfn extends Container implements ICloneable<Dfn> {
    static DFN: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Dfn;
    public getElement(): HTMLElement;
    public clone(): Dfn;
}
/**
*Defines a dialog box or window
**/
declare class Dialog extends Container implements ICloneable<Dialog>, IHtml5 {
    static DIALOG: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Dialog;
    public getElement(): HTMLElement;
    public clone(): Dialog;
}
/**
*Not supported in HTML5. Use ul instead.Defines a directory list
**/
declare class Dir extends Container implements ICloneable<Dir>, IDeprecated {
    static DIR: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Dir;
    public getElement(): HTMLElement;
    public clone(): Dir;
}
/**
*Defines a term/name in a description list
**/
declare class Dt extends Container implements ICloneable<Dt> {
    static DT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Dt;
    public getElement(): HTMLElement;
    public clone(): Dt;
}
/**
*Defines emphasized text
**/
declare class Em extends Container implements ICloneable<Em> {
    static EM: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Em;
    public getElement(): HTMLElement;
    public clone(): Em;
}
/**
*Defines a caption for a figure element
**/
declare class Figcaption extends Container implements ICloneable<Figcaption>, IHtml5 {
    static FIGCAPTION: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Figcaption;
    public getElement(): HTMLElement;
    public clone(): Figcaption;
}
/**
*Specifies self-contained content
**/
declare class Figure extends Container implements ICloneable<Figure>, IHtml5 {
    static FIGURE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Figure;
    public getElement(): HTMLElement;
    public clone(): Figure;
}
/**
*Not supported in HTML5. Use CSS instead.Defines font, color, and size for text
**/
declare class Font extends Container implements ICloneable<Font>, IDeprecated {
    static FONT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Font;
    public getElement(): HTMLElement;
    public clone(): Font;
}
/**
*Defines a footer for a document or section
**/
declare class Footer extends Container implements ICloneable<Footer>, IHtml5 {
    static FOOTER: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Footer;
    public getElement(): HTMLElement;
    public clone(): Footer;
}
/**
*Not supported in HTML5.Defines a window (a frame) in a frameset
**/
declare class Frame extends Container implements ICloneable<Frame>, IDeprecated {
    static FRAME: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Frame;
    public getElement(): HTMLElement;
    public clone(): Frame;
}
/**
*Defines a header for a document or section
**/
declare class Header extends Container implements ICloneable<Header>, IHtml5 {
    static HEADER: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Header;
    public getElement(): HTMLElement;
    public clone(): Header;
}
/**
*Defines a part of text in an alternate voice or mood
**/
declare class I extends Container implements ICloneable<I> {
    static I: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): I;
    public getElement(): HTMLElement;
    public clone(): I;
}
/**
*Defines keyboard input
**/
declare class Kbd extends Container implements ICloneable<Kbd> {
    static KBD: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Kbd;
    public getElement(): HTMLElement;
    public clone(): Kbd;
}
/**
*Defines a key-pair generator field (for forms)
**/
declare class Keygen extends Container implements ICloneable<Keygen>, IHtml5 {
    static KEYGEN: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Keygen;
    public getElement(): HTMLElement;
    public clone(): Keygen;
}
/**
*Specifies the main content of a document
**/
declare class Main extends Container implements ICloneable<Main>, IHtml5 {
    static MAIN: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Main;
    public getElement(): HTMLElement;
    public clone(): Main;
}
/**
*Defines marked/highlighted text
**/
declare class Mark extends Container implements ICloneable<Mark>, IHtml5 {
    static MARK: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Mark;
    public getElement(): HTMLElement;
    public clone(): Mark;
}
/**
*Defines a list/menu of commands
**/
declare class Menu extends Container implements ICloneable<Menu> {
    static MENU: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Menu;
    public getElement(): HTMLElement;
    public clone(): Menu;
}
/**
*Defines a command/menu item that the user can invoke from a popup menu
**/
declare class Menuitem extends Container implements ICloneable<Menuitem>, IHtml5 {
    static MENUITEM: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Menuitem;
    public getElement(): HTMLElement;
    public clone(): Menuitem;
}
/**
*Defines a scalar measurement within a known range (a gauge)
**/
declare class Meter extends Container implements ICloneable<Meter>, IHtml5 {
    static METER: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Meter;
    public getElement(): HTMLElement;
    public clone(): Meter;
}
/**
*Defines navigation links
**/
declare class Nav extends Container implements ICloneable<Nav>, IHtml5 {
    static NAV: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Nav;
    public getElement(): HTMLElement;
    public clone(): Nav;
}
/**
*Not supported in HTML5. Defines an alternate content for users that do not support frames
**/
declare class Noframes extends Container implements ICloneable<Noframes>, IDeprecated {
    static NOFRAMES: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Noframes;
    public getElement(): HTMLElement;
    public clone(): Noframes;
}
/**
*Defines an alternate content for users that do not support client-side scripts
**/
declare class Noscript extends Container implements ICloneable<Noscript> {
    static NOSCRIPT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Noscript;
    public getElement(): HTMLElement;
    public clone(): Noscript;
}
/**
*Defines the result of a calculation
**/
declare class Output extends Container implements ICloneable<Output>, IHtml5 {
    static OUTPUT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Output;
    public getElement(): HTMLElement;
    public clone(): Output;
}
/**
*Defines what to show in browsers that do not support ruby annotations
**/
declare class Rp extends Container implements ICloneable<Rp>, IHtml5 {
    static RP: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Rp;
    public getElement(): HTMLElement;
    public clone(): Rp;
}
/**
*Defines an explanation/pronunciation of characters (for East Asian typography)
**/
declare class Rt extends Container implements ICloneable<Rt>, IHtml5 {
    static RT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Rt;
    public getElement(): HTMLElement;
    public clone(): Rt;
}
/**
*Defines a ruby annotation (for East Asian typography)
**/
declare class Ruby extends Container implements ICloneable<Ruby>, IHtml5 {
    static RUBY: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Ruby;
    public getElement(): HTMLElement;
    public clone(): Ruby;
}
/**
*Defines text that is no longer correct
**/
declare class S extends Container implements ICloneable<S> {
    static S: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): S;
    public getElement(): HTMLElement;
    public clone(): S;
}
/**
*Defines sample output from a computer program
**/
declare class Samp extends Container implements ICloneable<Samp> {
    static SAMP: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Samp;
    public getElement(): HTMLElement;
    public clone(): Samp;
}
/**
*Defines a client-side script
**/
declare class Script extends Container implements ICloneable<Script> {
    static SCRIPT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Script;
    public getElement(): HTMLElement;
    public clone(): Script;
}
/**
*Defines a section in a document
**/
declare class Section extends Container implements ICloneable<Section>, IHtml5 {
    static SECTION: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Section;
    public getElement(): HTMLElement;
    public clone(): Section;
}
/**
*Defines smaller text
**/
declare class Small extends Container implements ICloneable<Small> {
    static SMALL: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Small;
    public getElement(): HTMLElement;
    public clone(): Small;
}
/**
*Not supported in HTML5. Use del instead.Defines strikethrough text
**/
declare class Strike extends Container implements ICloneable<Strike>, IDeprecated {
    static STRIKE: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Strike;
    public getElement(): HTMLElement;
    public clone(): Strike;
}
/**
*Defines important text
**/
declare class Strong extends Container implements ICloneable<Strong> {
    static STRONG: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Strong;
    public getElement(): HTMLElement;
    public clone(): Strong;
}
/**
*Defines subscripted text
**/
declare class Sub extends Container implements ICloneable<Sub> {
    static SUB: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Sub;
    public getElement(): HTMLElement;
    public clone(): Sub;
}
/**
*Defines a visible heading for a details element
**/
declare class Summary extends Container implements ICloneable<Summary>, IHtml5 {
    static SUMMARY: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Summary;
    public getElement(): HTMLElement;
    public clone(): Summary;
}
/**
*Defines superscripted text
**/
declare class Sup extends Container implements ICloneable<Sup> {
    static SUP: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Sup;
    public getElement(): HTMLElement;
    public clone(): Sup;
}
/**
*Defines a date/time
**/
declare class Time extends Container implements ICloneable<Time>, IHtml5 {
    static TIME: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Time;
    public getElement(): HTMLElement;
    public clone(): Time;
}
/**
*Not supported in HTML5. Use CSS instead.Defines teletype text
**/
declare class Tt extends Container implements ICloneable<Tt>, IDeprecated {
    static TT: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Tt;
    public getElement(): HTMLElement;
    public clone(): Tt;
}
/**
*Defines text that should be stylistically different from normal text
**/
declare class U extends Container implements ICloneable<U> {
    static U: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): U;
    public getElement(): HTMLElement;
    public clone(): U;
}
/**
*Defines a variable
**/
declare class Var extends Container implements ICloneable<Var> {
    static VAR: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Var;
    public getElement(): HTMLElement;
    public clone(): Var;
}
/**
*Defines a possible line-break
**/
declare class Wbr extends Container implements ICloneable<Wbr>, IHtml5 {
    static WBR: string;
    constructor();
    constructor(element: HTMLElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLElement): Wbr;
    public getElement(): HTMLElement;
    public clone(): Wbr;
}
declare class H extends Container {
    public setElement(element: HTMLHeadingElement): H;
    public getElement(): HTMLHeadingElement;
    public clone(): H;
}
declare class Body extends Container {
    private static _instance;
    private static unlocked;
    constructor();
    static getInstance(): Body;
}
declare class Head extends Container {
    private static instance;
    private static unlocked;
    constructor();
    static getInstance(): Head;
}
declare class Html extends Container {
    private static instance;
    private static unlocked;
    constructor();
    static getInstance(): Html;
}
/**
*Defines a hyperlink
**/
declare class A extends Container implements ICloneable<A> {
    static A: string;
    constructor();
    constructor(element: HTMLAnchorElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLAnchorElement): A;
    public getElement(): HTMLAnchorElement;
    public setHref(href: string): A;
    public getHref(): string;
    public clone(): A;
}
/**
*Not supported in HTML5. Use object instead.Defines an embedded applet
**/
declare class Applet extends Container implements ICloneable<Applet>, IDeprecated {
    static APPLET: string;
    constructor();
    constructor(element: HTMLAppletElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLAppletElement): Applet;
    public getElement(): HTMLAppletElement;
    public clone(): Applet;
}
/**
*Defines an area inside an image-map
**/
declare class Area extends Container implements ICloneable<Area> {
    static AREA: string;
    constructor();
    constructor(element: HTMLAreaElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLAreaElement): Area;
    public getElement(): HTMLAreaElement;
    public clone(): Area;
}
/**
*Specifies the base URL/target for all relative URLs in a document
**/
declare class Base extends Container implements ICloneable<Base> {
    static BASE: string;
    constructor();
    constructor(element: HTMLBaseElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLBaseElement): Base;
    public getElement(): HTMLBaseElement;
    public clone(): Base;
}
/**
*Not supported in HTML5. Use CSS instead.Specifies a default color, size, and font for all text in a document
**/
declare class Basefont extends Container implements ICloneable<Basefont>, IDeprecated {
    static BASEFONT: string;
    constructor();
    constructor(element: HTMLBaseFontElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLBaseFontElement): Basefont;
    public getElement(): HTMLBaseFontElement;
    public clone(): Basefont;
}
/**
*Defines a single line break
**/
declare class Br extends Container implements ICloneable<Br> {
    static BR: string;
    constructor();
    constructor(element: HTMLBRElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLBRElement): Br;
    public getElement(): HTMLBRElement;
    public clone(): Br;
}
/**
*Defines a clickable button
**/
declare class Button extends Container implements ICloneable<Button> {
    static BUTTON: string;
    constructor();
    constructor(element: HTMLButtonElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLButtonElement): Button;
    public getElement(): HTMLButtonElement;
    public clone(): Button;
}
/**
*Used to draw graphics, on the fly, via scripting (usually JavaScript)
**/
declare class Canvas extends Container implements ICloneable<Canvas>, IHtml5 {
    static CANVAS: string;
    constructor();
    constructor(element: HTMLCanvasElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLCanvasElement): Canvas;
    public getElement(): HTMLCanvasElement;
    public clone(): Canvas;
}
/**
*Defines a table caption
**/
declare class Caption extends Container implements ICloneable<Caption> {
    static CAPTION: string;
    constructor();
    constructor(element: HTMLTableCaptionElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableCaptionElement): Caption;
    public getElement(): HTMLTableCaptionElement;
    public clone(): Caption;
}
/**
*Specifies column properties for each column within a colgroup element
**/
declare class Col extends Container implements ICloneable<Col> {
    static COL: string;
    constructor();
    constructor(element: HTMLTableColElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableColElement): Col;
    public getElement(): HTMLTableColElement;
    public clone(): Col;
}
/**
*Specifies a group of one or more columns in a table for formatting
**/
declare class Colgroup extends Container implements ICloneable<Colgroup> {
    static COLGROUP: string;
    constructor();
    constructor(element: HTMLTableColElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableColElement): Colgroup;
    public getElement(): HTMLTableColElement;
    public clone(): Colgroup;
}
/**
*Specifies a list of pre-defined options for input controls
**/
declare class Datalist extends Container implements ICloneable<Datalist>, IHtml5 {
    static DATALIST: string;
    constructor();
    constructor(element: HTMLDataListElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLDataListElement): Datalist;
    public getElement(): HTMLDataListElement;
    public clone(): Datalist;
}
/**
*Defines text that has been deleted from a document
**/
declare class Del extends Container implements ICloneable<Del> {
    static DEL: string;
    constructor();
    constructor(element: HTMLModElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLModElement): Del;
    public getElement(): HTMLModElement;
    public clone(): Del;
}
/**
*Defines a section in a document
**/
declare class Div extends Container implements ICloneable<Div> {
    static DIV: string;
    constructor();
    constructor(element: HTMLDivElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLDivElement): Div;
    public getElement(): HTMLDivElement;
    public clone(): Div;
}
/**
*Defines a description list
**/
declare class Dl extends Container implements ICloneable<Dl> {
    static DL: string;
    constructor();
    constructor(element: HTMLDListElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLDListElement): Dl;
    public getElement(): HTMLDListElement;
    public clone(): Dl;
}
/**
*Defines a container for an external (non-HTML) application
**/
declare class Embed extends Container implements ICloneable<Embed>, IHtml5 {
    static EMBED: string;
    constructor();
    constructor(element: HTMLEmbedElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLEmbedElement): Embed;
    public getElement(): HTMLEmbedElement;
    public clone(): Embed;
}
/**
*Groups related elements in a form
**/
declare class Fieldset extends Container implements ICloneable<Fieldset> {
    static FIELDSET: string;
    constructor();
    constructor(element: HTMLFieldSetElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLFieldSetElement): Fieldset;
    public getElement(): HTMLFieldSetElement;
    public clone(): Fieldset;
}
/**
*Defines an HTML form for user input
**/
declare class Form extends Container implements ICloneable<Form> {
    static FORM: string;
    constructor();
    constructor(element: HTMLFormElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLFormElement): Form;
    public getElement(): HTMLFormElement;
    public clone(): Form;
}
/**
*Not supported in HTML5. Defines a set of frames
**/
declare class Frameset extends Container implements ICloneable<Frameset>, IDeprecated {
    static FRAMESET: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): Frameset;
    public getElement(): HTMLHeadingElement;
    public clone(): Frameset;
}
/**
* Defines HTML headings
**/
declare class H1 extends H implements ICloneable<H1> {
    static H1: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H1;
    public getElement(): HTMLHeadingElement;
    public clone(): H1;
}
/**
* Defines HTML headings
**/
declare class H2 extends H implements ICloneable<H2> {
    static H2: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H2;
    public getElement(): HTMLHeadingElement;
    public clone(): H2;
}
/**
* Defines HTML headings
**/
declare class H3 extends H implements ICloneable<H3> {
    static H3: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H3;
    public getElement(): HTMLHeadingElement;
    public clone(): H3;
}
/**
* Defines HTML headings
**/
declare class H4 extends H implements ICloneable<H4> {
    static H4: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H4;
    public getElement(): HTMLHeadingElement;
    public clone(): H4;
}
/**
* Defines HTML headings
**/
declare class H5 extends H implements ICloneable<H5> {
    static H5: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H5;
    public getElement(): HTMLHeadingElement;
    public clone(): H5;
}
/**
* Defines HTML headings
**/
declare class H6 extends H implements ICloneable<H6> {
    static H6: string;
    constructor();
    constructor(element: HTMLHeadingElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHeadingElement): H6;
    public getElement(): HTMLHeadingElement;
    public clone(): H6;
}
/**
* Defines a thematic change in the content
**/
declare class Hr extends Container implements ICloneable<Hr> {
    static HR: string;
    constructor();
    constructor(element: HTMLHRElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLHRElement): Hr;
    public getElement(): HTMLHRElement;
    public clone(): Hr;
}
/**
*Defines an inline frame
**/
declare class Iframe extends Container implements ICloneable<Iframe> {
    static IFRAME: string;
    constructor();
    constructor(element: HTMLIFrameElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLIFrameElement): Iframe;
    public getElement(): HTMLIFrameElement;
    public clone(): Iframe;
}
/**
*Defines an image
**/
declare class Img extends Container implements ICloneable<Img> {
    static IMG: string;
    constructor();
    constructor(element: HTMLImageElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLImageElement): Img;
    public getElement(): HTMLImageElement;
    public clone(): Img;
}
/**
*Defines an input control
**/
declare class Input extends Container implements ICloneable<Input> {
    static INPUT: string;
    constructor();
    constructor(element: HTMLInputElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLInputElement): Input;
    public getElement(): HTMLInputElement;
    public clone(): Input;
}
/**
*Defines a text that has been inserted into a document
**/
declare class Ins extends Container implements ICloneable<Ins> {
    static INS: string;
    constructor();
    constructor(element: HTMLModElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLModElement): Ins;
    public getElement(): HTMLModElement;
    public clone(): Ins;
}
/**
*Defines a label for an input element
**/
declare class Label extends Container implements ICloneable<Label> {
    static LABEL: string;
    constructor();
    constructor(element: HTMLLabelElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLLabelElement): Label;
    public getElement(): HTMLLabelElement;
    public clone(): Label;
}
/**
*Defines a caption for a fieldset element
**/
declare class Legend extends Container implements ICloneable<Legend> {
    static LEGEND: string;
    constructor();
    constructor(element: HTMLLegendElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLLegendElement): Legend;
    public getElement(): HTMLLegendElement;
    public clone(): Legend;
}
/**
*Defines a list item
**/
declare class Li extends Container implements ICloneable<Li> {
    static LI: string;
    constructor();
    constructor(element: HTMLLIElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLLIElement): Li;
    public getElement(): HTMLLIElement;
    public clone(): Li;
}
/**
*Defines the relationship between a document and an external resource (most used to link to style sheets)
**/
declare class Link extends Container implements ICloneable<Link> {
    static LINK: string;
    constructor();
    constructor(element: HTMLLinkElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLLinkElement): Link;
    public getElement(): HTMLLinkElement;
    public clone(): Link;
}
/**
*Defines metadata about an HTML document
**/
declare class Meta extends Container implements ICloneable<Meta> {
    static META: string;
    constructor();
    constructor(element: HTMLMetaElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLMetaElement): Meta;
    public getElement(): HTMLMetaElement;
    public clone(): Meta;
}
/**
*Defines an ordered list
**/
declare class Ol extends Container implements ICloneable<Ol> {
    static OL: string;
    constructor();
    constructor(element: HTMLOListElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLOListElement): Ol;
    public getElement(): HTMLOListElement;
    public clone(): Ol;
}
/**
*Defines a group of related options in a drop-down list
**/
declare class Optgroup extends Container implements ICloneable<Optgroup> {
    static OPTGROUP: string;
    constructor();
    constructor(element: HTMLOptGroupElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLOptGroupElement): Optgroup;
    public getElement(): HTMLOptGroupElement;
    public clone(): Optgroup;
}
/**
*Defines a paragraph
**/
declare class P extends Container implements ICloneable<P> {
    static P: string;
    constructor();
    constructor(element: HTMLParagraphElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLParagraphElement): P;
    public getElement(): HTMLParagraphElement;
    public clone(): P;
}
/**
*Defines a parameter for an object
**/
declare class Param extends Container implements ICloneable<Param> {
    static PARAM: string;
    constructor();
    constructor(element: HTMLParamElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLParamElement): Param;
    public getElement(): HTMLParamElement;
    public clone(): Param;
}
/**
*Defines preformatted text
**/
declare class Pre extends Container implements ICloneable<Pre> {
    static PRE: string;
    constructor();
    constructor(element: HTMLPreElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLPreElement): Pre;
    public getElement(): HTMLPreElement;
    public clone(): Pre;
}
/**
*Represents the progress of a task
**/
declare class Progress extends Container implements ICloneable<Progress>, IHtml5 {
    static PROGRESS: string;
    constructor();
    constructor(element: HTMLProgressElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLProgressElement): Progress;
    public getElement(): HTMLProgressElement;
    public clone(): Progress;
}
/**
*Defines a short quotation
**/
declare class Q extends Container implements ICloneable<Q> {
    static Q: string;
    constructor();
    constructor(element: HTMLQuoteElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLQuoteElement): Q;
    public getElement(): HTMLQuoteElement;
    public clone(): Q;
}
/**
*Defines a drop-down list
**/
declare class Select extends Container implements ICloneable<Select> {
    static SELECT: string;
    constructor();
    constructor(element: HTMLSelectElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLSelectElement): Select;
    public getElement(): HTMLSelectElement;
    public clone(): Select;
}
/**
*Defines multiple media resources for media elements (video and audio)
**/
declare class Source extends Container implements ICloneable<Source>, IHtml5 {
    static SOURCE: string;
    constructor();
    constructor(element: HTMLSourceElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLSourceElement): Source;
    public getElement(): HTMLSourceElement;
    public clone(): Source;
}
/**
*Defines a section in a document
**/
declare class Span extends Container implements ICloneable<Span> {
    static SPAN: string;
    constructor();
    constructor(element: HTMLSpanElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLSpanElement): Span;
    public getElement(): HTMLSpanElement;
    public clone(): Span;
}
/**
*Defines style information for a document
**/
declare class Style extends Container implements ICloneable<Style> {
    static STYLE: string;
    constructor();
    constructor(element: HTMLStyleElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLStyleElement): Style;
    public getElement(): HTMLStyleElement;
    public clone(): Style;
}
/**
*Defines a table
**/
declare class Table extends Container implements ICloneable<Table> {
    static TABLE: string;
    constructor();
    constructor(element: HTMLTableElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableElement): Table;
    public getElement(): HTMLTableElement;
    public clone(): Table;
}
/**
*Groups the body content in a table
**/
declare class Tbody extends Container implements ICloneable<Tbody> {
    static TBODY: string;
    constructor();
    constructor(element: HTMLTableSectionElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableSectionElement): Tbody;
    public getElement(): HTMLTableSectionElement;
    public clone(): Tbody;
}
/**
*Defines a cell in a table
**/
declare class Td extends Container implements ICloneable<Td> {
    static TD: string;
    constructor();
    constructor(element: HTMLTableDataCellElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableDataCellElement): Td;
    public getElement(): HTMLTableDataCellElement;
    public clone(): Td;
}
/**
*Defines a multiline input control (text area)
**/
declare class Textarea extends Container implements ICloneable<Textarea> {
    static TEXTAREA: string;
    constructor();
    constructor(element: HTMLTextAreaElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTextAreaElement): Textarea;
    public getElement(): HTMLTextAreaElement;
    public clone(): Textarea;
}
/**
*Groups the footer content in a table
**/
declare class Tfoot extends Container implements ICloneable<Tfoot> {
    static TFOOT: string;
    constructor();
    constructor(element: HTMLTableSectionElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableSectionElement): Tfoot;
    public getElement(): HTMLTableSectionElement;
    public clone(): Tfoot;
}
/**
*Defines a header cell in a table
**/
declare class Th extends Container implements ICloneable<Th> {
    static TH: string;
    constructor();
    constructor(element: HTMLTableHeaderCellElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableHeaderCellElement): Th;
    public getElement(): HTMLTableHeaderCellElement;
    public clone(): Th;
}
/**
*Groups the header content in a table
**/
declare class Thead extends Container implements ICloneable<Thead> {
    static THEAD: string;
    constructor();
    constructor(element: HTMLTableSectionElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableSectionElement): Thead;
    public getElement(): HTMLTableSectionElement;
    public clone(): Thead;
}
/**
*Defines a title for the document
**/
declare class Title extends Container implements ICloneable<Title> {
    static TITLE: string;
    constructor();
    constructor(element: HTMLTitleElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTitleElement): Title;
    public getElement(): HTMLTitleElement;
    public clone(): Title;
}
/**
*Defines a row in a table
**/
declare class Tr extends Container implements ICloneable<Tr> {
    static TR: string;
    constructor();
    constructor(element: HTMLTableRowElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTableRowElement): Tr;
    public getElement(): HTMLTableRowElement;
    public clone(): Tr;
}
/**
*Defines text tracks for media elements (video and audio)
**/
declare class Track extends Container implements ICloneable<Track>, IHtml5 {
    static TRACK: string;
    constructor();
    constructor(element: HTMLTrackElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLTrackElement): Track;
    public getElement(): HTMLTrackElement;
    public clone(): Track;
}
/**
*Defines an unordered list
**/
declare class Ul extends Container implements ICloneable<Ul> {
    static UL: string;
    constructor();
    constructor(element: HTMLUListElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLUListElement): Ul;
    public getElement(): HTMLUListElement;
    public clone(): Ul;
}
/**
*Defines a video or movie
**/
declare class Video extends Container implements ICloneable<Video>, IHtml5 {
    static VIDEO: string;
    constructor();
    constructor(element: HTMLVideoElement);
    constructor(id: string);
    constructor(attributes: Object);
    public setElement(element: HTMLVideoElement): Video;
    public getElement(): HTMLVideoElement;
    public clone(): Video;
}
declare enum EventPhases {
    CAPTURING_PHASE,
    AT_TARGET,
    BUBBLING_PHASE,
    SCATTERING_PHASE,
}
declare class BaseEvent {
    private static allNativeEvents;
    private nativeEvent;
    private phase;
    private target;
    private currentTarget;
    private bubbles;
    private updateVisualHierarchyInBubbles;
    private capturable;
    private eventType;
    private cancelable;
    private propagation;
    private inmediatePropagation;
    constructor(type: string, capturable?: boolean, bubbles?: boolean, cancelable?: boolean, updateVisualHierarchyInBubbles?: boolean, nativeEvent?: Event);
    public stopPropagation(): void;
    public stopInmediatePropagation(): void;
    public preventDefault(): void;
    static nativeEventToBaseEvent(evt: Event): BaseEvent;
    static isNativeEvent(eventType: string): boolean;
    public getCapturable(): boolean;
    public getTarget(): IEventDispatcher;
    public getCurrentTarget(): IEventDispatcher;
    public setTarget(target: IEventDispatcher): void;
    public setCurrentTarget(currentTarget: IEventDispatcher): void;
    public getUpdateVisualHierarchyInBubbles(): boolean;
    public getBubbles(): boolean;
    public getPhase(): number;
    public setPhase(phase: number): void;
    public getNativeEvent(): Event;
    public getInmediatePropagation(): boolean;
    public getEventType(): string;
    public getPropagation(): boolean;
}
declare class AjaxEvent extends BaseEvent {
    static NOT_FOUND: string;
    static SERVER_ERROR: string;
    static BEFORE_SERVER_RESPONSE: string;
    static ALMOST_READY: string;
    static NOT_INITIALIZE: string;
    static NO_SEND: string;
    static ALL_RIGHT: string;
    public data: any;
    public dataType: string;
    constructor(type: string, dataType?: string, data?: any);
}
declare class CollectionEvent extends BaseEvent {
    static COLLECTION_CHANGE: string;
    constructor(type: string);
}
declare class ContainerEvent extends BaseEvent {
    static CHILD_REMOVED: string;
    static CHILD_ADDED: string;
    static CHILDREN_ADDED: string;
    static CHILDREN_REMOVED: string;
    public children: ICollection<DOMElement>;
    constructor(type: string, children: ICollection<DOMElement>, capturable?: boolean, bubbles?: boolean, cancelable?: boolean);
}
declare class EventEngine {
    private static handlerListenerList;
    static addEventListener(eventType: string, handler: Function, scope: any, capture: boolean, target: IEventDispatcher, times?: number): void;
    static dispatchEvent(eventToDispatch: BaseEvent): void;
    private static capture(eventDispatched);
    private static target(eventDispatched, visualHierarchy);
    private static bubbles(eventDispatched, visualHierarchy);
    private static captureOrBubbles(eventDispatched, visualHierarchy, captureOrBubbles, dispersable?);
    private static checkListenerHandler(listener, currentTarget, listenersList, index, listenerManager);
    static removeEventListener(eventType: string, handler: Function, capture: boolean, target: IEventDispatcher): void;
    private static cleanListenerObject(eventType, capture, listenerManager, target);
    private static nativeEventsCallback(nativeEvent);
    private static getVisualHierarchy(child);
}
declare class Listener {
    private eventType;
    private handler;
    private times;
    private capture;
    private scope;
    constructor(type: string, handler: Function, capture: boolean, times: number, scope: any);
    public getEventType(): string;
    public getHandler(): Function;
    public getTimes(): number;
    public setTimes(times: number): void;
    public getCapture(): boolean;
    public getScope(): any;
}
declare class ListenerManager {
    private data;
    constructor();
    public addListener(listener: Listener): void;
    public getAllListenersByEventType(eventType: string): ArrayCollection<Listener>;
    public getListeners(eventType: string, capture: boolean): ArrayCollection<Listener>;
    public removeListernersByCapture(eventType: string, capture: boolean): void;
    public removeListernersByEventType(eventType: string): void;
}
declare class TD_KeyboardEvent extends BaseEvent {
    static events: Object;
    static KEY_DOWN: string;
    static KEY_PRESS: string;
    static KEY_UP: string;
    private altKey;
    private key;
    private keyCode;
    private char;
    private charCode;
    constructor(event: KeyboardEvent);
    constructor(type: string, capturable: boolean, bubbles: boolean, cancelable: boolean, updateVisualHierarchyInBubbles: boolean);
}
declare class TD_MouseEvent extends BaseEvent {
    static events: Object;
    static CLICK: string;
    static DOUBLE_CLICK: string;
    static MOUSE_DOWN: string;
    static MOUSE_UP: string;
    static MOUSE_OVER: string;
    static MOUSE_OUT: string;
    static MOUSE_MOVE: string;
    /*** HTML 5 ***/
    static ONDRAGNEW: string;
    static ONDRAGENDNEW: string;
    static ONDRAGENTERNEW: string;
    static ONDRAGLEAVENEW: string;
    static ONDRAGOVERNEW: string;
    static ONDRAGSTARTNEW: string;
    static ONMOUSEWHEELNEW: string;
    static ONSCROLL: string;
    static ONDROP: string;
    /*** HTML 5 ****/
    constructor(event: MouseEvent);
    constructor(type: string, capturable?: boolean, bubbles?: boolean, cancelable?: boolean, updateVisualHierarchyInBubbles?: boolean);
    public getNativeEvent(): MouseEvent;
    public getClientX(): number;
    public getClientY(): number;
}
interface Comparator<T> {
    compare(o1: T, o2: T): number;
}
interface ICloneable<T> {
    clone(): T;
}
interface ICollection<T> extends IEventDispatcher {
    toArray(): T[];
    addItem(item: T): number;
    addItemAt(item: T, index: number): void;
    getItemAt(index: number): T;
    addAll(list: T[]): void;
    addAll(list: ICollection<T>): void;
    addAll(list?: any): void;
    getItemIndex(item: T): number;
    removeItemAt(index: number): void;
    removeAll(): void;
    getLength(): number;
    contains(item: T): boolean;
    isEmpty(): boolean;
    hasItems(): boolean;
    reverse(): void;
}
interface IDOMElement extends IEventDispatcher {
    setElement(element: HTMLElement): DOMElement;
    getElement(): HTMLElement;
}
interface IDeprecated {
}
interface IEventDispatcher {
    addEventListener(type: string, listener: Function, scope: IEventDispatcher, capture: boolean, esparcible: boolean, bubbles: boolean): void;
    addEventListenerXTimes(type: string, listener: Function, scope: IEventDispatcher, capture: boolean, times: number): void;
    removeEventListener(type: string, listener: Function, capture: boolean): void;
    dispatchEvent(event: BaseEvent): void;
    getUUID(): string;
}
interface IFilter<T> {
    persist(o: T): boolean;
}
interface IFormElement {
}
interface IHtml5 {
}
interface IMap<T, V> {
    put(key: T, value: V): void;
    getKeySet(): ICollection<T>;
    getValue(key: T): V;
}
declare class LiComparator implements Comparator<Li> {
    public compare(li1: Li, li2: Li): number;
}
declare class $ {
    static $(selector: string): Collection<DOMElement>;
}
declare enum AjaxStates {
    READY_STATE_UNINITIALIZED,
    READY_STATE_LOADING,
    READY_STATE_LOADED,
    READY_STATE_INTERACTIVE,
    READY_STATE_COMPLETE,
}
declare class Ajax extends NoVisual {
    private regExp;
    private dataType;
    private data;
    private object;
    private success;
    private url;
    constructor();
    private static init;
    public send: (data?: Object) => void;
    static post: (url: string, success?: (data: any, dataType: string) => void) => Ajax;
    static getD: (url: string, success?: (data: any, dataType: string) => void) => Ajax;
    public addEventListener(type: string, listener: Function, scope: any, capture: boolean): Ajax;
    private onReadyState;
}
declare class Collection<T> extends NoVisual implements ICollection<T>, ICloneable<Collection<T>> {
    private source;
    constructor();
    constructor(list: ICollection<T>);
    constructor(list: T[]);
    public toArray(): T[];
    public addItem(item: T): number;
    public addItemAt(item: T, index: number): number;
    public addAll(list: T[]): void;
    public addAll(list: ICollection<T>): void;
    public getItemAt(index: number): T;
    public getItemIndex(item: T): number;
    public removeAll(): Collection<T>;
    public removeItemAt(index: number): void;
    public contains(item: T): boolean;
    public getLength(): number;
    public isEmpty(): boolean;
    public hasItems(): boolean;
    public reverse(): void;
    public clone(): Collection<T>;
    public indexCheck(index: number): void;
    public itemCheck(item: any): void;
    private dispatchCollectionChange();
}
declare class ArrayCollection<T> extends Collection<T> {
    public getItemIndexByAttributes(keyValue: Object): number;
    public getItemByAttributes(keyValue: Object): T;
    public concat(list: ICollection<T>): ArrayCollection<T>;
    public removeLast(): T;
    public removeFirst(): T;
    public subArray: (start: number, end?: number) => ArrayCollection<T>;
    public unshift(item: T): ArrayCollection<T>;
    public getRandomItem(): T;
    public getLastItem(): T;
    public each(func: (value: T) => void): void;
    public some(func: (value: T) => boolean): boolean;
    public every(func: (value: T) => boolean): boolean;
    public execMethod(method: string, parameters?: any[]): void;
    public filter(func: (value: T) => boolean): ArrayCollection<T>;
    public sort(comparator: Comparator<T>): ArrayCollection<T>;
    public clone(): ArrayCollection<T>;
}
declare class ArrayMap<K, V> implements IMap<K, V> {
    private keys;
    private values;
    constructor(object?: Object);
    /**
    * @param key
    * @param value
    **/
    public put(key: K, value: V): void;
    public putNoSubstitution(key: K, value: V): number;
    public remove(key: K): void;
    public contains(key: K): boolean;
    public getValue(key: K): V;
    public getKeySet(): ArrayCollection<K>;
    public getValueSet(): ArrayCollection<V>;
    public isEmpty(): boolean;
    private keyCheck(key);
}
declare class Utils {
    static generateRandomUUID(): string;
}
