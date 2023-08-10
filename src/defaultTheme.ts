export interface Theme{
   colors:{
   Red: string;
   Green: string;
   Blue: string;
   GrayishBlue: string;
   LightBlue: string;
   White:string
   WhiteGray:string
   DarkGray:string
   },

}

export const defaultTheme:Theme={
    colors:{
       Red:'#FF7979',
       Green:'#38CC8B',
       Blue:'#5E54A4',
       GrayishBlue:'#BAB7D4',
       LightBlue:'#A6A1CF',
       White:'#ffff',
       WhiteGray:'#DEDEDE',
       DarkGray:'#3D3B48',
    },

  }