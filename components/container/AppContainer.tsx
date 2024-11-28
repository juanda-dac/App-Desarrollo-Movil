import { CustomAlertProvider } from "../provider/CustomAlert";

export default function AppContainer({ children }:any) {
    return (
        <CustomAlertProvider>
            {children}
        </CustomAlertProvider>
    );
}