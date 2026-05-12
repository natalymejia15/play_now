export interface activity {
   id: number;
   centroComercial: string;
   canchasTotal: number;
   reservasEsteMes: number;
   ingresosEstimados: number; 
}

export interface PropsActivityTable {
    activity: activity[]
}