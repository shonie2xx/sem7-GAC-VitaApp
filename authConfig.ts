// export const protectedResources = {
//     graphMe: {
//         endpoint: "https://graph.microsoft.com/v1.0/me",
//         scopes: ["User.Read"],
//     },
//     apiActivity: {
//         endpoint: "http://localhost:5000/activity/",
//         scopes: ["api://fbb04eec-10f5-4677-b91e-b366a1e0303a/Activity.All"], // e.g. api://xxxxxx/access_as_user
//     },
//     apiUser: {
//         endpoint: "http://localhost:5000/user/",
//         scopes: ["api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"]
//     },    
//     apiBadge: {
//         endpoint: "http://localhost:5000/badge/",
//         scopes: ["api://787cafa0-a56b-429c-a0a2-d67f139b2c64/Badge.All"]
//     },
//     apiChallenge: {
//         endpoint: "http://localhost:5000/challenge/",
//         scopes: ["api://15e8abf0-9951-4e65-9d1c-1d14b82e6268/Challenge.All"]
//     },
//     apiFriends: {
//         endpoint: "http://localhost:5000/user/friends/",
//         scopes: ["api://15e8abf0-9951-4e65-9d1c-1d14b82e6268/Friends.All"]
//     }
// }

// CLOUD
export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"],
    },
    apiActivity: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/moodbooster/" ,
        scopes: ["api://fbb04eec-10f5-4677-b91e-b366a1e0303a/MoodBooster.All"], // e.g. api://xxxxxx/access_as_user
    },
    apiUser: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/user/" ,
        scopes: ["api://82b5a9e1-eaa2-4ee8-a3a0-7d3c41a4a1b5/User.All"]
    },
    apiBadge: {
        endpoint: "http://vitaappgw.northeurope.cloudapp.azure.com/badge/",
        scopes: ["api://787cafa0-a56b-429c-a0a2-d67f139b2c64/Badge.All"]
    },
    apiChallenge: {
        endpoint:"http://vitaappgw.northeurope.cloudapp.azure.com/challenge/",
        scopes: ["api://15e8abf0-9951-4e65-9d1c-1d14b82e6268/Challenge.All"]
    },
    apiNews: {
        endpoint:"http://vitaappgw.northeurope.cloudapp.azure.com/feed/",
        scopes: ["api://349fa8f3-bea0-4ee5-8205-e301e3d3f197/News.All"]
    }, 
    apiEvent: {
        endpoint:"http://vitaappgw.northeurope.cloudapp.azure.com/event/",
        scopes: ["api://a12710a0-aefb-414a-9fc0-2fb3792e7aa5/Event.All"]
    }
}
