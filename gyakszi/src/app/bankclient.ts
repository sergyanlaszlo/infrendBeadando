export interface Bankclient {
    name : string;
    address : string;
    phonenumber : string;
    idcardNumber : string;
    id : number;  //var val = Math.floor(1000 + Math.random() * 900000); console.log(val);
}

export const bankclients: Bankclient[] =  [
    {
        name : 'Példa Péter',
        address : 'Példa Utca 3',
        phonenumber : '06202251111',
        idcardNumber : '2222222222',
        id: Math.floor(10000 + Math.random()*900000)
    },
    {
        name : 'Nagy Aladár',
        address : 'Stackoverflow Körút 9',
        phonenumber : '06201012345',
        idcardNumber : '3333333333',
        id: Math.floor(10000 + Math.random()*900000)
    },
    {
        name : 'Cserepes Virág',
        address : 'Rigó Utca 22',
        phonenumber : '0670707070',
        idcardNumber : '344444444',
        id: Math.floor(10000 + Math.random()*900000)
    }  
];