export const buyerPlan = [
    {
        key : "1",
        label : "free",
        price : "0",
        benefits : {
            "period" : 15 , 
            "response_rate" : "Standard",
            "no_of_lisitings" : 1 , 
            "whatsapp_notifications" : false,
            "improved_property_visibility_in_homepage" : false,
            "verified_property_tag" : false,
            "relationship_manager" : false,
            "dedicated_support" : false,
        }
    },
    {
        key : "2",
        label : "basic",
        org_price : "2999", 
        price : "999",  
        benefits : {
            "period" : 30 , 
            "response_rate" : "2X",
            "no_of_lisitings" : 2 , 
            "whatsapp_notifications" : true,
            "improved_property_visibility_in_homepage" : false,
            "verified_property_tag" : false,
            "relationship_manager" : false,
            "dedicated_support" : false,
        }
    },
    {
        key : "3",
        label : "standard",
        org_price : "4999", 
        price : "2999",
        benefits : {
            "period" : 120 , 
            "response_rate" : "3X",
            "no_of_lisitings" : 2 , 
            "whatsapp_notifications" : true,
            "improved_property_visibility_in_homepage" : true,
            "verified_property_tag" : false,
            "relationship_manager" : false,
            "dedicated_support" : false,
        }
    },
    {
        key : "4",
        label : "premium",
        org_price : "8999", 
        price : "5999",
        benefits : {
            "period" : 180 , 
            "response_rate" : "5X",
            "no_of_lisitings" : 2 , 
            "whatsapp_notifications" : true,
            "improved_property_visibility_in_homepage" : true,
            "verified_property_tag" : true,
            "relationship_manager" : false,
            "dedicated_support" : false,
        }
    },
    {
        key : "5",
        label : "premium_plus",
        org_price : "13999", 
        price : "9999",
        benefits : {
            "period" : 250 , 
            "response_rate" : "8X",
            "no_of_lisitings" : 2 , 
            "whatsapp_notifications" : true,
            "improved_property_visibility_in_homepage" : true,
            "verified_property_tag" : true,
            "relationship_manager" : true,
            "dedicated_support" : false,
        }
    },
    {
        key : "6",
        label : "we_support",
        org_price : "19999", 
        price : "14999",
        benefits : {
            "period" : 365 , 
            "response_rate" : "10X",
            "no_of_lisitings" : 2 , 
            "whatsapp_notifications" : true,
            "improved_property_visibility_in_homepage" : true,
            "verified_property_tag" : true,
            "relationship_manager" : true,
            "dedicated_support" : true,
        }
    }
]


export const builderPlan = [
    {
        key : "1",
        label : "free",
        price : "0",
        period : "month",
        description : "Free Plan . Limited Services and Properties",
        benefits : [
            'Free',
            'Very Limited Access To Features'
        ]
    },
    {
        key : "2",
        label : "basic",
        price : "499",
        period : "month",
        description : "More Services and Properties Compared to Free Plan",
        benefits : [
            'Basic plan',
            'Get Access to 4 Lakh +'
        ]
    },
    {
        key : "3",
        label : "pro",
        price : "1299",
        period : "year",
        description : "Premiums Users - Unlimited Services and Properties",
        benefits : [
            'Unlimited Users',
            'Get Access to 8 Lakh +',
            'Sell Faster with Premium'

        ]
    },
    {
        key : "4",
        label : "premium",
        price : "1999",
        period : "year",
        description : "Premiums Users - Unlimited Services and Properties",
        benefits : [
            'Unlimited Users',
            'Get Access to 8 Lakh +',
            'Sell Faster with Premium'

        ]
    }
]

