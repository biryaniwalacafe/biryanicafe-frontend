import { PaymentData, DispatchDataResponse, AcceptJsHookConfig } from '../types';
declare const useAcceptJs: ({ environment, authData, }: AcceptJsHookConfig) => {
    dispatchData: (paymentData: PaymentData) => Promise<DispatchDataResponse>;
    loading: boolean;
    error: boolean;
};
export default useAcceptJs;
