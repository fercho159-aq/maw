import { getPersonalFinance, getBalanceSheetData } from './_actions';
import { ComoVoyEnMisFinanzas, Activo, Pasivo } from '@/lib/db/schema';
import MiProgresoPageContent from './mi-progreso-page-content';

// Server Component: Fetches data once on the server.
export default async function MiProgresoPage() {
    const pData = await getPersonalFinance();
    const bData = await getBalanceSheetData();

    const personalData = pData as ComoVoyEnMisFinanzas[];
    const balanceSheetData = bData as {activos: Activo[], pasivos: Pasivo[], totalCuentasPorCobrar: number};

    // Pass the fetched data as props to the Client Component.
    return (
        <MiProgresoPageContent 
            initialPersonalData={personalData} 
            initialBalanceSheetData={balanceSheetData} 
        />
    );
}
