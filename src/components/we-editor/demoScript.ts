
export const demoScript:string=`//const utils = {};


/**
 * xxx最简布局xxx
 */
最简布局(input,(output)=>{
    最简布局('abc',(x)=>{

    });
})
  
For组件(input,(output)=>{
    Button(input,(output)=>{
        
    })
});

三栏布局(input,(output)=>{
    Input(input,(output)=>{

    });
    
    Label(input,(output)=>{

    });

    zhexian(input,(output)=>{

    });
})
    

`
export const demoExtraLibType=`

/**
 * Login，Page组件
 * @param input 绑定参数
 * @param defaultSlotFn - 默认slot作用域函数
 */
export declare function 最简布局(input:string):void;

export declare function For组件(input:string):void;

export declare function 三栏布局(input:string,leftSlotFn:(output:string)=>void
,topSlotFn:(output:string)=>void
,rightSlotFn:(output:string)=>void):void;

export declare function Button(input:string):void;


export declare function Input(input:string):void;

export declare function Zhexian2(input:string):void;



export declare function Label(input:string):void;

let input="abc";

`


export const demoExtraLibScript=`


const Login=function(input,defaultSlotFn){
    console.log(defaultSlotFn);
}

const 最简布局=function(input){

}

const For组件=function(input){
    
}

const 三栏布局=function(input,leftSlotFn,topSlotFn,rightSlotFn){
    console.log(leftSlotFn);
}

const Button=function(input){
    
}


const Input=function(input){
    
}

const zhexian2=function(input){
    
}



const Label=function(input){
    
}

let input="abc";

`





