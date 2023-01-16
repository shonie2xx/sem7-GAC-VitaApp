import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
// export const config = {
//     appId: "50f18b4e-1a58-4004-b6b8-5a15e3a2e863",
//     redirectUri: "https://localhost:3000",
//     scopes: [
//         'user.read'
//     ],
//     authority: 'https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68'
// };

// export const msalConfig = {
//     auth: {
//         clientId: "50f18b4e-1a58-4004-b6b8-5a15e3a2e863", // This is the ONLY mandatory field that you need to supply.
//         authority: "https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68", // Defaults to "https://login.microsoftonline.com/common"
//         redirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
//         postLogoutRedirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // Indicates the page to navigate after logout.
//         navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
//     },
//     cache: {
//         cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
//         storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//     },
// };
// export const loginRequest = {
//     auth: {
//         clientId: "50f18b4e-1a58-4004-b6b8-5a15e3a2e863", // This is the ONLY mandatory field that you need to supply.
//         authority: "https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68", // Defaults to "https://login.microsoftonline.com/common"
//         redirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
//         postLogoutRedirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // Indicates the page to navigate after logout.
//         navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
//     },
//     scopes: ["api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"],
// };

export const msalConfig = {
    auth: {
        clientId: "50f18b4e-1a58-4004-b6b8-5a15e3a2e863", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/913b1a98-9696-4db5-b548-9e17b6d3fc68", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-admin-frontend.web.app/" : "https://localhost:3000", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
// export const graphConfig = {
//     graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
// };
export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"],
    },
    apiActivity: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/moodbooster/",
        scopes: ["api://fbb04eec-10f5-4677-b91e-b366a1e0303a/MoodBooster.All"], // e.g. api://xxxxxx/access_as_user
    },
    apiUser: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/user/",
        scopes: ["api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"]
    },
    apiBadge: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/badge/",
        scopes: ["api://787cafa0-a56b-429c-a0a2-d67f139b2c64/Badge.All"]
    },
    apiChallenge: {
        endpoint: "https://vitaappgw.northeurope.cloudapp.azure.com/challenge/",
        scopes: ["api://15e8abf0-9951-4e65-9d1c-1d14b82e6268/Challenge.All"]
    },
    apiNews: {
        endpoint: "https://vitaappgw.northeurope.cloudapp.azure.com/feed/",
        scopes: ["api://349fa8f3-bea0-4ee5-8205-e301e3d3f197/News.All"]
    },
    apiEvent: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/event/",
        scopes: ["api://a12710a0-aefb-414a-9fc0-2fb3792e7aa5/Event.All"]
    }
}