export const agentPlan = [
    {
        key : "1",
        label : "basic",
        price : "10000",
        period : "90 days",
        description : "Basic Plan",
        benefits : [
            '5X Response Rate',
            '50 Number of Listings',
            'Property Visibilty To 15% Buyers',
            'Property Promotion Emails'
        ]
    },
    {
        key : "2",
        label : "standard",
        price : "18000",
        period : "120 days",
        description : "Standard Plan",
        benefits : [
            '5X Response Rate',
            '100 Number of Listings',
            'Property Visibilty To 45% Buyers',
            'Property Promotion Emails'
        ]
    },
    {
        key : "3",
        label : "premium",
        price : "25000",
        period : "150 days",
        description : "Premium Plan",
        benefits : [
            '8X Response Rate',
            '200 Number of Listings',
            'Certified Agent Tag',
            'Property Visibilty To 80% Buyers',
            'Property Promotion Emails'
        ],
        certifiedTag : true
    },
    {
        key : "4",
        label : "premium_plus",
        price : "40000",
        period : "180 days",
        description : "Premium Plus",
        benefits : [
            '10X Response Rate',
            '300 Number of Listings',
            'Certified Agent Tag',
            'Property Visibilty To 97% Buyers',
            'Property Promotion Emails'
        ],
        certifiedTag : true
    }
]


export const ownerSubscriptionPlan = [
    {
        key : "1",
        label : "basic",
        price : "999",
        period : "30 days",
        description : "Basic Plan",
        benefits : [
            'Standard Response Rate',
            '2 Number of Listings',
            'Property Visibilty To 25% Buyers',
            'Promotion Emails',
        ]
    },
    {
        key : "2",
        label : "standard",
        price : "2999",
        period : "120 days",
        description : "Standard Plan",
        benefits : [
            '3X Response Rate',
            '2 Number of Listings',
            'Property Visibilty To 35% Buyers',
            'Promotion Emails',
        ]
    },
    {
        key : "3",
        label : "premium",
        price : "5999",
        period : "180 days",
        description : "Premium Plan",
        benefits : [
            '5X Response Rate',
            '2 Number of Listings',
            'Property Visibilty To 75% Buyers',
            'Promotion Emails'
        ]   
    },
    {
        key : "4",
        label : "premium_plus",
        price : "9999",
        period : "250 days",
        description : "Premium Plus",
        benefits : [
            '8X Response Rate',
            '2 Number of Listings',
            'Property Visibilty To 85% Buyers',
            'Promotion Emails',
            'Verified Property Tag'
        ]   
    },
    {
        key : "5",
        label : "we_support",
        price : "14999",
        period : "365 days",
        description : "Premium Plus",
        benefits : [
            '10X Response Rate',
            '2 Number of Listings',
            'Relationship Manager Will Assist',
            'Property Visibilty To 95% Buyers',
            'Promotion Emails',
            'Verified Property Tag'
        ]   
    }
]

export const tenantVerificationPlan = [
    {
        key : "1",
        label : "silver",
        price : <span>&#x20B9;&nbsp;250 / Tenant Verification</span>,
        benefits : [
            {
                title : "Identity & Criminal Court Verification",
                hasBenefit : true
            },
            {
                title : "Civil Litigation Check",
                hasBenefit : false
            },
            {
                title : "Permanent Address & Reference Verification",
                hasBenefit : false
            }
        ]
    },
    {
        key : "2",
        label : "gold",
        price : <span>&#x20B9;&nbsp;500 / Tenant Verification</span>,
        benefits : [
            {
                title : "Identity & Criminal Court Verification",
                hasBenefit : true
            },
            {
                title : "Civil Litigation Check",
                hasBenefit : true
            },
            {
                title : "Permanent Address & Reference Verification",
                hasBenefit : false
            }
        ]
    },
    {
        key : "3",
        label : "platinum",
        price : <span>&#x20B9;&nbsp;1000 / Tenant Verification</span>,
        benefits : [
            {
                title : "Identity & Criminal Court Verification",
                hasBenefit : true
            },
            {
                title : "Civil Litigation Check",
                hasBenefit : true
            },
            {
                title : "Permanent Address & Reference Verification",
                hasBenefit : true
            }
        ]
    }
]


