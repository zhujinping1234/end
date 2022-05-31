import { EmitOutput } from "typescript";
import * as monaco from 'monaco-editor';

export declare function initEditor(valueHandler:(v:string)=>void,domElementFn:()=>HTMLElement,demoScript:string,demoExtraLibScript:string):monaco.Uri;

