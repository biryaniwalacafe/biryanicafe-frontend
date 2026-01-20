import React from 'react';
export declare type AuthNetEnvironment = 'SANDBOX' | 'PRODUCTION';
export declare type AcceptJsHookConfig = {
    environment?: AuthNetEnvironment;
    authData: AuthData;
};
export declare type AuthData = {
    clientKey: string;
    apiLoginID: string;
};
export declare type CardData = {
    cardNumber: string;
    month: string;
    year: string;
    cardCode?: string;
    zip?: string;
    fullName?: string;
};
export declare type BankData = {
    accountNumber: string;
    routingNumber: string;
    nameOnAccount: string;
    accountType: 'checking' | 'savings' | 'businessChecking';
};
export declare type PaymentDataWithCard = {
    cardData: CardData;
    bankData?: undefined;
};
export declare type PaymentDataWithBank = {
    cardData?: undefined;
    bankData: BankData;
};
export declare type PaymentData = PaymentDataWithCard | PaymentDataWithBank;
export declare type SecureData = {
    authData: AuthData;
} & PaymentData;
export declare type ErrorMessage = {
    code: string;
    text: string;
};
export declare type DispatchDataResponse = {
    opaqueData: {
        dataDescriptor: string;
        dataValue: string;
    };
    messages: {
        resultCode: 'Ok' | 'Error';
        message: ErrorMessage[];
    };
};
export declare type ResponseHandlerFn = (response: DispatchDataResponse) => void;
export declare type DispatchDataFn = (secureData: SecureData, responseHandler: ResponseHandlerFn) => void;
export declare type HostedFormResponseHandlerFn = (response: HostedFormDispatchDataResponse) => void;
export declare type HostedFormProps = {
    authData: AuthData;
    onSubmit: HostedFormResponseHandlerFn;
    environment?: AuthNetEnvironment;
    billingAddressOptions?: {
        show: boolean;
        required: boolean;
    };
    buttonText?: string;
    formButtonText?: string;
    formHeaderText?: string;
    paymentOptions?: {
        showCreditCard: boolean;
        showBankAccount: boolean;
    };
    buttonClassName?: string;
    errorTextClassName?: string;
    containerClassName?: string;
    buttonStyle?: React.CSSProperties;
    errorTextStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    disabled?: boolean;
};
export declare type HostedFormDispatchDataResponse = DispatchDataResponse & {
    encryptedCardData: {
        cardNumber: string;
        expDate: string;
        bin: string;
    };
    customerInformation: {
        firstName: string;
        lastName: string;
    };
};
declare type AcceptHostedIFrameCallbackProps = {
    onTransactionResponse: (response: AcceptHostedTransactionResponse) => void;
    onCancel?: () => void;
    onSuccessfulSave?: () => void;
    onResize?: (width: number, height: number) => void;
};
declare type AcceptHostedCommonProps = {
    formToken: string;
    environment?: AuthNetEnvironment;
    children: React.ReactNode;
};
declare type AcceptHostedRedirectProps = AcceptHostedCommonProps & {
    integration: 'redirect';
};
declare type AcceptHostedIFrameProps = AcceptHostedCommonProps & AcceptHostedIFrameCallbackProps & {
    integration: 'iframe';
};
export declare type AcceptHostedProps = AcceptHostedRedirectProps | AcceptHostedIFrameProps;
declare type AcceptHostedCommonIntegrationProps = {
    formToken: string;
    postUrl: string;
    children: React.ReactNode;
};
export declare type AcceptHostedRedirectIntegrationProps = AcceptHostedCommonIntegrationProps & {
    style?: React.CSSProperties;
    className?: string;
};
export declare type AcceptHostedIFrameIntegrationProps = AcceptHostedCommonIntegrationProps & AcceptHostedIFrameCallbackProps;
declare type Message = {
    code: string;
    text: string;
};
declare type AccountType = 'Visa' | 'Mastercard' | 'Discover' | 'AmericanExpress' | 'DinersClub' | 'JCB' | 'eCheck';
export declare type AcceptHostedTransactionResponse = {
    refId?: string;
    messages: {
        resultCode: 'Ok' | 'Error';
        message: Message[];
    };
    transactionResponse: {
        responseCode: '1' | '2' | '3' | '4';
        authCode: string;
        avsResultCode: 'A' | 'B' | 'E' | 'G' | 'N' | 'P' | 'R' | 'S' | 'U' | 'W' | 'X' | 'Y' | 'Z';
        cvvResultCode: 'M' | 'N' | 'P' | 'S' | 'U';
        cavvResultCode: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B';
        transId: string;
        refTransID: string;
        transHash: string;
        testRequest: string;
        accountNumber: 'XXXX1111';
        accountType: AccountType;
        messages: {
            code: string;
            description: string;
        }[];
        errors: {
            errorCode: string;
            errorText: string;
        }[];
        splitTenderPayments: {
            splitTenderPayment: {
                transId: string;
                responseCode: '1' | '2' | '3' | '4';
                responseToCustomer: string;
                authCode: string;
                accountNumber: string;
                accountType: AccountType;
            };
            requestAmount: string;
            approvedAmount: string;
            balanceOnCard: string;
        }[];
        userFields: {
            userField: {
                name: string;
                value: string;
            };
        }[];
        transHashSha2: string;
        SupplementalDataQualificationIndicator: number;
        networkTransId: string;
    };
    profileResponse: {
        messages: {
            resultCode: 'Ok' | 'Error';
            message: Message[];
        };
        customerProfileId: string;
        customerPaymentProfileIdList: {
            numericString: string;
        };
        customerShippingProfileIdList: {
            numericString: string;
        };
    };
};
export declare type AcceptHostedComposition = React.FC<AcceptHostedProps> & {
    Button: React.FC<CompoundComponentWithChildrenProps>;
    IFrameContainer: React.FC<CompoundComponentWithChildrenProps>;
    IFrameBackdrop: React.FC<CompoundComponentCommonProps>;
    IFrame: React.FC<CompoundComponentCommonProps>;
};
declare type IntegrationContextCommonProps = {
    formToken: string;
    postUrl: string;
};
export declare type IFrameIntegrationContext = IntegrationContextCommonProps & {
    popupIsShown: boolean;
    popupRef: React.RefObject<HTMLDivElement>;
    handleShowPopup: () => void;
    handleClosePopup: () => void;
};
export declare type CompoundComponentCommonProps = {
    className?: string;
    style?: React.CSSProperties;
};
export declare type CompoundComponentWithChildrenProps = CompoundComponentCommonProps & {
    children: React.ReactNode;
};
export {};
